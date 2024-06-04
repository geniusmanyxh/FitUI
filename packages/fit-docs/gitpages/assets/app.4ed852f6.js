import{d as J,h as M,x as ie,o as T,c as W,k as j,_ as oe,a2 as de,E as me,b as N,w as ne,r as te,a3 as he,a4 as ve,t as ae,J as be,N as ye,H as _e,e as we,T as xe,C as Ae,W as Fe,X as S,s as X,a5 as ke,a6 as Se,a7 as Ee,a8 as $e,a9 as Pe,aa as Ce,ab as Me,ac as De,ad as ze,ae as Te,u as Ie,j as Le,y as Oe,af as Re,ag as je,ah as Ge,ai as Be}from"./chunks/framework.40c44b93.js";import{t as Ve}from"./chunks/theme.f7966dbb.js";import{B as He,F as We,a as Ue,w as qe,u as Ze}from"./chunks/clipboard-polyfill.es6.28fdf13d.js";const Ne=[He,We,Ue],Xe=l=>{Ne.forEach(p=>l.use(p))},Je={install:Xe};const Ye=`<template>\r
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
`,Ke=`<template>\r
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
<script setup lang="ts">\r
import { FButton } from '@geniusmanyxh/fit-ui'\r
<\/script>`,Qe=`<template>\r
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
<script setup lang="ts">\r
import { FButton } from '@geniusmanyxh/fit-ui'\r
<\/script>`,en=`<template>\r
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
<script setup lang="ts">\r
import { FButton } from '@geniusmanyxh/fit-ui'\r
<\/script>`,nn=`<template>\r
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
</style>`,tn=`<template>\r
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
</style>`,an=`<template>\r
    <div class="show-components">\r
        <f-button @click="showMessage">普通使用</f-button>\r
    </div>\r
</template>\r
\r
<script setup lang="ts">\r
import { useMessage } from '@geniusmanyxh/fit-ui'\r
const MSG = useMessage()\r
const showMessage = () => {\r
    MSG.message({msg: '我是一个消息提示'})\r
}\r
<\/script>\r
\r
<style scoped>\r
\r
</style>`,rn=`<template>\r
    <div class="show-components">\r
        <f-button  @click="showMessage()">默认时长2s</f-button>\r
        <f-button  @click="showMessage(3000)">设置时长3s</f-button>\r
        <f-button  @click="showMessage(0)">设置0s则不消失</f-button>\r
        <f-button  @click="showMessage('notime')">设置'notime'也不消失</f-button>\r
    </div>\r
</template>\r
\r
<script setup lang="ts">\r
import { useMessage } from '@geniusmanyxh/fit-ui'\r
const MSG = useMessage()\r
const showMessage = (duration?: 'notime' | number) => {\r
    let tips = ''\r
    if (duration === 'notime') {\r
        tips = '设置\\'notime\\'也不消失'\r
    } else if (duration === 0) {\r
        tips = '设置0s则不消失'\r
    } else if(duration === undefined) {\r
        tips = '默认时长2s'\r
    } else {\r
        tips = \`设置\${duration/1000}s\`\r
    }\r
    MSG.message({ msg: \`我是一个\${tips}的消息提示\`,duration })\r
}\r
\r
<\/script>\r
\r
<style scoped></style>`,sn=`<template>\r
    <div class="show-components">\r
        <f-button @click="showMessage">可以手动关闭的消息</f-button>\r
    </div>\r
</template>\r
\r
<script setup lang="ts">\r
import { useMessage } from '@geniusmanyxh/fit-ui'\r
const MSG = useMessage()\r
const showMessage = () => {\r
    MSG.message({msg: '我是一个有关闭图标的消息提示',duration:5000,showClose:true})\r
}\r
<\/script>\r
\r
<style scoped>\r
\r
</style>`,on=`<template>\r
    <div class="show-components">\r
        <f-button type="primary" @click="showMessage('default')">default消息</f-button>\r
        <f-button type="info" @click="showMessage('info')">info消息</f-button>\r
        <f-button type="success" @click="showMessage('success')">success消息</f-button>\r
        <f-button type="warn" @click="showMessage('warning')">warning消息</f-button>\r
        <f-button type="danger" @click="showMessage('error')">error消息</f-button>\r
    </div>\r
</template>\r
\r
<script setup lang="ts">\r
import { useMessage } from '@geniusmanyxh/fit-ui'\r
const MSG = useMessage()\r
const showMessage = (type: string) => {\r
    if (type === 'default') {\r
        MSG.message({ msg: '我是一个默认消息提示' })\r
    } else {\r
        MSG[type](\`我是一个\${type}消息提示\`)\r
    }\r
}\r
\r
<\/script>\r
\r
<style scoped></style>`;var re=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function un(l){return l&&l.__esModule&&Object.prototype.hasOwnProperty.call(l,"default")?l.default:l}var ue={exports:{}};(function(l){var p=typeof window<"u"?window:typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope?self:{};/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 *
 * @license MIT <https://opensource.org/licenses/MIT>
 * @author Lea Verou <https://lea.verou.me>
 * @namespace
 * @public
 */var t=function(c){var f=/(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i,y=0,h={},i={manual:c.Prism&&c.Prism.manual,disableWorkerMessageHandler:c.Prism&&c.Prism.disableWorkerMessageHandler,util:{encode:function n(e){return e instanceof _?new _(e.type,n(e.content),e.alias):Array.isArray(e)?e.map(n):e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(n){return Object.prototype.toString.call(n).slice(8,-1)},objId:function(n){return n.__id||Object.defineProperty(n,"__id",{value:++y}),n.__id},clone:function n(e,a){a=a||{};var r,s;switch(i.util.type(e)){case"Object":if(s=i.util.objId(e),a[s])return a[s];r={},a[s]=r;for(var u in e)e.hasOwnProperty(u)&&(r[u]=n(e[u],a));return r;case"Array":return s=i.util.objId(e),a[s]?a[s]:(r=[],a[s]=r,e.forEach(function(g,o){r[o]=n(g,a)}),r);default:return e}},getLanguage:function(n){for(;n;){var e=f.exec(n.className);if(e)return e[1].toLowerCase();n=n.parentElement}return"none"},setLanguage:function(n,e){n.className=n.className.replace(RegExp(f,"gi"),""),n.classList.add("language-"+e)},currentScript:function(){if(typeof document>"u")return null;if("currentScript"in document&&1<2)return document.currentScript;try{throw new Error}catch(r){var n=(/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(r.stack)||[])[1];if(n){var e=document.getElementsByTagName("script");for(var a in e)if(e[a].src==n)return e[a]}return null}},isActive:function(n,e,a){for(var r="no-"+e;n;){var s=n.classList;if(s.contains(e))return!0;if(s.contains(r))return!1;n=n.parentElement}return!!a}},languages:{plain:h,plaintext:h,text:h,txt:h,extend:function(n,e){var a=i.util.clone(i.languages[n]);for(var r in e)a[r]=e[r];return a},insertBefore:function(n,e,a,r){r=r||i.languages;var s=r[n],u={};for(var g in s)if(s.hasOwnProperty(g)){if(g==e)for(var o in a)a.hasOwnProperty(o)&&(u[o]=a[o]);a.hasOwnProperty(g)||(u[g]=s[g])}var m=r[n];return r[n]=u,i.languages.DFS(i.languages,function(x,P){P===m&&x!=n&&(this[x]=u)}),u},DFS:function n(e,a,r,s){s=s||{};var u=i.util.objId;for(var g in e)if(e.hasOwnProperty(g)){a.call(e,g,e[g],r||g);var o=e[g],m=i.util.type(o);m==="Object"&&!s[u(o)]?(s[u(o)]=!0,n(o,a,null,s)):m==="Array"&&!s[u(o)]&&(s[u(o)]=!0,n(o,a,g,s))}}},plugins:{},highlightAll:function(n,e){i.highlightAllUnder(document,n,e)},highlightAllUnder:function(n,e,a){var r={callback:a,container:n,selector:'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'};i.hooks.run("before-highlightall",r),r.elements=Array.prototype.slice.apply(r.container.querySelectorAll(r.selector)),i.hooks.run("before-all-elements-highlight",r);for(var s=0,u;u=r.elements[s++];)i.highlightElement(u,e===!0,r.callback)},highlightElement:function(n,e,a){var r=i.util.getLanguage(n),s=i.languages[r];i.util.setLanguage(n,r);var u=n.parentElement;u&&u.nodeName.toLowerCase()==="pre"&&i.util.setLanguage(u,r);var g=n.textContent,o={element:n,language:r,grammar:s,code:g};function m(P){o.highlightedCode=P,i.hooks.run("before-insert",o),o.element.innerHTML=o.highlightedCode,i.hooks.run("after-highlight",o),i.hooks.run("complete",o),a&&a.call(o.element)}if(i.hooks.run("before-sanity-check",o),u=o.element.parentElement,u&&u.nodeName.toLowerCase()==="pre"&&!u.hasAttribute("tabindex")&&u.setAttribute("tabindex","0"),!o.code){i.hooks.run("complete",o),a&&a.call(o.element);return}if(i.hooks.run("before-highlight",o),!o.grammar){m(i.util.encode(o.code));return}if(e&&c.Worker){var x=new Worker(i.filename);x.onmessage=function(P){m(P.data)},x.postMessage(JSON.stringify({language:o.language,code:o.code,immediateClose:!0}))}else m(i.highlight(o.code,o.grammar,o.language))},highlight:function(n,e,a){var r={code:n,grammar:e,language:a};if(i.hooks.run("before-tokenize",r),!r.grammar)throw new Error('The language "'+r.language+'" has no grammar.');return r.tokens=i.tokenize(r.code,r.grammar),i.hooks.run("after-tokenize",r),_.stringify(i.util.encode(r.tokens),r.language)},tokenize:function(n,e){var a=e.rest;if(a){for(var r in a)e[r]=a[r];delete e.rest}var s=new D;return w(s,s.head,n),$(n,s,e,s.head,0),z(s)},hooks:{all:{},add:function(n,e){var a=i.hooks.all;a[n]=a[n]||[],a[n].push(e)},run:function(n,e){var a=i.hooks.all[n];if(!(!a||!a.length))for(var r=0,s;s=a[r++];)s(e)}},Token:_};c.Prism=i;function _(n,e,a,r){this.type=n,this.content=e,this.alias=a,this.length=(r||"").length|0}_.stringify=function n(e,a){if(typeof e=="string")return e;if(Array.isArray(e)){var r="";return e.forEach(function(m){r+=n(m,a)}),r}var s={type:e.type,content:n(e.content,a),tag:"span",classes:["token",e.type],attributes:{},language:a},u=e.alias;u&&(Array.isArray(u)?Array.prototype.push.apply(s.classes,u):s.classes.push(u)),i.hooks.run("wrap",s);var g="";for(var o in s.attributes)g+=" "+o+'="'+(s.attributes[o]||"").replace(/"/g,"&quot;")+'"';return"<"+s.tag+' class="'+s.classes.join(" ")+'"'+g+">"+s.content+"</"+s.tag+">"};function F(n,e,a,r){n.lastIndex=e;var s=n.exec(a);if(s&&r&&s[1]){var u=s[1].length;s.index+=u,s[0]=s[0].slice(u)}return s}function $(n,e,a,r,s,u){for(var g in a)if(!(!a.hasOwnProperty(g)||!a[g])){var o=a[g];o=Array.isArray(o)?o:[o];for(var m=0;m<o.length;++m){if(u&&u.cause==g+","+m)return;var x=o[m],P=x.inside,Y=!!x.lookbehind,K=!!x.greedy,ce=x.alias;if(K&&!x.pattern.global){var pe=x.pattern.toString().match(/[imsuy]*$/)[0];x.pattern=RegExp(x.pattern.source,pe+"g")}for(var Q=x.pattern||x,A=r.next,E=s;A!==e.tail&&!(u&&E>=u.reach);E+=A.value.length,A=A.next){var L=A.value;if(e.length>n.length)return;if(!(L instanceof _)){var G=1,k;if(K){if(k=F(Q,E,n,Y),!k||k.index>=n.length)break;var B=k.index,ge=k.index+k[0].length,C=E;for(C+=A.value.length;B>=C;)A=A.next,C+=A.value.length;if(C-=A.value.length,E=C,A.value instanceof _)continue;for(var R=A;R!==e.tail&&(C<ge||typeof R.value=="string");R=R.next)G++,C+=R.value.length;G--,L=n.slice(E,C),k.index-=E}else if(k=F(Q,0,L,Y),!k)continue;var B=k.index,V=k[0],U=L.slice(0,B),ee=L.slice(B+V.length),q=E+L.length;u&&q>u.reach&&(u.reach=q);var H=A.prev;U&&(H=w(e,H,U),E+=U.length),I(e,H,G);var fe=new _(g,P?i.tokenize(V,P):V,ce,V);if(A=w(e,H,fe),ee&&w(e,A,ee),G>1){var Z={cause:g+","+m,reach:q};$(n,e,a,A.prev,E,Z),u&&Z.reach>u.reach&&(u.reach=Z.reach)}}}}}}function D(){var n={value:null,prev:null,next:null},e={value:null,prev:n,next:null};n.next=e,this.head=n,this.tail=e,this.length=0}function w(n,e,a){var r=e.next,s={value:a,prev:e,next:r};return e.next=s,r.prev=s,n.length++,s}function I(n,e,a){for(var r=e.next,s=0;s<a&&r!==n.tail;s++)r=r.next;e.next=r,r.prev=e,n.length-=s}function z(n){for(var e=[],a=n.head.next;a!==n.tail;)e.push(a.value),a=a.next;return e}if(!c.document)return c.addEventListener&&(i.disableWorkerMessageHandler||c.addEventListener("message",function(n){var e=JSON.parse(n.data),a=e.language,r=e.code,s=e.immediateClose;c.postMessage(i.highlight(r,i.languages[a],a)),s&&c.close()},!1)),i;var v=i.util.currentScript();v&&(i.filename=v.src,v.hasAttribute("data-manual")&&(i.manual=!0));function d(){i.manual||i.highlightAll()}if(!i.manual){var b=document.readyState;b==="loading"||b==="interactive"&&v&&v.defer?document.addEventListener("DOMContentLoaded",d):window.requestAnimationFrame?window.requestAnimationFrame(d):window.setTimeout(d,16)}return i}(p);l.exports&&(l.exports=t),typeof re<"u"&&(re.Prism=t),t.languages.markup={comment:{pattern:/<!--(?:(?!<!--)[\s\S])*?-->/,greedy:!0},prolog:{pattern:/<\?[\s\S]+?\?>/,greedy:!0},doctype:{pattern:/<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,greedy:!0,inside:{"internal-subset":{pattern:/(^[^\[]*\[)[\s\S]+(?=\]>$)/,lookbehind:!0,greedy:!0,inside:null},string:{pattern:/"[^"]*"|'[^']*'/,greedy:!0},punctuation:/^<!|>$|[[\]]/,"doctype-tag":/^DOCTYPE/i,name:/[^\s<>'"]+/}},cdata:{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,greedy:!0},tag:{pattern:/<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,greedy:!0,inside:{tag:{pattern:/^<\/?[^\s>\/]+/,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"special-attr":[],"attr-value":{pattern:/=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,inside:{punctuation:[{pattern:/^=/,alias:"attr-equals"},{pattern:/^(\s*)["']|["']$/,lookbehind:!0}]}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:[{pattern:/&[\da-z]{1,8};/i,alias:"named-entity"},/&#x?[\da-f]{1,8};/i]},t.languages.markup.tag.inside["attr-value"].inside.entity=t.languages.markup.entity,t.languages.markup.doctype.inside["internal-subset"].inside=t.languages.markup,t.hooks.add("wrap",function(c){c.type==="entity"&&(c.attributes.title=c.content.replace(/&amp;/,"&"))}),Object.defineProperty(t.languages.markup.tag,"addInlined",{value:function(f,y){var h={};h["language-"+y]={pattern:/(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,lookbehind:!0,inside:t.languages[y]},h.cdata=/^<!\[CDATA\[|\]\]>$/i;var i={"included-cdata":{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,inside:h}};i["language-"+y]={pattern:/[\s\S]+/,inside:t.languages[y]};var _={};_[f]={pattern:RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g,function(){return f}),"i"),lookbehind:!0,greedy:!0,inside:i},t.languages.insertBefore("markup","cdata",_)}}),Object.defineProperty(t.languages.markup.tag,"addAttribute",{value:function(c,f){t.languages.markup.tag.inside["special-attr"].push({pattern:RegExp(/(^|["'\s])/.source+"(?:"+c+")"+/\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,"i"),lookbehind:!0,inside:{"attr-name":/^[^\s=]+/,"attr-value":{pattern:/=[\s\S]+/,inside:{value:{pattern:/(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,lookbehind:!0,alias:[f,"language-"+f],inside:t.languages[f]},punctuation:[{pattern:/^=/,alias:"attr-equals"},/"|'/]}}}})}}),t.languages.html=t.languages.markup,t.languages.mathml=t.languages.markup,t.languages.svg=t.languages.markup,t.languages.xml=t.languages.extend("markup",{}),t.languages.ssml=t.languages.xml,t.languages.atom=t.languages.xml,t.languages.rss=t.languages.xml,function(c){var f=/(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;c.languages.css={comment:/\/\*[\s\S]*?\*\//,atrule:{pattern:RegExp("@[\\w-](?:"+/[^;{\s"']|\s+(?!\s)/.source+"|"+f.source+")*?"+/(?:;|(?=\s*\{))/.source),inside:{rule:/^@[\w-]+/,"selector-function-argument":{pattern:/(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,lookbehind:!0,alias:"selector"},keyword:{pattern:/(^|[^\w-])(?:and|not|only|or)(?![\w-])/,lookbehind:!0}}},url:{pattern:RegExp("\\burl\\((?:"+f.source+"|"+/(?:[^\\\r\n()"']|\\[\s\S])*/.source+")\\)","i"),greedy:!0,inside:{function:/^url/i,punctuation:/^\(|\)$/,string:{pattern:RegExp("^"+f.source+"$"),alias:"url"}}},selector:{pattern:RegExp(`(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|`+f.source+")*(?=\\s*\\{)"),lookbehind:!0},string:{pattern:f,greedy:!0},property:{pattern:/(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,lookbehind:!0},important:/!important\b/i,function:{pattern:/(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,lookbehind:!0},punctuation:/[(){};:,]/},c.languages.css.atrule.inside.rest=c.languages.css;var y=c.languages.markup;y&&(y.tag.addInlined("style","css"),y.tag.addAttribute("style","css"))}(t),t.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,lookbehind:!0,greedy:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0,greedy:!0}],string:{pattern:/(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},"class-name":{pattern:/(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,lookbehind:!0,inside:{punctuation:/[.\\]/}},keyword:/\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,boolean:/\b(?:false|true)\b/,function:/\b\w+(?=\()/,number:/\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,operator:/[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,punctuation:/[{}[\];(),.:]/},t.languages.javascript=t.languages.extend("clike",{"class-name":[t.languages.clike["class-name"],{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,lookbehind:!0}],keyword:[{pattern:/((?:^|\})\s*)catch\b/,lookbehind:!0},{pattern:/(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,lookbehind:!0}],function:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,number:{pattern:RegExp(/(^|[^\w$])/.source+"(?:"+(/NaN|Infinity/.source+"|"+/0[bB][01]+(?:_[01]+)*n?/.source+"|"+/0[oO][0-7]+(?:_[0-7]+)*n?/.source+"|"+/0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source+"|"+/\d+(?:_\d+)*n/.source+"|"+/(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source)+")"+/(?![\w$])/.source),lookbehind:!0},operator:/--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/}),t.languages.javascript["class-name"][0].pattern=/(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/,t.languages.insertBefore("javascript","keyword",{regex:{pattern:RegExp(/((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source+/\//.source+"(?:"+/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source+"|"+/(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source+")"+/(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source),lookbehind:!0,greedy:!0,inside:{"regex-source":{pattern:/^(\/)[\s\S]+(?=\/[a-z]*$)/,lookbehind:!0,alias:"language-regex",inside:t.languages.regex},"regex-delimiter":/^\/|\/$/,"regex-flags":/^[a-z]+$/}},"function-variable":{pattern:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,alias:"function"},parameter:[{pattern:/(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,lookbehind:!0,inside:t.languages.javascript},{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,lookbehind:!0,inside:t.languages.javascript},{pattern:/(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,lookbehind:!0,inside:t.languages.javascript},{pattern:/((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,lookbehind:!0,inside:t.languages.javascript}],constant:/\b[A-Z](?:[A-Z_]|\dx?)*\b/}),t.languages.insertBefore("javascript","string",{hashbang:{pattern:/^#!.*/,greedy:!0,alias:"comment"},"template-string":{pattern:/`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,greedy:!0,inside:{"template-punctuation":{pattern:/^`|`$/,alias:"string"},interpolation:{pattern:/((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,lookbehind:!0,inside:{"interpolation-punctuation":{pattern:/^\$\{|\}$/,alias:"punctuation"},rest:t.languages.javascript}},string:/[\s\S]+/}},"string-property":{pattern:/((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,lookbehind:!0,greedy:!0,alias:"property"}}),t.languages.insertBefore("javascript","operator",{"literal-property":{pattern:/((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,lookbehind:!0,alias:"property"}}),t.languages.markup&&(t.languages.markup.tag.addInlined("script","javascript"),t.languages.markup.tag.addAttribute(/on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,"javascript")),t.languages.js=t.languages.javascript,function(){if(typeof t>"u"||typeof document>"u")return;Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector);var c="Loading…",f=function(v,d){return"✖ Error "+v+" while fetching file: "+d},y="✖ Error: File does not exist or is empty",h={js:"javascript",py:"python",rb:"ruby",ps1:"powershell",psm1:"powershell",sh:"bash",bat:"batch",h:"c",tex:"latex"},i="data-src-status",_="loading",F="loaded",$="failed",D="pre[data-src]:not(["+i+'="'+F+'"]):not(['+i+'="'+_+'"])';function w(v,d,b){var n=new XMLHttpRequest;n.open("GET",v,!0),n.onreadystatechange=function(){n.readyState==4&&(n.status<400&&n.responseText?d(n.responseText):n.status>=400?b(f(n.status,n.statusText)):b(y))},n.send(null)}function I(v){var d=/^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(v||"");if(d){var b=Number(d[1]),n=d[2],e=d[3];return n?e?[b,Number(e)]:[b,void 0]:[b,b]}}t.hooks.add("before-highlightall",function(v){v.selector+=", "+D}),t.hooks.add("before-sanity-check",function(v){var d=v.element;if(d.matches(D)){v.code="",d.setAttribute(i,_);var b=d.appendChild(document.createElement("CODE"));b.textContent=c;var n=d.getAttribute("data-src"),e=v.language;if(e==="none"){var a=(/\.(\w+)$/.exec(n)||[,"none"])[1];e=h[a]||a}t.util.setLanguage(b,e),t.util.setLanguage(d,e);var r=t.plugins.autoloader;r&&r.loadLanguages(e),w(n,function(s){d.setAttribute(i,F);var u=I(d.getAttribute("data-range"));if(u){var g=s.split(/\r\n?|\n/g),o=u[0],m=u[1]==null?g.length:u[1];o<0&&(o+=g.length),o=Math.max(0,Math.min(o-1,g.length)),m<0&&(m+=g.length),m=Math.max(0,Math.min(m,g.length)),s=g.slice(o,m).join(`
`),d.hasAttribute("data-start")||d.setAttribute("data-start",String(o+1))}b.textContent=s,t.highlightElement(b)},function(s){d.setAttribute(i,$),b.textContent=s})}}),t.plugins.fileHighlight={highlight:function(d){for(var b=(d||document).querySelectorAll(D),n=0,e;e=b[n++];)t.highlightElement(e)}};var z=!1;t.fileHighlight=function(){z||(console.warn("Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead."),z=!0),t.plugins.fileHighlight.highlight.apply(this,arguments)}}()})(ue);var ln=ue.exports;const se=un(ln),cn={vue:"html",html:"html",js:"javascript",ts:"typescript"};function pn(l,p){const t=cn[p],c=se.languages[t];if(!t||!c)return console.warn(`Prism does not support the language '${p}'.`),l;const f=se.highlight(l,c,p);return`<pre class="language-${p}"><code >${f}</code></pre>`}const gn={class:"source-code-box"},fn=["innerHTML"],dn=J({__name:"showSourceCode",props:{filePath:{default:"../../../examples/button/index.vue"},lang:{default:"html"}},setup(l){const p=Object.assign({"../../../examples/button/button_icon.vue":Ye,"../../../examples/button/button_size.vue":Ke,"../../../examples/button/index.vue":Qe,"../../../examples/button/round.vue":en,"../../../examples/icon/icon_size.vue":nn,"../../../examples/icon/index.vue":tn,"../../../examples/message/index.vue":an,"../../../examples/message/msgDuration.vue":rn,"../../../examples/message/msgShowClose.vue":sn,"../../../examples/message/msgType.vue":on}),t=l,c=Ze(),f=M("");M(!1),M("复制失败!");const y=async()=>{try{await qe(p[t.filePath]),c.success("复制成功!")}catch{c.error("复制失败!")}};return ie(()=>t.filePath,h=>{h&&(f.value=pn(p[h],t.lang))},{immediate:!0,deep:!0}),(h,i)=>(T(),W("div",gn,[j("div",{innerHTML:f.value},null,8,fn),j("div",{class:"copy-code",onClick:y},"复制")]))}});const mn=oe(dn,[["__scopeId","data-v-e4412ec9"]]),hn={class:"showDemo"},vn={key:0,class:"show-desc"},bn={key:2,class:"show-components"},yn=J({__name:"index",props:{rootPath:{default:"../../../examples"},filePath:{default:"button/index.vue"},desc:{default:null},lang:{default:"vue"}},setup(l){const p=l,t=de(),c=M(t.default!==void 0),f=M(t.desc!==void 0),y=Object.assign({"../../../examples/button/button_icon.vue":()=>S(()=>import("./chunks/button_icon.a27dab63.js"),["assets/chunks/button_icon.a27dab63.js","assets/chunks/clipboard-polyfill.es6.28fdf13d.js","assets/chunks/framework.40c44b93.js"]),"../../../examples/button/button_size.vue":()=>S(()=>import("./chunks/button_size.87061ccf.js"),["assets/chunks/button_size.87061ccf.js","assets/chunks/clipboard-polyfill.es6.28fdf13d.js","assets/chunks/framework.40c44b93.js"]),"../../../examples/button/index.vue":()=>S(()=>import("./chunks/index.43473f98.js"),["assets/chunks/index.43473f98.js","assets/chunks/clipboard-polyfill.es6.28fdf13d.js","assets/chunks/framework.40c44b93.js"]),"../../../examples/button/round.vue":()=>S(()=>import("./chunks/round.947787b1.js"),["assets/chunks/round.947787b1.js","assets/chunks/clipboard-polyfill.es6.28fdf13d.js","assets/chunks/framework.40c44b93.js"]),"../../../examples/icon/icon_size.vue":()=>S(()=>import("./chunks/icon_size.c5cf11f3.js"),["assets/chunks/icon_size.c5cf11f3.js","assets/chunks/clipboard-polyfill.es6.28fdf13d.js","assets/chunks/framework.40c44b93.js"]),"../../../examples/icon/index.vue":()=>S(()=>import("./chunks/index.5f5595b7.js"),["assets/chunks/index.5f5595b7.js","assets/chunks/clipboard-polyfill.es6.28fdf13d.js","assets/chunks/framework.40c44b93.js"]),"../../../examples/message/index.vue":()=>S(()=>import("./chunks/index.d87f4c04.js"),["assets/chunks/index.d87f4c04.js","assets/chunks/clipboard-polyfill.es6.28fdf13d.js","assets/chunks/framework.40c44b93.js"]),"../../../examples/message/msgDuration.vue":()=>S(()=>import("./chunks/msgDuration.b98e8d55.js"),["assets/chunks/msgDuration.b98e8d55.js","assets/chunks/clipboard-polyfill.es6.28fdf13d.js","assets/chunks/framework.40c44b93.js"]),"../../../examples/message/msgShowClose.vue":()=>S(()=>import("./chunks/msgShowClose.843d4d65.js"),["assets/chunks/msgShowClose.843d4d65.js","assets/chunks/clipboard-polyfill.es6.28fdf13d.js","assets/chunks/framework.40c44b93.js"]),"../../../examples/message/msgType.vue":()=>S(()=>import("./chunks/msgType.aa0c2fc6.js"),["assets/chunks/msgType.aa0c2fc6.js","assets/chunks/clipboard-polyfill.es6.28fdf13d.js","assets/chunks/framework.40c44b93.js"])}),h=M(`${p.rootPath}/${p.filePath}`),i=me(),_=async w=>{i.value=Fe(y[w])},F=M(!1),$=M("显示代码"),D=()=>{F.value=!F.value,F.value?$.value="隐藏代码":$.value="显示代码"};return ie([()=>p.rootPath,()=>p.filePath,()=>p.desc],([w,I,z])=>{h.value=w+"/"+I,_(h.value)},{immediate:!0,deep:!0}),(w,I)=>{const z=Ae("ClientOnly");return T(),N(z,null,{default:ne(()=>[j("div",hn,[f.value?(T(),W("div",vn,[te(w.$slots,"desc",{},void 0,!0)])):he((T(),W("div",{key:1,class:"show-desc"},ae(w.desc),513)),[[ve,w.desc]]),c.value?(T(),W("div",bn,[te(w.$slots,"default",{},void 0,!0)])):(T(),N(be(i.value),{key:3})),j("div",{class:"is-show-code",style:ye({marginBottom:F.value?"-5px":"0px"}),onClick:D},[j("span",null,ae($.value),1)],4),_e(xe,null,{default:ne(()=>[F.value?(T(),N(mn,{key:0,"file-path":h.value,lang:w.lang},null,8,["file-path","lang"])):we("",!0)]),_:1})])]),_:3})}}});const _n=oe(yn,[["__scopeId","data-v-dcc06892"]]);const wn={...Ve,enhanceApp({app:l}){l.use(Je),l.component("sdemo",_n)}};function le(l){if(l.extends){const p=le(l.extends);return{...p,...l,async enhanceApp(t){p.enhanceApp&&await p.enhanceApp(t),l.enhanceApp&&await l.enhanceApp(t)}}}return l}const O=le(wn),xn=J({name:"VitePressApp",setup(){const{site:l}=Ie();return Le(()=>{Oe(()=>{document.documentElement.lang=l.value.lang,document.documentElement.dir=l.value.dir})}),Re(),je(),Ge(),O.setup&&O.setup(),()=>Be(O.Layout)}});async function An(){const l=kn(),p=Fn();p.provide(Se,l);const t=Ee(l.route);return p.provide($e,t),p.component("Content",Pe),p.component("ClientOnly",Ce),Object.defineProperties(p.config.globalProperties,{$frontmatter:{get(){return t.frontmatter.value}},$params:{get(){return t.page.value.params}}}),O.enhanceApp&&await O.enhanceApp({app:p,router:l,siteData:Me}),{app:p,router:l,data:t}}function Fn(){return De(xn)}function kn(){let l=X,p;return ze(t=>{let c=Te(t),f=null;return c&&(l&&(p=c),(l||p===c)&&(c=c.replace(/\.js$/,".lean.js")),f=S(()=>import(c),[])),X&&(l=!1),f},O.NotFound)}X&&An().then(({app:l,router:p,data:t})=>{p.go().then(()=>{ke(p.route,t.site),l.mount("#app")})});export{An as createApp};
