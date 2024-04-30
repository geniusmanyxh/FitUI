import{d as _,h as m,aj as E,x as H,o as S,c as z,L as X,l as y,j as le,z as ce,r as $,e as se,k as ue,H as de,n as fe,a1 as pe}from"./framework.8f7cce5e.js";const me=["small","medium","large"],h={};me.forEach(e=>{h[e]=e+"_but"});const ve=["default","primary","success","info","warning","danger"],B={};ve.forEach(e=>{B[e]=`${e}_button`});const he=["google","baidu","apple","github","typescript","android","windows","edge"],q={};he.forEach(e=>{q[e]=`i-bxl-${e}`});const be=["add","archive","arrow-down","arrow-left-down","arrow-left-up","arrow-left","arrow-right-down","arrow-right-up","arrow-right","arrow-up","attachment","backspace","ban","bar-chart-alt","bar-chart","board","bold","book","bookmark","calendar","call","camera","caret-down","caret-left","caret-right","caret-up","check","chevron-double-down","chevron-double-left","chevron-double-right","chevron-double-up","chevron-down","chevron-left","chevron-right","chevron-up","circle-add","circle-arrow-down","circle-arrow-left","circle-arrow-right","circle-arrow-up","circle-check","circle-error","circle-help","circle-information","circle-remove","circle-warning","circle","clipboard-check","clipboard-list","clipboard","clock","close","cloud-download","cloud-upload","cloud","cloudy","comment","compass","computer","copy","credit-card","database","delete-alt","delete","document-add","document-check","document-download","document-empty","document-remove","document","download","drag","drop","edit-alt","edit","email","enter","expand","export","external-link","eye-off","eye","favorite","filter-1","filter-alt","filter","flag","fog","folder-add","folder-check","folder-download","folder-remove","folder","grid","heart","home","image","inbox","italic","laptop","layers","layout","link-alt","link","list","location","lock","log-in","log-out","map","megaphone","menu","message-alt","message","minimize","mobile","moon","next","notification-off","notification","options-horizontal","options-vertical","pause","pen","percentage","pin","play","previous","print","rain","refresh","remove","reorder-alt","reorder","repeat","save","search","select","send","settings","share","shopping-cart-add","shopping-cart","shuffle","snow","snowflake","sort","speakers","stop","storm","strikethrough","sun","sunrise","sunset","switch","table","tablet","tag","temperature","text","three-rows","two-columns","two-rows","underline","undo","unlock","user-add","user-check","user-remove","user","users","volume-off","volume-up","warning","webcam","wind","window","zoom-in","zoom-out"],ge=[...be],J={};ge.forEach(e=>{J[e]=`i-mi-${e}`});const we={...q,...J},w={large:"36px",medium:"24px",small:"12px"},N=(e="medium")=>{const t=typeof e;return t==="number"?`${e}px`:t==="string"&&Object.keys(w).includes(e)?w[e]:w.medium},ye=_({name:"FIcon",inheritAttrs:!1}),_e=_({...ye,props:{icon:{},size:{}},setup(e){const t=e;let o=m("");const a=m(!1),c=i=>{i&&(o.value=we[i])},f=E({fontSize:N()});return H([()=>t.icon,()=>t.size],i=>{i[0]&&c(i[0]),i[1]?(f.fontSize=N(i[1]),a.value=!0):a.value=!1},{deep:!0,immediate:!0}),(i,s)=>(S(),z("i",X({class:y(o),style:a.value?f:null},i.$attrs),null,16))}}),K=e=>(e.install=t=>{const o=e.name||e.__name;t.component(o,e)},e),ke=K(_e),xe=["onClick"],Ce={key:0,class:"flex justify-center items-center"},Te=_({name:"FButton",inheritAttrs:!1}),Ee=_({...Te,props:{type:{},plain:{type:Boolean},round:{type:Boolean},size:{},icon:{}},setup(e){const t=e,o=m(),a="_plain",c="button_round",f=m(h.medium),i=m("default"),s=m(B[i.value]);let n=E([s.value]);const A=m("github");let d=E(["btn_icon"]);const te=r=>{r&&r!==i.value?(n=n.filter(l=>l!==s.value),i.value=r,s.value=B[i.value],n.push(s.value)):n.includes(s.value)||n.push(s.value)},oe=r=>{r?n.includes(a)||(n=n.filter(l=>l!==s.value),n.push(s.value+a)):(n=n.filter(l=>l!==s.value+a),n.includes(s.value)||n.push(s.value))},ne=r=>{r?n.includes(c)||n.push(c):n.includes(c)&&(n=n.filter(l=>l!==c))},re=r=>{n=n.filter(l=>l!==f.value),r?n.includes(h[r])||(n.push(h[r]),f.value=h[r]):n.push(h.medium)},ae=r=>{if(!r)return;A.value=r;let l=f.value.split("_")[0];if(d.includes(l)||(d=d.filter(p=>p!=="small"&&p!=="medium"&&p!=="large"),d.push(l)),t.plain){const p={primary:"blue",success:"green",warning:"yellow",danger:"red",info:"gray"};let C=p[i.value];i.value!=="default"?(d=d.filter(v=>{let T=Object.keys(p).map(ie=>`text-${ie}-500`);return T=[...T,"black","white"],!T.includes(v)}),d.push(`text-${C}-500`)):d=d.filter(v=>v!=="black"&&v!=="white")}};H([()=>t.type,()=>t.plain,()=>t.round,()=>t.size,()=>t.icon],([r,l,p,C,v])=>{te(r),oe(l),ne(p),re(C),ae(v)},{immediate:!0,deep:!0});const x=r=>{o.value&&o.value.contains(r.target)};return le(()=>{document.addEventListener("click",x)}),ce(()=>{document.removeEventListener("click",x)}),(r,l)=>(S(),z("button",X({ref_key:"fbutton",ref:o,class:y(n)},r.$attrs,{onClick:pe(x,["stop"])}),[r.icon?(S(),z("div",Ce,[$(r.$slots,"icon",{},()=>[de(y(ke),{icon:A.value,class:fe(y(d))},null,8,["icon","class"])],!0)])):se("",!0),ue("div",null,[$(r.$slots,"default",{},void 0,!0)])],16,xe))}}),Se=(e,t)=>{const o=e.__vccOpts||e;for(const[a,c]of t)o[a]=c;return o},ze=Se(Ee,[["__scopeId","data-v-f5e327c7"]]),Ue=K(ze);var g="text/plain";function Be(){(console.warn||console.log).apply(console,arguments)}Be.bind("[clipboard-polyfill]");var I=typeof window>"u"?void 0:window,Ie=typeof globalThis>"u"?void 0:globalThis,j,D,L,O=(L=(j=I)==null?void 0:j.Promise)!=null?L:(D=Ie)==null?void 0:D.Promise;function Ae(){if(!O)throw new Error("No `Promise` implementation available for `clipboard-polyfill`. Consider using: https://github.com/lgarron/clipboard-polyfill#flat-file-version-with-promise-included");return O}var P=typeof navigator>"u"?void 0:navigator,u=P==null?void 0:P.clipboard,F;(F=u==null?void 0:u.read)==null||F.bind(u);var R;(R=u==null?void 0:u.readText)==null||R.bind(u);var U;(U=u==null?void 0:u.write)==null||U.bind(u);var M,V=(M=u==null?void 0:u.writeText)==null?void 0:M.bind(u),W;(W=I)==null||W.ClipboardItem;var k=Ae(),b=I;function $e(){return typeof ClipboardEvent>"u"&&typeof(b==null?void 0:b.clipboardData)<"u"&&typeof(b==null?void 0:b.clipboardData.setData)<"u"}function Ne(e){if(!b.clipboardData)return!1;var t=b.clipboardData.setData("Text",e);return t}function je(e,t,o){e.success=!0;for(var a in t){var c=t[a],f=o.clipboardData;f.setData(a,c),a===g&&f.getData(a)!==c&&(e.success=!1)}o.preventDefault()}function Q(e){var t={success:!1},o=je.bind(this,t,e);document.addEventListener("copy",o);try{document.execCommand("copy")}finally{document.removeEventListener("copy",o)}return t.success}function Y(e,t){Z(e);var o=Q(t);return ee(),o}function De(e){var t=document.createElement("div");t.setAttribute("style","-webkit-user-select: text !important"),t.textContent="temporary element",document.body.appendChild(t);var o=Y(t,e);return document.body.removeChild(t),o}function Le(e){var t=document.createElement("div");t.setAttribute("style","-webkit-user-select: text !important");var o=t;t.attachShadow&&(o=t.attachShadow({mode:"open"}));var a=document.createElement("span");a.innerText=e,o.appendChild(a),document.body.appendChild(t),Z(a);var c=document.execCommand("copy");return ee(),document.body.removeChild(t),c}function Z(e){var t=document.getSelection();if(t){var o=document.createRange();o.selectNodeContents(e),t.removeAllRanges(),t.addRange(o)}}function ee(){var e=document.getSelection();e&&e.removeAllRanges()}function Oe(e){var t=g in e;if($e()){if(!t)throw new Error("No `text/plain` value was specified.");if(Ne(e[g]))return!0;throw new Error("Copying failed, possibly because the user rejected it.")}return Q(e),!!(navigator.userAgent.indexOf("Edge")>-1||Y(document.body,e)||De(e)||Le(e[g]))}k.resolve();k.resolve(!1);function Pe(e){return new k((t,o)=>{try{t(e())}catch(a){o(a)}})}function Fe(e){var t={};return t[g]=e,t}function Me(e){return Pe(()=>V?V(e).catch(G):k.resolve(G(e)))}function G(e){if(!Oe(Fe(e)))throw new Error("writeText() failed")}export{Ue as B,ke as F,Me as w};