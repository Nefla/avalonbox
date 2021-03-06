import * as html from './core/html'
import bind from './core/bind'
import delegate from './core/delegate'

import Direction from './constants/Direction'
import AppConstants from './constants/AppConstants'
const config = require('./appconfig')

const box = 'avalonbox'
const isDev = config.mode === AppConstants.DEV

const Avalonbox = (function() {
  const doc = document
  const buttons = {}
  const overlay = html.createOverlayBox(doc)
  const frame = html.createFrame(doc)
  frame.image.addEventListener('animationend', onImageAnimationEnd, false)
  const spinner = html.createSpinner(doc)
  const spinnerWrapper = html.createSpinnerWrapper(doc)
  const downloadImage = new Image()

  let active
  let currentLink

  initialize()

  function initialize() {
    active = false
    html.appendChild(doc, overlay)
    buttons.prev = html.createPreviousButton(doc)
    buttons.next = html.createNextButton(doc)
    spinnerWrapper.appendChild(spinner)
    overlay.appendChild(frame.container)
    overlay.appendChild(spinnerWrapper)
    overlay.appendChild(buttons.prev)
    overlay.appendChild(buttons.next)

    bind(overlay, 'click', hideOverlay)
    bind(buttons.prev, 'click', previous)
    bind(buttons.next, 'click', next)
    bind(doc, 'keydown', keyPressHandler)
  }

  function hideOverlay(e) {
    let f = frame.container
    if (f === e.target || !f.contains(e.target)) cleanFrame()
  }

  function cleanFrame() {
    html.hide(overlay)
    frame.image.classList.remove('showRight', 'showLeft', 'show')
    frame.image.src = ''
    active = false
  }

  function showOverlay(e) {
    e.preventDefault()
    active = true
    html.show(overlay)
    currentLink = e.delegateTarget
    fetchImage()

    if (single(e.currentTarget.id)) {
      html.hide(buttons.prev)
      html.hide(buttons.next)
    } else {
      if (currentLink.previousElementSibling) html.show(buttons.prev)
      else html.hide(buttons.prev)

      if (currentLink.nextElementSibling) html.show(buttons.next)
      else html.hide(buttons.next)
    }
  }

  function next(e) {
    frame.image.classList.remove('showLeft', 'show')
    html.show(buttons.prev)
    if (currentLink.nextElementSibling) {
      currentLink = currentLink.nextElementSibling
      fetchImage(Direction.RIGHT)
      if (!currentLink.nextElementSibling) html.hide(buttons.next)
    }

    e.stopPropagation()
  }

  function previous(e) {
    frame.image.classList.remove('showRight', 'show')
    html.show(buttons.next)
    if (currentLink.previousElementSibling) {
      currentLink = currentLink.previousElementSibling
      fetchImage(Direction.LEFT)
      if (!currentLink.previousElementSibling) html.hide(buttons.prev)
    }

    e.stopPropagation()
  }

  function onImageAnimationEnd(e) {
    downloadImage.src = currentLink.getAttribute('href')
    frame.link.href = currentLink.getAttribute('href')
  }

  function fetchImage(DIRECTION) {
    downloadImage.onload = function() {
      onLoadImage.bind(this, DIRECTION)()
    }
    if (DIRECTION) {
      html.slideOut(frame.image, DIRECTION)
    } else {
      downloadImage.src = currentLink.getAttribute('href')
      frame.link.href = currentLink.getAttribute('href')
    }

    html.show(spinner)
  }

  function onLoadImage(DIRECTION) {
    if (isDev) {
      setTimeout(loadImage.bind(this, DIRECTION), 1000)
    } else {
      loadImage.bind(this, DIRECTION)()
    }
  }

  function loadImage(DIRECTION) {
    if (DIRECTION) html.slideIn(frame.image, DIRECTION)
    else html.show(frame.image)
    frame.image.src = this.src
    html.hide(spinner)
  }

  // TODO: Swap [].slice for Array.from (ES6)
  // Need to test in IE9
  function single(query) {
    const links = doc.getElementById(query).getElementsByTagName('a')
    return [].slice.call(links).length == 1
  }

  function run(query) {
    eventHandlers(query)
  }

  function eventHandlers(query) {
    const el = document.getElementById(query)
    const filterLinks = x => x.tagName.toLowerCase() == 'a'
    el.addEventListener('click', delegate(filterLinks, showOverlay))
  }

  function keyPressHandler(event) {
    const e = event || window.event

    if (!active) return

    if (e.keyCode == '37') previous(e)
    else if (e.keyCode == '39') next(e)
  }

  return {
    run
  }
})()

module.exports = Avalonbox
