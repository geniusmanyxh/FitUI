import{d as K,h as C,x as ie,o as z,c as M,k as B,H as oe,w as X,n as ve,t as Y,e as ue,T as le,_ as ce,a2 as be,E as ye,C as _e,b as N,r as ae,a3 as we,a4 as xe,I as Fe,N as Ae,W as ke,X as I,s as J,a5 as Se,a6 as Ee,a7 as $e,a8 as Pe,a9 as ze,aa as Ce,ab as De,ac as Te,ad as Ie,ae as Le,u as Oe,j as Re,y as je,af as Me,ag as Be,ah as He,ai as We}from"./chunks/framework.8f7cce5e.js";import{t as Ge}from"./chunks/theme.1768058b.js";import{B as Ve,F as Ue,w as qe}from"./chunks/clipboard-polyfill.es6.03e0babf.js";const Ze=[Ve,Ue],Ne={install(l){Ze.forEach(p=>l.use(p))}};const Xe=`<template>\r
  <div>\r
    <div class="show-components">\r
      <f-button icon="google">Default</f-button>\r
      <f-button type="primary" icon="google">Primary</f-button>\r
      <f-button type="success" icon="google">Success</f-button>\r
      <f-button type="info" icon="google">Info</f-button>\r
      <f-button type="warning" icon="google">Wrning</f-button>\r
      <f-button type="danger" icon="google">Danger</f-button>\r
    </div>\r
\r
    <div class="show-components">\r
      <f-button plain icon="google">Default</f-button>\r
      <f-button type="primary" plain icon="google">Primary</f-button>\r
      <f-button type="success" plain icon="google">Success</f-button>\r
      <f-button type="info" plain icon="google">Info</f-button>\r
      <f-button type="warning" plain icon="google">Wrning</f-button>\r
      <f-button type="danger" plain icon="google">Danger</f-button>\r
    </div>\r
  </div>\r
</template>\r
\r
<script setup lang="ts">\r
import { FButton } from '@geniusmanyxh/fit-ui'\r
<\/script>\r
`,Ye=`<template>\r
  <div>\r
    <div class="show-components">\r
      <f-button size="small">Default</f-button>\r
      <f-button size="medium">Default</f-button>\r
      <f-button size="large">Default</f-button>\r
    </div>\r
    <div class="show-components">\r
      <f-button size="small" plain>Plain</f-button>\r
      <f-button size="medium" plain>Plain</f-button>\r
      <f-button size="large" plain>Plain</f-button>\r
    </div>\r
    <div class="show-components">\r
      <f-button size="small" type="primary">Plain</f-button>\r
      <f-button size="medium" type="primary">Plain</f-button>\r
      <f-button size="large" type="primary">Plain</f-button>\r
    </div>\r
\r
    <div class="show-components">\r
      <f-button size="small" icon="apple" />\r
      <f-button size="medium" icon="apple" />\r
      <f-button size="large" icon="apple" />\r
    </div>\r
    <div class="show-components">\r
      <f-button size="small" icon="apple" type="danger" plain />\r
      <f-button size="medium" icon="apple" type="danger" plain />\r
      <f-button size="large" icon="apple" type="danger" plain />\r
    </div>\r
\r
    <div class="show-components">\r
      <f-button size="small" icon="apple" type="success" plain round>Round</f-button>\r
      <f-button size="medium" icon="apple" type="success" plain round>Round</f-button>\r
      <f-button size="large" icon="apple" type="success" plain round>Round</f-button>\r
    </div>\r
  </div>\r
</template>\r
\r
<script setup lang="ts">\r
import { FButton } from '@geniusmanyxh/fit-ui'\r
<\/script>`,Je=`<template>\r
  <div>\r
    <div class="show-components">\r
      <f-button>Default</f-button>\r
      <f-button type="primary">Primary</f-button>\r
      <f-button type="success">Success</f-button>\r
      <f-button type="info">Info</f-button>\r
      <f-button type="warning">Wrning</f-button>\r
      <f-button type="danger">Danger</f-button>\r
    </div>\r
\r
    <div class="show-components">\r
      <f-button plain>Plain</f-button>\r
      <f-button type="primary" plain>Primary</f-button>\r
      <f-button type="success" plain>Success</f-button>\r
      <f-button type="info" plain>Info</f-button>\r
      <f-button type="warning" plain>Wrning</f-button>\r
      <f-button type="danger" plain>Danger</f-button>\r
    </div>\r
  </div>\r
</template>\r
\r
<script setup lang="ts">\r
  import { FButton } from '@geniusmanyxh/fit-ui'\r
<\/script>\r
`,Ke=`<template>\r
<div>\r
  <div class="show-components">\r
  <f-button round>Default</f-button>\r
  <f-button type="primary" round>Primary</f-button>\r
  <f-button type="success" round>Success</f-button>\r
  <f-button type="info" round>Info</f-button>\r
  <f-button type="warning" round>Wrning</f-button>\r
  <f-button type="danger" round>Danger</f-button>\r
</div>\r
\r
<div class="show-components">\r
  <f-button round plain>Default</f-button>\r
  <f-button type="primary" round plain>Primary</f-button>\r
  <f-button type="success" round plain>Success</f-button>\r
  <f-button type="info" round plain>Info</f-button>\r
  <f-button type="warning" round plain>Wrning</f-button>\r
  <f-button type="danger" round plain>Danger</f-button>\r
</div>\r
</div>\r
</template>\r
\r
<script setup lang="ts">\r
import { FButton } from '@geniusmanyxh/fit-ui'\r
<\/script>\r
`,Qe=`<template>\r
  <div class="show-components">\r
    <f-icon icon="google" size="small"></f-icon>\r
    <f-icon icon="google" size="medium"></f-icon>\r
    <f-icon icon="google" size="large"></f-icon>\r
  </div>\r
\r
  <div class="show-components">\r
    <f-icon icon="google" :size="20"></f-icon>\r
    <f-icon icon="google" :size="30"></f-icon>\r
    <f-icon icon="google" :size="40"></f-icon>\r
  </div>\r
\r
  <div class="show-components fontsize">\r
    <f-icon icon="google" class="fontsize_25"></f-icon>\r
    <f-icon icon="google" class="fontsize_35"></f-icon>\r
    <f-icon icon="google" class="fontsize_45"></f-icon>\r
  </div>\r
</template>\r
\r
<script setup lang="ts">\r
import { FIcon } from '@geniusmanyxh/fit-ui'\r
<\/script>\r
\r
<style scoped lang="scss">\r
.fontsize {\r
  &_25 {\r
    font-size: 25px;\r
  }\r
\r
  &_35 {\r
    font-size: 35px;\r
  }\r
\r
  &_45 {\r
    font-size: 45px;\r
  }\r
}\r
</style>`,en=`<template>\r
  <div class="show-components icon">\r
    <f-icon icon="github"></f-icon>\r
    <f-icon icon="apple" class="icon_red"></f-icon>\r
    <f-icon icon="typescript" class="icon_blue"></f-icon>\r
\r
  </div>\r
</template>\r
\r
<script setup lang="ts">\r
import { FIcon } from "@geniusmanyxh/fit-ui";\r
<\/script>\r
\r
<style scoped lang="scss">\r
  .icon {\r
    &_red {\r
      color: red;\r
    }\r
\r
    &_blue {\r
      color: rgb(19, 19, 217);\r
    }\r
  }\r
</style>`;var re=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function nn(l){return l&&l.__esModule&&Object.prototype.hasOwnProperty.call(l,"default")?l.default:l}var pe={exports:{}};(function(l){var p=typeof window<"u"?window:typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope?self:{};/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 *
 * @license MIT <https://opensource.org/licenses/MIT>
 * @author Lea Verou <https://lea.verou.me>
 * @namespace
 * @public
 */var t=function(c){var f=/(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i,m=0,_={},i={manual:c.Prism&&c.Prism.manual,disableWorkerMessageHandler:c.Prism&&c.Prism.disableWorkerMessageHandler,util:{encode:function n(e){return e instanceof y?new y(e.type,n(e.content),e.alias):Array.isArray(e)?e.map(n):e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(n){return Object.prototype.toString.call(n).slice(8,-1)},objId:function(n){return n.__id||Object.defineProperty(n,"__id",{value:++m}),n.__id},clone:function n(e,a){a=a||{};var r,s;switch(i.util.type(e)){case"Object":if(s=i.util.objId(e),a[s])return a[s];r={},a[s]=r;for(var u in e)e.hasOwnProperty(u)&&(r[u]=n(e[u],a));return r;case"Array":return s=i.util.objId(e),a[s]?a[s]:(r=[],a[s]=r,e.forEach(function(g,o){r[o]=n(g,a)}),r);default:return e}},getLanguage:function(n){for(;n;){var e=f.exec(n.className);if(e)return e[1].toLowerCase();n=n.parentElement}return"none"},setLanguage:function(n,e){n.className=n.className.replace(RegExp(f,"gi"),""),n.classList.add("language-"+e)},currentScript:function(){if(typeof document>"u")return null;if("currentScript"in document&&1<2)return document.currentScript;try{throw new Error}catch(r){var n=(/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(r.stack)||[])[1];if(n){var e=document.getElementsByTagName("script");for(var a in e)if(e[a].src==n)return e[a]}return null}},isActive:function(n,e,a){for(var r="no-"+e;n;){var s=n.classList;if(s.contains(e))return!0;if(s.contains(r))return!1;n=n.parentElement}return!!a}},languages:{plain:_,plaintext:_,text:_,txt:_,extend:function(n,e){var a=i.util.clone(i.languages[n]);for(var r in e)a[r]=e[r];return a},insertBefore:function(n,e,a,r){r=r||i.languages;var s=r[n],u={};for(var g in s)if(s.hasOwnProperty(g)){if(g==e)for(var o in a)a.hasOwnProperty(o)&&(u[o]=a[o]);a.hasOwnProperty(g)||(u[g]=s[g])}var h=r[n];return r[n]=u,i.languages.DFS(i.languages,function(x,$){$===h&&x!=n&&(this[x]=u)}),u},DFS:function n(e,a,r,s){s=s||{};var u=i.util.objId;for(var g in e)if(e.hasOwnProperty(g)){a.call(e,g,e[g],r||g);var o=e[g],h=i.util.type(o);h==="Object"&&!s[u(o)]?(s[u(o)]=!0,n(o,a,null,s)):h==="Array"&&!s[u(o)]&&(s[u(o)]=!0,n(o,a,g,s))}}},plugins:{},highlightAll:function(n,e){i.highlightAllUnder(document,n,e)},highlightAllUnder:function(n,e,a){var r={callback:a,container:n,selector:'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'};i.hooks.run("before-highlightall",r),r.elements=Array.prototype.slice.apply(r.container.querySelectorAll(r.selector)),i.hooks.run("before-all-elements-highlight",r);for(var s=0,u;u=r.elements[s++];)i.highlightElement(u,e===!0,r.callback)},highlightElement:function(n,e,a){var r=i.util.getLanguage(n),s=i.languages[r];i.util.setLanguage(n,r);var u=n.parentElement;u&&u.nodeName.toLowerCase()==="pre"&&i.util.setLanguage(u,r);var g=n.textContent,o={element:n,language:r,grammar:s,code:g};function h($){o.highlightedCode=$,i.hooks.run("before-insert",o),o.element.innerHTML=o.highlightedCode,i.hooks.run("after-highlight",o),i.hooks.run("complete",o),a&&a.call(o.element)}if(i.hooks.run("before-sanity-check",o),u=o.element.parentElement,u&&u.nodeName.toLowerCase()==="pre"&&!u.hasAttribute("tabindex")&&u.setAttribute("tabindex","0"),!o.code){i.hooks.run("complete",o),a&&a.call(o.element);return}if(i.hooks.run("before-highlight",o),!o.grammar){h(i.util.encode(o.code));return}if(e&&c.Worker){var x=new Worker(i.filename);x.onmessage=function($){h($.data)},x.postMessage(JSON.stringify({language:o.language,code:o.code,immediateClose:!0}))}else h(i.highlight(o.code,o.grammar,o.language))},highlight:function(n,e,a){var r={code:n,grammar:e,language:a};if(i.hooks.run("before-tokenize",r),!r.grammar)throw new Error('The language "'+r.language+'" has no grammar.');return r.tokens=i.tokenize(r.code,r.grammar),i.hooks.run("after-tokenize",r),y.stringify(i.util.encode(r.tokens),r.language)},tokenize:function(n,e){var a=e.rest;if(a){for(var r in a)e[r]=a[r];delete e.rest}var s=new D;return w(s,s.head,n),E(n,s,e,s.head,0),T(s)},hooks:{all:{},add:function(n,e){var a=i.hooks.all;a[n]=a[n]||[],a[n].push(e)},run:function(n,e){var a=i.hooks.all[n];if(!(!a||!a.length))for(var r=0,s;s=a[r++];)s(e)}},Token:y};c.Prism=i;function y(n,e,a,r){this.type=n,this.content=e,this.alias=a,this.length=(r||"").length|0}y.stringify=function n(e,a){if(typeof e=="string")return e;if(Array.isArray(e)){var r="";return e.forEach(function(h){r+=n(h,a)}),r}var s={type:e.type,content:n(e.content,a),tag:"span",classes:["token",e.type],attributes:{},language:a},u=e.alias;u&&(Array.isArray(u)?Array.prototype.push.apply(s.classes,u):s.classes.push(u)),i.hooks.run("wrap",s);var g="";for(var o in s.attributes)g+=" "+o+'="'+(s.attributes[o]||"").replace(/"/g,"&quot;")+'"';return"<"+s.tag+' class="'+s.classes.join(" ")+'"'+g+">"+s.content+"</"+s.tag+">"};function A(n,e,a,r){n.lastIndex=e;var s=n.exec(a);if(s&&r&&s[1]){var u=s[1].length;s.index+=u,s[0]=s[0].slice(u)}return s}function E(n,e,a,r,s,u){for(var g in a)if(!(!a.hasOwnProperty(g)||!a[g])){var o=a[g];o=Array.isArray(o)?o:[o];for(var h=0;h<o.length;++h){if(u&&u.cause==g+","+h)return;var x=o[h],$=x.inside,Q=!!x.lookbehind,ee=!!x.greedy,fe=x.alias;if(ee&&!x.pattern.global){var de=x.pattern.toString().match(/[imsuy]*$/)[0];x.pattern=RegExp(x.pattern.source,de+"g")}for(var ne=x.pattern||x,F=r.next,S=s;F!==e.tail&&!(u&&S>=u.reach);S+=F.value.length,F=F.next){var O=F.value;if(e.length>n.length)return;if(!(O instanceof y)){var H=1,k;if(ee){if(k=A(ne,S,n,Q),!k||k.index>=n.length)break;var W=k.index,he=k.index+k[0].length,P=S;for(P+=F.value.length;W>=P;)F=F.next,P+=F.value.length;if(P-=F.value.length,S=P,F.value instanceof y)continue;for(var j=F;j!==e.tail&&(P<he||typeof j.value=="string");j=j.next)H++,P+=j.value.length;H--,O=n.slice(S,P),k.index-=S}else if(k=A(ne,0,O,Q),!k)continue;var W=k.index,G=k[0],U=O.slice(0,W),te=O.slice(W+G.length),q=S+O.length;u&&q>u.reach&&(u.reach=q);var V=F.prev;U&&(V=w(e,V,U),S+=U.length),L(e,V,H);var me=new y(g,$?i.tokenize(G,$):G,fe,G);if(F=w(e,V,me),te&&w(e,F,te),H>1){var Z={cause:g+","+h,reach:q};E(n,e,a,F.prev,S,Z),u&&Z.reach>u.reach&&(u.reach=Z.reach)}}}}}}function D(){var n={value:null,prev:null,next:null},e={value:null,prev:n,next:null};n.next=e,this.head=n,this.tail=e,this.length=0}function w(n,e,a){var r=e.next,s={value:a,prev:e,next:r};return e.next=s,r.prev=s,n.length++,s}function L(n,e,a){for(var r=e.next,s=0;s<a&&r!==n.tail;s++)r=r.next;e.next=r,r.prev=e,n.length-=s}function T(n){for(var e=[],a=n.head.next;a!==n.tail;)e.push(a.value),a=a.next;return e}if(!c.document)return c.addEventListener&&(i.disableWorkerMessageHandler||c.addEventListener("message",function(n){var e=JSON.parse(n.data),a=e.language,r=e.code,s=e.immediateClose;c.postMessage(i.highlight(r,i.languages[a],a)),s&&c.close()},!1)),i;var v=i.util.currentScript();v&&(i.filename=v.src,v.hasAttribute("data-manual")&&(i.manual=!0));function d(){i.manual||i.highlightAll()}if(!i.manual){var b=document.readyState;b==="loading"||b==="interactive"&&v&&v.defer?document.addEventListener("DOMContentLoaded",d):window.requestAnimationFrame?window.requestAnimationFrame(d):window.setTimeout(d,16)}return i}(p);l.exports&&(l.exports=t),typeof re<"u"&&(re.Prism=t),t.languages.markup={comment:{pattern:/<!--(?:(?!<!--)[\s\S])*?-->/,greedy:!0},prolog:{pattern:/<\?[\s\S]+?\?>/,greedy:!0},doctype:{pattern:/<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,greedy:!0,inside:{"internal-subset":{pattern:/(^[^\[]*\[)[\s\S]+(?=\]>$)/,lookbehind:!0,greedy:!0,inside:null},string:{pattern:/"[^"]*"|'[^']*'/,greedy:!0},punctuation:/^<!|>$|[[\]]/,"doctype-tag":/^DOCTYPE/i,name:/[^\s<>'"]+/}},cdata:{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,greedy:!0},tag:{pattern:/<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,greedy:!0,inside:{tag:{pattern:/^<\/?[^\s>\/]+/,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"special-attr":[],"attr-value":{pattern:/=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,inside:{punctuation:[{pattern:/^=/,alias:"attr-equals"},{pattern:/^(\s*)["']|["']$/,lookbehind:!0}]}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:[{pattern:/&[\da-z]{1,8};/i,alias:"named-entity"},/&#x?[\da-f]{1,8};/i]},t.languages.markup.tag.inside["attr-value"].inside.entity=t.languages.markup.entity,t.languages.markup.doctype.inside["internal-subset"].inside=t.languages.markup,t.hooks.add("wrap",function(c){c.type==="entity"&&(c.attributes.title=c.content.replace(/&amp;/,"&"))}),Object.defineProperty(t.languages.markup.tag,"addInlined",{value:function(f,m){var _={};_["language-"+m]={pattern:/(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,lookbehind:!0,inside:t.languages[m]},_.cdata=/^<!\[CDATA\[|\]\]>$/i;var i={"included-cdata":{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,inside:_}};i["language-"+m]={pattern:/[\s\S]+/,inside:t.languages[m]};var y={};y[f]={pattern:RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g,function(){return f}),"i"),lookbehind:!0,greedy:!0,inside:i},t.languages.insertBefore("markup","cdata",y)}}),Object.defineProperty(t.languages.markup.tag,"addAttribute",{value:function(c,f){t.languages.markup.tag.inside["special-attr"].push({pattern:RegExp(/(^|["'\s])/.source+"(?:"+c+")"+/\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,"i"),lookbehind:!0,inside:{"attr-name":/^[^\s=]+/,"attr-value":{pattern:/=[\s\S]+/,inside:{value:{pattern:/(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,lookbehind:!0,alias:[f,"language-"+f],inside:t.languages[f]},punctuation:[{pattern:/^=/,alias:"attr-equals"},/"|'/]}}}})}}),t.languages.html=t.languages.markup,t.languages.mathml=t.languages.markup,t.languages.svg=t.languages.markup,t.languages.xml=t.languages.extend("markup",{}),t.languages.ssml=t.languages.xml,t.languages.atom=t.languages.xml,t.languages.rss=t.languages.xml,function(c){var f=/(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;c.languages.css={comment:/\/\*[\s\S]*?\*\//,atrule:{pattern:RegExp("@[\\w-](?:"+/[^;{\s"']|\s+(?!\s)/.source+"|"+f.source+")*?"+/(?:;|(?=\s*\{))/.source),inside:{rule:/^@[\w-]+/,"selector-function-argument":{pattern:/(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,lookbehind:!0,alias:"selector"},keyword:{pattern:/(^|[^\w-])(?:and|not|only|or)(?![\w-])/,lookbehind:!0}}},url:{pattern:RegExp("\\burl\\((?:"+f.source+"|"+/(?:[^\\\r\n()"']|\\[\s\S])*/.source+")\\)","i"),greedy:!0,inside:{function:/^url/i,punctuation:/^\(|\)$/,string:{pattern:RegExp("^"+f.source+"$"),alias:"url"}}},selector:{pattern:RegExp(`(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|`+f.source+")*(?=\\s*\\{)"),lookbehind:!0},string:{pattern:f,greedy:!0},property:{pattern:/(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,lookbehind:!0},important:/!important\b/i,function:{pattern:/(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,lookbehind:!0},punctuation:/[(){};:,]/},c.languages.css.atrule.inside.rest=c.languages.css;var m=c.languages.markup;m&&(m.tag.addInlined("style","css"),m.tag.addAttribute("style","css"))}(t),t.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,lookbehind:!0,greedy:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0,greedy:!0}],string:{pattern:/(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},"class-name":{pattern:/(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,lookbehind:!0,inside:{punctuation:/[.\\]/}},keyword:/\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,boolean:/\b(?:false|true)\b/,function:/\b\w+(?=\()/,number:/\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,operator:/[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,punctuation:/[{}[\];(),.:]/},t.languages.javascript=t.languages.extend("clike",{"class-name":[t.languages.clike["class-name"],{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,lookbehind:!0}],keyword:[{pattern:/((?:^|\})\s*)catch\b/,lookbehind:!0},{pattern:/(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,lookbehind:!0}],function:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,number:{pattern:RegExp(/(^|[^\w$])/.source+"(?:"+(/NaN|Infinity/.source+"|"+/0[bB][01]+(?:_[01]+)*n?/.source+"|"+/0[oO][0-7]+(?:_[0-7]+)*n?/.source+"|"+/0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source+"|"+/\d+(?:_\d+)*n/.source+"|"+/(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source)+")"+/(?![\w$])/.source),lookbehind:!0},operator:/--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/}),t.languages.javascript["class-name"][0].pattern=/(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/,t.languages.insertBefore("javascript","keyword",{regex:{pattern:RegExp(/((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source+/\//.source+"(?:"+/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source+"|"+/(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source+")"+/(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source),lookbehind:!0,greedy:!0,inside:{"regex-source":{pattern:/^(\/)[\s\S]+(?=\/[a-z]*$)/,lookbehind:!0,alias:"language-regex",inside:t.languages.regex},"regex-delimiter":/^\/|\/$/,"regex-flags":/^[a-z]+$/}},"function-variable":{pattern:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,alias:"function"},parameter:[{pattern:/(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,lookbehind:!0,inside:t.languages.javascript},{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,lookbehind:!0,inside:t.languages.javascript},{pattern:/(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,lookbehind:!0,inside:t.languages.javascript},{pattern:/((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,lookbehind:!0,inside:t.languages.javascript}],constant:/\b[A-Z](?:[A-Z_]|\dx?)*\b/}),t.languages.insertBefore("javascript","string",{hashbang:{pattern:/^#!.*/,greedy:!0,alias:"comment"},"template-string":{pattern:/`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,greedy:!0,inside:{"template-punctuation":{pattern:/^`|`$/,alias:"string"},interpolation:{pattern:/((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,lookbehind:!0,inside:{"interpolation-punctuation":{pattern:/^\$\{|\}$/,alias:"punctuation"},rest:t.languages.javascript}},string:/[\s\S]+/}},"string-property":{pattern:/((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,lookbehind:!0,greedy:!0,alias:"property"}}),t.languages.insertBefore("javascript","operator",{"literal-property":{pattern:/((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,lookbehind:!0,alias:"property"}}),t.languages.markup&&(t.languages.markup.tag.addInlined("script","javascript"),t.languages.markup.tag.addAttribute(/on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,"javascript")),t.languages.js=t.languages.javascript,function(){if(typeof t>"u"||typeof document>"u")return;Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector);var c="Loading…",f=function(v,d){return"✖ Error "+v+" while fetching file: "+d},m="✖ Error: File does not exist or is empty",_={js:"javascript",py:"python",rb:"ruby",ps1:"powershell",psm1:"powershell",sh:"bash",bat:"batch",h:"c",tex:"latex"},i="data-src-status",y="loading",A="loaded",E="failed",D="pre[data-src]:not(["+i+'="'+A+'"]):not(['+i+'="'+y+'"])';function w(v,d,b){var n=new XMLHttpRequest;n.open("GET",v,!0),n.onreadystatechange=function(){n.readyState==4&&(n.status<400&&n.responseText?d(n.responseText):n.status>=400?b(f(n.status,n.statusText)):b(m))},n.send(null)}function L(v){var d=/^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(v||"");if(d){var b=Number(d[1]),n=d[2],e=d[3];return n?e?[b,Number(e)]:[b,void 0]:[b,b]}}t.hooks.add("before-highlightall",function(v){v.selector+=", "+D}),t.hooks.add("before-sanity-check",function(v){var d=v.element;if(d.matches(D)){v.code="",d.setAttribute(i,y);var b=d.appendChild(document.createElement("CODE"));b.textContent=c;var n=d.getAttribute("data-src"),e=v.language;if(e==="none"){var a=(/\.(\w+)$/.exec(n)||[,"none"])[1];e=_[a]||a}t.util.setLanguage(b,e),t.util.setLanguage(d,e);var r=t.plugins.autoloader;r&&r.loadLanguages(e),w(n,function(s){d.setAttribute(i,A);var u=L(d.getAttribute("data-range"));if(u){var g=s.split(/\r\n?|\n/g),o=u[0],h=u[1]==null?g.length:u[1];o<0&&(o+=g.length),o=Math.max(0,Math.min(o-1,g.length)),h<0&&(h+=g.length),h=Math.max(0,Math.min(h,g.length)),s=g.slice(o,h).join(`
`),d.hasAttribute("data-start")||d.setAttribute("data-start",String(o+1))}b.textContent=s,t.highlightElement(b)},function(s){d.setAttribute(i,E),b.textContent=s})}}),t.plugins.fileHighlight={highlight:function(d){for(var b=(d||document).querySelectorAll(D),n=0,e;e=b[n++];)t.highlightElement(e)}};var T=!1;t.fileHighlight=function(){T||(console.warn("Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead."),T=!0),t.plugins.fileHighlight.highlight.apply(this,arguments)}}()})(pe);var tn=pe.exports;const se=nn(tn),an={vue:"html",html:"html",js:"javascript",ts:"typescript"};function rn(l,p){const t=an[p],c=se.languages[t];if(!t||!c)return console.warn(`Prism does not support the language '${p}'.`),l;const f=se.highlight(l,c,p);return`<pre class="language-${p}"><code >${f}</code></pre>`}const sn={class:"source-code-box"},on=["innerHTML"],un=K({__name:"showSourceCode",props:{filePath:{default:"../../../examples/button/index.vue"},lang:{default:"html"}},setup(l){const p=l,t=Object.assign({"../../../examples/button/button_icon.vue":Xe,"../../../examples/button/button_size.vue":Ye,"../../../examples/button/index.vue":Je,"../../../examples/button/round.vue":Ke,"../../../examples/icon/icon_size.vue":Qe,"../../../examples/icon/index.vue":en}),c=C(""),f=C(!1),m=C("复制失败!"),_=async()=>{try{await qe(t[p.filePath]),m.value="复制成功!",f.value=!0}catch{m.value="复制失败!",f.value=!1}finally{setTimeout(()=>{f.value=!1},2e3)}};return ie(()=>p.filePath,i=>{i&&(c.value=rn(t[i],p.lang))},{immediate:!0,deep:!0}),(i,y)=>(z(),M("div",sn,[B("div",{innerHTML:c.value},null,8,on),B("div",{class:"copy-code",onClick:_},"复制"),oe(le,null,{default:X(()=>[f.value?(z(),M("div",{key:0,class:ve(["copy-code-tip",f.value?"":"fail"])},Y(m.value),3)):ue("",!0)]),_:1})]))}});const ln=ce(un,[["__scopeId","data-v-19a93a37"]]),cn={class:"showDemo"},pn={key:0,class:"show-desc"},gn={key:2,class:"show-components"},fn=K({__name:"index",props:{rootPath:{default:"../../../examples"},filePath:{default:"button/index.vue"},desc:{default:null},lang:{default:"vue"}},setup(l){const p=l,t=be(),c=C(t.default!==void 0),f=C(t.desc!==void 0),m=Object.assign({"../../../examples/button/button_icon.vue":()=>I(()=>import("./chunks/button_icon.2e0fa03f.js"),["assets/chunks/button_icon.2e0fa03f.js","assets/chunks/clipboard-polyfill.es6.03e0babf.js","assets/chunks/framework.8f7cce5e.js"]),"../../../examples/button/button_size.vue":()=>I(()=>import("./chunks/button_size.c48cc2c2.js"),["assets/chunks/button_size.c48cc2c2.js","assets/chunks/clipboard-polyfill.es6.03e0babf.js","assets/chunks/framework.8f7cce5e.js"]),"../../../examples/button/index.vue":()=>I(()=>import("./chunks/index.7b26b7f3.js"),["assets/chunks/index.7b26b7f3.js","assets/chunks/clipboard-polyfill.es6.03e0babf.js","assets/chunks/framework.8f7cce5e.js"]),"../../../examples/button/round.vue":()=>I(()=>import("./chunks/round.5be2006a.js"),["assets/chunks/round.5be2006a.js","assets/chunks/clipboard-polyfill.es6.03e0babf.js","assets/chunks/framework.8f7cce5e.js"]),"../../../examples/icon/icon_size.vue":()=>I(()=>import("./chunks/icon_size.0566d7e9.js"),["assets/chunks/icon_size.0566d7e9.js","assets/chunks/clipboard-polyfill.es6.03e0babf.js","assets/chunks/framework.8f7cce5e.js"]),"../../../examples/icon/index.vue":()=>I(()=>import("./chunks/index.2fc21eba.js"),["assets/chunks/index.2fc21eba.js","assets/chunks/clipboard-polyfill.es6.03e0babf.js","assets/chunks/framework.8f7cce5e.js"])}),_=C(`${p.rootPath}/${p.filePath}`),i=ye(),y=async w=>{i.value=ke(m[w])},A=C(!1),E=C("显示代码"),D=()=>{A.value=!A.value,A.value?E.value="隐藏代码":E.value="显示代码"};return ie([()=>p.rootPath,()=>p.filePath,()=>p.desc],([w,L,T])=>{_.value=w+"/"+L,y(_.value)},{immediate:!0,deep:!0}),(w,L)=>{const T=_e("ClientOnly");return z(),N(T,null,{default:X(()=>[B("div",cn,[f.value?(z(),M("div",pn,[ae(w.$slots,"desc",{},void 0,!0)])):we((z(),M("div",{key:1,class:"show-desc"},Y(w.desc),513)),[[xe,w.desc]]),c.value?(z(),M("div",gn,[ae(w.$slots,"default",{},void 0,!0)])):(z(),N(Fe(i.value),{key:3})),B("div",{class:"is-show-code",style:Ae({marginBottom:A.value?"-5px":"0px"}),onClick:D},[B("span",null,Y(E.value),1)],4),oe(le,null,{default:X(()=>[A.value?(z(),N(ln,{key:0,"file-path":_.value,lang:w.lang},null,8,["file-path","lang"])):ue("",!0)]),_:1})])]),_:3})}}});const dn=ce(fn,[["__scopeId","data-v-dcc06892"]]);const hn={...Ge,enhanceApp({app:l}){l.use(Ne),l.component("sdemo",dn)}};function ge(l){if(l.extends){const p=ge(l.extends);return{...p,...l,async enhanceApp(t){p.enhanceApp&&await p.enhanceApp(t),l.enhanceApp&&await l.enhanceApp(t)}}}return l}const R=ge(hn),mn=K({name:"VitePressApp",setup(){const{site:l}=Oe();return Re(()=>{je(()=>{document.documentElement.lang=l.value.lang,document.documentElement.dir=l.value.dir})}),Me(),Be(),He(),R.setup&&R.setup(),()=>We(R.Layout)}});async function vn(){const l=yn(),p=bn();p.provide(Ee,l);const t=$e(l.route);return p.provide(Pe,t),p.component("Content",ze),p.component("ClientOnly",Ce),Object.defineProperties(p.config.globalProperties,{$frontmatter:{get(){return t.frontmatter.value}},$params:{get(){return t.page.value.params}}}),R.enhanceApp&&await R.enhanceApp({app:p,router:l,siteData:De}),{app:p,router:l,data:t}}function bn(){return Te(mn)}function yn(){let l=J,p;return Ie(t=>{let c=Le(t),f=null;return c&&(l&&(p=c),(l||p===c)&&(c=c.replace(/\.js$/,".lean.js")),f=I(()=>import(c),[])),J&&(l=!1),f},R.NotFound)}J&&vn().then(({app:l,router:p,data:t})=>{p.go().then(()=>{Se(p.route,t.site),l.mount("#app")})});export{vn as createApp};
