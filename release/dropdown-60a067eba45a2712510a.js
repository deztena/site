!function(u){function e(e){for(var t,n,o=e[0],r=e[1],i=e[2],a=0,c=[];a<o.length;a++)n=o[a],Object.prototype.hasOwnProperty.call(d,n)&&d[n]&&c.push(d[n][0]),d[n]=0;for(t in r)Object.prototype.hasOwnProperty.call(r,t)&&(u[t]=r[t]);for(f&&f(e);c.length;)c.shift()();return l.push.apply(l,i||[]),s()}function s(){for(var e,t=0;t<l.length;t++){for(var n=l[t],o=!0,r=1;r<n.length;r++){var i=n[r];0!==d[i]&&(o=!1)}o&&(l.splice(t--,1),e=a(a.s=n[0]))}return e}var n={},d={4:0},l=[];function a(e){var t;return(n[e]||(t=n[e]={i:e,l:!1,exports:{}},u[e].call(t.exports,t,t.exports,a),t.l=!0,t)).exports}a.m=u,a.c=n,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)a.d(n,o,function(e){return t[e]}.bind(null,o));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="/";var t=(o=window.webpackJsonp=window.webpackJsonp||[]).push.bind(o);o.push=e;for(var o=o.slice(),r=0;r<o.length;r++)e(o[r]);var f=t;l.push([75,0]),s()}({0:function(e,t){var n=function(){return this}();try{n=n||new Function("return this")()}catch(e){"object"==typeof window&&(n=window)}e.exports=n},16:function(e,r,i){!function(e){var t=void 0!==e&&e||"undefined"!=typeof self&&self||window,n=Function.prototype.apply;function o(e,t){this._id=e,this._clearFn=t}r.setTimeout=function(){return new o(n.call(setTimeout,t,arguments),clearTimeout)},r.setInterval=function(){return new o(n.call(setInterval,t,arguments),clearInterval)},r.clearTimeout=r.clearInterval=function(e){e&&e.close()},o.prototype.unref=o.prototype.ref=function(){},o.prototype.close=function(){this._clearFn.call(t,this._id)},r.enroll=function(e,t){clearTimeout(e._idleTimeoutId),e._idleTimeout=t},r.unenroll=function(e){clearTimeout(e._idleTimeoutId),e._idleTimeout=-1},r._unrefActive=r.active=function(e){clearTimeout(e._idleTimeoutId);var t=e._idleTimeout;0<=t&&(e._idleTimeoutId=setTimeout(function(){e._onTimeout&&e._onTimeout()},t))},i(17),r.setImmediate="undefined"!=typeof self&&self.setImmediate||void 0!==e&&e.setImmediate||this&&this.setImmediate,r.clearImmediate="undefined"!=typeof self&&self.clearImmediate||void 0!==e&&e.clearImmediate||this&&this.clearImmediate}.call(this,i(0))},17:function(e,t,n){!function(e,p){!function(n,i){"use strict";var o,a,c,r,u,s,t,e;function d(e){delete a[e]}function l(e){if(c)setTimeout(l,0,e);else{var t=a[e];if(t){c=!0;try{var n=t,o=n.callback,r=n.args;switch(r.length){case 0:o();break;case 1:o(r[0]);break;case 2:o(r[0],r[1]);break;case 3:o(r[0],r[1],r[2]);break;default:o.apply(i,r)}}finally{d(e),c=!1}}}}function f(){function e(e){e.source===n&&"string"==typeof e.data&&0===e.data.indexOf(t)&&l(+e.data.slice(t.length))}var t="setImmediate$"+Math.random()+"$";n.addEventListener?n.addEventListener("message",e,!1):n.attachEvent("onmessage",e),u=function(e){n.postMessage(t+e,"*")}}n.setImmediate||(o=1,c=!(a={}),r=n.document,e=(e=Object.getPrototypeOf&&Object.getPrototypeOf(n))&&e.setTimeout?e:n,"[object process]"==={}.toString.call(n.process)?u=function(e){p.nextTick(function(){l(e)})}:!function(){var e,t;if(n.postMessage&&!n.importScripts)return e=!0,t=n.onmessage,n.onmessage=function(){e=!1},n.postMessage("","*"),n.onmessage=t,e}()?u=n.MessageChannel?((t=new MessageChannel).port1.onmessage=function(e){l(e.data)},function(e){t.port2.postMessage(e)}):r&&"onreadystatechange"in r.createElement("script")?(s=r.documentElement,function(e){var t=r.createElement("script");t.onreadystatechange=function(){l(e),t.onreadystatechange=null,s.removeChild(t),t=null},s.appendChild(t)}):function(e){setTimeout(l,0,e)}:f(),e.setImmediate=function(e){"function"!=typeof e&&(e=new Function(""+e));for(var t=new Array(arguments.length-1),n=0;n<t.length;n++)t[n]=arguments[n+1];return a[o]={callback:e,args:t},u(o),o++},e.clearImmediate=d)}("undefined"==typeof self?void 0===e?this:e:self)}.call(this,n(0),n(8))},7:function(e,t){},75:function(e,t,a){"use strict";!function(o){function r(){var e=(0,n.default)(".dropdown");e.find(".dropdown__content").hide(),e.find(".dropdown__trigger").each(function(e){var t=this;(0,n.default)(this).on("click",function(){(0,n.default)(t).hide().parents(".dropdown").find(".dropdown__content").show()})})}var e=a(1),n=e(a(9)),i=(a(76),e(a(78)));window.renderDropdowm=function(e){var t=e.triggerImage,n=e.contentImage,e=e.renderTo;e?e.html((0,i.default)({triggerImage:t,contentImage:n})):document.write((0,i.default)({triggerImage:t,contentImage:n})),o(function(){r()})},(0,n.default)(document).ready(function(){r()})}.call(this,a(16).setImmediate)},76:function(e,t,n){var o=n(4),n=n(77),r={insert:"head",singleton:!1};o(n="string"==typeof(n=n.__esModule?n.default:n)?[[e.i,n,""]]:n,r);e.exports=n.locals||{}},77:function(e,t,n){(t=n(5)(!1)).push([e.i,".dropdown img{width:100%;height:auto}\n",""]),e.exports=t},78:function(e,t,n){var o=(0,n(6).twig)({id:"$resolved:cb8e88878a7e74481f5dc22800d936ec6666897213033a5b9f76ec3b75cd728ed3d2bc98d3cf33bd612b35aa4cbcd6432f3ee5f58aa3ba9e2840b0717e96afd9:dropdown.twig",data:[{type:"raw",value:'<div class="dropdown">\n    <div class="dropdown__trigger">\n        <img src="'},{type:"output",stack:[{type:"Twig.expression.type.variable",value:"triggerImage",match:["triggerImage"]}]},{type:"raw",value:'" />\n    </div>\n    <div class="dropdown__content">\n        <img src="'},{type:"output",stack:[{type:"Twig.expression.type.variable",value:"contentImage",match:["contentImage"]}]},{type:"raw",value:'" />\n    </div>\n</div>'}],allowInlineIncludes:!0,rethrow:!0});e.exports=function(e){return o.render(e)},e.exports.tokens=[{type:"raw",value:'<div class="dropdown">\n    <div class="dropdown__trigger">\n        <img src="'},{type:"output",stack:[{type:"Twig.expression.type.variable",value:"triggerImage",match:["triggerImage"]}]},{type:"raw",value:'" />\n    </div>\n    <div class="dropdown__content">\n        <img src="'},{type:"output",stack:[{type:"Twig.expression.type.variable",value:"contentImage",match:["contentImage"]}]},{type:"raw",value:'" />\n    </div>\n</div>'}]},9:function(e,t){e.exports=jquery}});