!function e(t,n,a){function r(o,s){if(!n[o]){if(!t[o]){var l="function"==typeof require&&require;if(!s&&l)return l(o,!0);if(i)return i(o,!0);var u=new Error("Cannot find module '"+o+"'");throw u.code="MODULE_NOT_FOUND",u}var c=n[o]={exports:{}};t[o][0].call(c.exports,function(e){var n=t[o][1][e];return r(n||e)},c,c.exports,e,t,n,a)}return n[o].exports}for(var i="function"==typeof require&&require,o=0;o<a.length;o++)r(a[o]);return r}({1:[function(e,t,n){(function(e){var n="undefined"!=typeof window?window:"undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope?self:{},a=function(){var e=/\blang(?:uage)?-(\w+)\b/i,t=0,a=n.Prism={util:{encode:function(e){return e instanceof r?new r(e.type,a.util.encode(e.content),e.alias):"Array"===a.util.type(e)?e.map(a.util.encode):e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(e){return Object.prototype.toString.call(e).match(/\[object (\w+)\]/)[1]},objId:function(e){return e.__id||Object.defineProperty(e,"__id",{value:++t}),e.__id},clone:function(e){switch(a.util.type(e)){case"Object":var t={};for(var n in e)e.hasOwnProperty(n)&&(t[n]=a.util.clone(e[n]));return t;case"Array":return e.map&&e.map(function(e){return a.util.clone(e)})}return e}},languages:{extend:function(e,t){var n=a.util.clone(a.languages[e]);for(var r in t)n[r]=t[r];return n},insertBefore:function(e,t,n,r){r=r||a.languages;var i=r[e];if(2==arguments.length){n=arguments[1];for(var o in n)n.hasOwnProperty(o)&&(i[o]=n[o]);return i}var s={};for(var l in i)if(i.hasOwnProperty(l)){if(l==t)for(var o in n)n.hasOwnProperty(o)&&(s[o]=n[o]);s[l]=i[l]}return a.languages.DFS(a.languages,function(t,n){n===r[e]&&t!=e&&(this[t]=s)}),r[e]=s},DFS:function(e,t,n,r){r=r||{};for(var i in e)e.hasOwnProperty(i)&&(t.call(e,i,e[i],n||i),"Object"!==a.util.type(e[i])||r[a.util.objId(e[i])]?"Array"!==a.util.type(e[i])||r[a.util.objId(e[i])]||(r[a.util.objId(e[i])]=!0,a.languages.DFS(e[i],t,i,r)):(r[a.util.objId(e[i])]=!0,a.languages.DFS(e[i],t,null,r)))}},plugins:{},highlightAll:function(e,t){var n={callback:t,selector:'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'};a.hooks.run("before-highlightall",n);for(var r,i=n.elements||document.querySelectorAll(n.selector),o=0;r=i[o++];)a.highlightElement(r,!0===e,n.callback)},highlightElement:function(t,r,i){for(var o,s,l=t;l&&!e.test(l.className);)l=l.parentNode;l&&(o=(l.className.match(e)||[,""])[1].toLowerCase(),s=a.languages[o]),t.className=t.className.replace(e,"").replace(/\s+/g," ")+" language-"+o,l=t.parentNode,/pre/i.test(l.nodeName)&&(l.className=l.className.replace(e,"").replace(/\s+/g," ")+" language-"+o);var u=t.textContent,c={element:t,language:o,grammar:s,code:u};if(a.hooks.run("before-sanity-check",c),!c.code||!c.grammar)return c.code&&(c.element.textContent=c.code),void a.hooks.run("complete",c);if(a.hooks.run("before-highlight",c),r&&n.Worker){var d=new Worker(a.filename);d.onmessage=function(e){c.highlightedCode=e.data,a.hooks.run("before-insert",c),c.element.innerHTML=c.highlightedCode,i&&i.call(c.element),a.hooks.run("after-highlight",c),a.hooks.run("complete",c)},d.postMessage(JSON.stringify({language:c.language,code:c.code,immediateClose:!0}))}else c.highlightedCode=a.highlight(c.code,c.grammar,c.language),a.hooks.run("before-insert",c),c.element.innerHTML=c.highlightedCode,i&&i.call(t),a.hooks.run("after-highlight",c),a.hooks.run("complete",c)},highlight:function(e,t,n){var i=a.tokenize(e,t);return r.stringify(a.util.encode(i),n)},tokenize:function(e,t,n){var r=a.Token,i=[e],o=t.rest;if(o){for(var s in o)t[s]=o[s];delete t.rest}e:for(var s in t)if(t.hasOwnProperty(s)&&t[s]){var l=t[s];l="Array"===a.util.type(l)?l:[l];for(var u=0;u<l.length;++u){var c=l[u],d=c.inside,g=!!c.lookbehind,p=!!c.greedy,f=0,h=c.alias;if(p&&!c.pattern.global){var m=c.pattern.toString().match(/[imuy]*$/)[0];c.pattern=RegExp(c.pattern.source,m+"g")}c=c.pattern||c;for(var v=0,y=0;v<i.length;y+=i[v].length,++v){var b=i[v];if(i.length>e.length)break e;if(!(b instanceof r)){c.lastIndex=0;var w=c.exec(b),k=1;if(!w&&p&&v!=i.length-1){if(c.lastIndex=y,!(w=c.exec(e)))break;for(var x=w.index+(g?w[1].length:0),E=w.index+w[0].length,C=v,O=y,_=i.length;C<_&&O<E;++C)O+=i[C].length,x>=O&&(++v,y=O);if(i[v]instanceof r||i[C-1].greedy)continue;k=C-v,b=e.slice(y,O),w.index-=y}if(w){g&&(f=w[1].length);var x=w.index+f,w=w[0].slice(f),E=x+w.length,L=b.slice(0,x),j=b.slice(E),N=[v,k];L&&N.push(L);var S=new r(s,d?a.tokenize(w,d):w,h,w,p);N.push(S),j&&N.push(j),Array.prototype.splice.apply(i,N)}}}}}return i},hooks:{all:{},add:function(e,t){var n=a.hooks.all;n[e]=n[e]||[],n[e].push(t)},run:function(e,t){var n=a.hooks.all[e];if(n&&n.length)for(var r,i=0;r=n[i++];)r(t)}}},r=a.Token=function(e,t,n,a,r){this.type=e,this.content=t,this.alias=n,this.length=0|(a||"").length,this.greedy=!!r};if(r.stringify=function(e,t,n){if("string"==typeof e)return e;if("Array"===a.util.type(e))return e.map(function(n){return r.stringify(n,t,e)}).join("");var i={type:e.type,content:r.stringify(e.content,t,n),tag:"span",classes:["token",e.type],attributes:{},language:t,parent:n};if("comment"==i.type&&(i.attributes.spellcheck="true"),e.alias){var o="Array"===a.util.type(e.alias)?e.alias:[e.alias];Array.prototype.push.apply(i.classes,o)}a.hooks.run("wrap",i);var s=Object.keys(i.attributes).map(function(e){return e+'="'+(i.attributes[e]||"").replace(/"/g,"&quot;")+'"'}).join(" ");return"<"+i.tag+' class="'+i.classes.join(" ")+'"'+(s?" "+s:"")+">"+i.content+"</"+i.tag+">"},!n.document)return n.addEventListener?(n.addEventListener("message",function(e){var t=JSON.parse(e.data),r=t.language,i=t.code,o=t.immediateClose;n.postMessage(a.highlight(i,a.languages[r],r)),o&&n.close()},!1),n.Prism):n.Prism;var i=document.currentScript||[].slice.call(document.getElementsByTagName("script")).pop();return i&&(a.filename=i.src,document.addEventListener&&!i.hasAttribute("data-manual")&&("loading"!==document.readyState?window.requestAnimationFrame?window.requestAnimationFrame(a.highlightAll):window.setTimeout(a.highlightAll,16):document.addEventListener("DOMContentLoaded",a.highlightAll))),n.Prism}();void 0!==t&&t.exports&&(t.exports=a),void 0!==e&&(e.Prism=a),a.languages.markup={comment:/<!--[\w\W]*?-->/,prolog:/<\?[\w\W]+?\?>/,doctype:/<!DOCTYPE[\w\W]+?>/i,cdata:/<!\[CDATA\[[\w\W]*?]]>/i,tag:{pattern:/<\/?(?!\d)[^\s>\/=$<]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\\1|\\?(?!\1)[\w\W])*\1|[^\s'">=]+))?)*\s*\/?>/i,inside:{tag:{pattern:/^<\/?[^\s>\/]+/i,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"attr-value":{pattern:/=(?:('|")[\w\W]*?(\1)|[^\s>]+)/i,inside:{punctuation:/[=>"']/}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:/&#?[\da-z]{1,8};/i},a.hooks.add("wrap",function(e){"entity"===e.type&&(e.attributes.title=e.content.replace(/&amp;/,"&"))}),a.languages.xml=a.languages.markup,a.languages.html=a.languages.markup,a.languages.mathml=a.languages.markup,a.languages.svg=a.languages.markup,a.languages.css={comment:/\/\*[\w\W]*?\*\//,atrule:{pattern:/@[\w-]+?.*?(;|(?=\s*\{))/i,inside:{rule:/@[\w-]+/}},url:/url\((?:(["'])(\\(?:\r\n|[\w\W])|(?!\1)[^\\\r\n])*\1|.*?)\)/i,selector:/[^\{\}\s][^\{\};]*?(?=\s*\{)/,string:{pattern:/("|')(\\(?:\r\n|[\w\W])|(?!\1)[^\\\r\n])*\1/,greedy:!0},property:/(\b|\B)[\w-]+(?=\s*:)/i,important:/\B!important\b/i,function:/[-a-z0-9]+(?=\()/i,punctuation:/[(){};:]/},a.languages.css.atrule.inside.rest=a.util.clone(a.languages.css),a.languages.markup&&(a.languages.insertBefore("markup","tag",{style:{pattern:/(<style[\w\W]*?>)[\w\W]*?(?=<\/style>)/i,lookbehind:!0,inside:a.languages.css,alias:"language-css"}}),a.languages.insertBefore("inside","attr-value",{"style-attr":{pattern:/\s*style=("|').*?\1/i,inside:{"attr-name":{pattern:/^\s*style/i,inside:a.languages.markup.tag.inside},punctuation:/^\s*=\s*['"]|['"]\s*$/,"attr-value":{pattern:/.+/i,inside:a.languages.css}},alias:"language-css"}},a.languages.markup.tag)),a.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\w\W]*?\*\//,lookbehind:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0}],string:{pattern:/(["'])(\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},"class-name":{pattern:/((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/i,lookbehind:!0,inside:{punctuation:/(\.|\\)/}},keyword:/\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,boolean:/\b(true|false)\b/,function:/[a-z0-9_]+(?=\()/i,number:/\b-?(?:0x[\da-f]+|\d*\.?\d+(?:e[+-]?\d+)?)\b/i,operator:/--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,punctuation:/[{}[\];(),.:]/},a.languages.javascript=a.languages.extend("clike",{keyword:/\b(as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/,number:/\b-?(0x[\dA-Fa-f]+|0b[01]+|0o[0-7]+|\d*\.?\d+([Ee][+-]?\d+)?|NaN|Infinity)\b/,function:/[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*(?=\()/i,operator:/--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*\*?|\/|~|\^|%|\.{3}/}),a.languages.insertBefore("javascript","keyword",{regex:{pattern:/(^|[^\/])\/(?!\/)(\[.+?]|\\.|[^\/\\\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})]))/,lookbehind:!0,greedy:!0}}),a.languages.insertBefore("javascript","string",{"template-string":{pattern:/`(?:\\\\|\\?[^\\])*?`/,greedy:!0,inside:{interpolation:{pattern:/\$\{[^}]+\}/,inside:{"interpolation-punctuation":{pattern:/^\$\{|\}$/,alias:"punctuation"},rest:a.languages.javascript}},string:/[\s\S]+/}}}),a.languages.markup&&a.languages.insertBefore("markup","tag",{script:{pattern:/(<script[\w\W]*?>)[\w\W]*?(?=<\/script>)/i,lookbehind:!0,inside:a.languages.javascript,alias:"language-javascript"}}),a.languages.js=a.languages.javascript,function(){"undefined"!=typeof self&&self.Prism&&self.document&&document.querySelector&&(self.Prism.fileHighlight=function(){var e={js:"javascript",py:"python",rb:"ruby",ps1:"powershell",psm1:"powershell",sh:"bash",bat:"batch",h:"c",tex:"latex"};Array.prototype.forEach&&Array.prototype.slice.call(document.querySelectorAll("pre[data-src]")).forEach(function(t){for(var n,r=t.getAttribute("data-src"),i=t,o=/\blang(?:uage)?-(?!\*)(\w+)\b/i;i&&!o.test(i.className);)i=i.parentNode;if(i&&(n=(t.className.match(o)||[,""])[1]),!n){var s=(r.match(/\.(\w+)$/)||[,""])[1];n=e[s]||s}var l=document.createElement("code");l.className="language-"+n,t.textContent="",l.textContent="Loading…",t.appendChild(l);var u=new XMLHttpRequest;u.open("GET",r,!0),u.onreadystatechange=function(){4==u.readyState&&(u.status<400&&u.responseText?(l.textContent=u.responseText,a.highlightElement(l)):u.status>=400?l.textContent="✖ Error "+u.status+" while fetching file: "+u.statusText:l.textContent="✖ Error: File does not exist or is empty")},u.send(null)})},document.addEventListener("DOMContentLoaded",self.Prism.fileHighlight))}()}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],2:[function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}var r=e("../../src/scripts/avalonbox"),i=a(r),o=e("prismjs");a(o);document.onreadystatechange=function(){"complete"===document.readyState&&(i.default.run("image-gallery-single"),i.default.run("image-gallery-multiple"),i.default.run("image-gallery-many"))}},{"../../src/scripts/avalonbox":4,prismjs:1}],3:[function(e,t,n){t.exports={mode:"prod"}},{}],4:[function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}var r=e("./core/html"),i=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(r),o=e("./core/bind"),s=a(o),l=e("./core/delegate"),u=a(l),c=e("./constants/Direction"),d=a(c),g=e("./constants/AppConstants"),p=a(g),f=e("./appconfig"),h=f.mode===p.default.DEV,m=function(){function e(e){var n=w.container;n!==e.target&&n.contains(e.target)||t()}function t(){i.hide(b),w.image.classList.remove("showRight","showLeft","show"),w.image.src="",C=!1}function n(e){e.preventDefault(),C=!0,i.show(b),O=e.delegateTarget,o(),g(e.currentTarget.id)?(i.hide(y.prev),i.hide(y.next)):(O.previousElementSibling?i.show(y.prev):i.hide(y.prev),O.nextElementSibling?i.show(y.next):i.hide(y.next))}function a(e){w.image.classList.remove("showLeft","show"),i.show(y.prev),O.nextElementSibling&&(O=O.nextElementSibling,o(d.default.RIGHT),O.nextElementSibling||i.hide(y.next)),e.stopPropagation()}function r(e){w.image.classList.remove("showRight","show"),i.show(y.next),O.previousElementSibling&&(O=O.previousElementSibling,o(d.default.LEFT),O.previousElementSibling||i.hide(y.prev)),e.stopPropagation()}function o(e){e&&i.slideOut(w.image,e),i.show(k),E.onload=function(){l.bind(this,e)()},E.src=O.getAttribute("href"),w.link.href=O.getAttribute("href")}function l(e){h?setTimeout(c.bind(this,e),1e3):c.bind(this,e)()}function c(e){e?i.slideIn(w.image,e):i.show(w.image),w.image.src=this.src,i.hide(k)}function g(e){var t=v.getElementById(e).getElementsByTagName("a");return 1==[].slice.call(t).length}function p(e){f(e)}function f(e){var t=document.getElementById(e),a=function(e){return"a"==e.tagName.toLowerCase()};t.addEventListener("click",(0,u.default)(a,n))}function m(e){var t=e||window.event;C&&("37"==t.keyCode?r(t):"39"==t.keyCode&&a(t))}var v=document,y={},b=i.createOverlayBox(v),w=i.createFrame(v),k=i.createSpinner(v),x=i.createSpinnerWrapper(v),E=new Image,C=void 0,O=void 0;return function(){C=!1,i.appendChild(v,b),y.prev=i.createPreviousButton(v),y.next=i.createNextButton(v),x.appendChild(k),b.appendChild(w.container),b.appendChild(x),b.appendChild(y.prev),b.appendChild(y.next),(0,s.default)(b,"click",e),(0,s.default)(y.prev,"click",r),(0,s.default)(y.next,"click",a),(0,s.default)(v,"keydown",m)}(),{run:p}}();t.exports=m},{"./appconfig":3,"./constants/AppConstants":5,"./constants/Direction":6,"./core/bind":7,"./core/delegate":8,"./core/html":9}],5:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a={DEV:"dev",PROD:"prod"};n.default=a},{}],6:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a={LEFT:"left",RIGHT:"right"};n.default=a},{}],7:[function(e,t,n){"use strict";function a(e,t,n,a){e.addEventListener(t,n,a)}Object.defineProperty(n,"__esModule",{value:!0}),n.default=a},{}],8:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a=function(e,t){return function(n){var a=n.target;do{if(e(a))return n.delegateTarget=a,void t.apply(this,arguments)}while(a=a.parentNode)}};n.default=a},{}],9:[function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}function r(e){var t=e.createElement("button");return t.id=E+"-prev",t.className=E+"-move-button "+E+"-prev-button",t.innerHTML="&lt",t.type="button",t}function i(e){var t=e.createElement("button");return t.id=E+"-next",t.className=E+"-move-button "+E+"-next-button",t.innerHTML="&gt",t.type="button",t}function o(e){var t=e.createElement("div");return t.id=E+"-spinner",t.className=E+"-spinner",t}function s(e){var t=e.createElement("div");return t.id=E+"-spinner-wrapper",t.className=E+"-spinner-wrapper",t}function l(e){var t=e.createElement("div");t.id=E+"-frame",t.className=E+"-frame";var n=e.createElement("img");n.src="",n.className=E+"-frame-image",n.id=E+"-frame-image";var a=e.createElement("a");return a.appendChild(n),(0,v.default)(a,"click",function(e){e.preventDefault()}),t.appendChild(a),{container:t,image:n,link:a}}function u(e){var t=e.createElement("div");return t.className=E+"-overlay",t.id=E+"-overlay",t}function c(e){return e.getElementById(E+"-overlay")}function d(e){e.classList.remove("show"),e.classList.add("hide")}function g(e){e.classList.remove("hide"),e.classList.add("show")}function p(e,t){e.getElementsByTagName("body")[0].appendChild(t)}function f(e,t){e.classList.remove("hide"+(0,w.default)((0,x.default)(t))),e.classList.add("show"+(0,w.default)(t))}function h(e,t){e.classList.remove("show"+(0,w.default)(t)),e.classList.add("hide"+(0,w.default)((0,x.default)(t)))}Object.defineProperty(n,"__esModule",{value:!0}),n.appendChild=n.slideOut=n.slideIn=n.show=n.hide=n.getOverlayBox=n.createSpinnerWrapper=n.createSpinner=n.createOverlayBox=n.createFrame=n.createNextButton=n.createPreviousButton=void 0;var m=e("./bind"),v=a(m),y=e("../constants/Direction"),b=(a(y),e("../utils/capitalize")),w=a(b),k=e("../utils/opposite-direction"),x=a(k),E="avalonbox";n.createPreviousButton=r,n.createNextButton=i,n.createFrame=l,n.createOverlayBox=u,n.createSpinner=o,n.createSpinnerWrapper=s,n.getOverlayBox=c,n.hide=d,n.show=g,n.slideIn=f,n.slideOut=h,n.appendChild=p},{"../constants/Direction":6,"../utils/capitalize":10,"../utils/opposite-direction":11,"./bind":7}],10:[function(e,t,n){"use strict";function a(e){return e.charAt(0).toUpperCase()+e.substring(1)}Object.defineProperty(n,"__esModule",{value:!0}),n.default=a},{}],11:[function(e,t,n){"use strict";function a(e){return e===i.default.LEFT?i.default.RIGHT:i.default.LEFT}Object.defineProperty(n,"__esModule",{value:!0});var r=e("../constants/Direction"),i=function(e){return e&&e.__esModule?e:{default:e}}(r);n.default=a},{"../constants/Direction":6}]},{},[2]);