import{_ as n,o as a,c as s,H as d,Q as c,k as e,a as o,C as l}from"./chunks/framework.40c44b93.js";const C=JSON.parse('{"title":"FMessage 组件","description":"","frontmatter":{},"headers":[],"relativePath":"components/message/index.md","filePath":"components/message/index.md"}'),r={name:"components/message/index.md"},i=c('<h1 id="fmessage-组件" tabindex="-1">FMessage 组件 <a class="header-anchor" href="#fmessage-组件" aria-label="Permalink to &quot;FMessage 组件&quot;">​</a></h1><h2 id="默认使用" tabindex="-1">默认使用 <a class="header-anchor" href="#默认使用" aria-label="Permalink to &quot;默认使用&quot;">​</a></h2><p>引入Hooks方法<code>useMessage</code>来创建一个实例，在调用上面的 <code>message</code> 方法</p><ul><li><code>type</code>属性可以选择:<code>success、info、warning、error、default</code>,默认值为：<code>default</code></li></ul>',4),g=c('<h2 id="不同类型的消息提示" tabindex="-1">不同类型的消息提示 <a class="header-anchor" href="#不同类型的消息提示" aria-label="Permalink to &quot;不同类型的消息提示&quot;">​</a></h2><p>可以使用<code>message</code> 通过传递<code>type</code>属性来控制不同的消息类型。 也可以通过消息实例上面的方法：<code>success</code>、<code>warning</code>、<code>info</code>、<code>error</code>来控制消息类型</p><ul><li><code>实例消息方法</code>：<code>message</code>、<code>success</code>、<code>warning</code>、<code>info</code>、<code>error</code></li></ul>',3),h=e("h2",{id:"控制消息显示时长",tabindex:"-1"},[o("控制消息显示时长 "),e("a",{class:"header-anchor",href:"#控制消息显示时长","aria-label":'Permalink to "控制消息显示时长"'},"​")],-1),_=e("p",null,[o("可以使用"),e("code",null,"duration"),o("属性控制消息显示时长,通常是设置毫秒数值(2000、3000等),如果设置为"),e("code",null,"0|notime"),o("，则消息不会自动关闭,且会自动开启关闭图标。")],-1),x=c('<h2 id="显示关闭按钮" tabindex="-1">显示关闭按钮 <a class="header-anchor" href="#显示关闭按钮" aria-label="Permalink to &quot;显示关闭按钮&quot;">​</a></h2><p>可以使用<code>showClose</code>属性开启关闭图标，点击关闭图标，消息会自动关闭。 但是如果你设置<code>duration</code>属性为<code>0|notime</code>，则自动显示关闭图标。</p><ul><li><code>showClose</code>属性可以选择：<code>true、false</code> , 默认值是：<code>false</code></li></ul>',3),y=c('<h2 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;">​</a></h2><table><thead><tr><th style="text-align:center;">属性</th><th style="text-align:center;">说明</th><th style="text-align:center;">类型</th><th style="text-align:center;">可选值</th><th style="text-align:center;">默认值</th></tr></thead><tbody><tr><td style="text-align:center;"><code>type</code></td><td style="text-align:center;">消息类型</td><td style="text-align:center;"><code>string</code></td><td style="text-align:center;"><code>success、info、warning、error、default</code></td><td style="text-align:center;"><code>default</code></td></tr><tr><td style="text-align:center;"><code>msg</code></td><td style="text-align:center;">消息内容</td><td style="text-align:center;"><code>string</code></td><td style="text-align:center;">无</td><td style="text-align:center;"><code>&#39;&#39;</code></td></tr><tr><td style="text-align:center;"><code>duration</code></td><td style="text-align:center;">消息时长</td><td style="text-align:center;"><code>number||&#39;notime&#39;</code></td><td style="text-align:center;"><code>number、notime、0</code></td><td style="text-align:center;"><code>2000</code></td></tr><tr><td style="text-align:center;"><code>icon</code></td><td style="text-align:center;">图标类名</td><td style="text-align:center;"><code>string</code></td><td style="text-align:center;"><a href="./../icon/#图标列表">详情查看图标列表</a></td><td style="text-align:center;"><code>circle-information</code></td></tr><tr><td style="text-align:center;"><code>showClose</code></td><td style="text-align:center;">手动关闭图标</td><td style="text-align:center;"><code>boolean</code></td><td style="text-align:center;"><code>true、false</code></td><td style="text-align:center;"><code>false</code></td></tr><tr><td style="text-align:center;"><code>zIndex</code></td><td style="text-align:center;">控制元素层级</td><td style="text-align:center;"><code>number</code></td><td style="text-align:center;"><code>number</code></td><td style="text-align:center;"><code>1000</code></td></tr></tbody></table><h2 id="events" tabindex="-1">Events <a class="header-anchor" href="#events" aria-label="Permalink to &quot;Events&quot;">​</a></h2><table><thead><tr><th style="text-align:center;">名称</th><th style="text-align:center;">说明</th><th style="text-align:center;">类型</th><th style="text-align:center;">参数</th><th style="text-align:center;">返回值</th></tr></thead><tbody><tr><td style="text-align:center;"><code>onClose</code></td><td style="text-align:center;">消息关闭事件</td><td style="text-align:center;"><code>Function</code></td><td style="text-align:center;"><code>(type,msg,show(false),close(true))=&gt;{}</code></td><td style="text-align:center;">无</td></tr><tr><td style="text-align:center;"><code>onShow</code></td><td style="text-align:center;">消息显示事件</td><td style="text-align:center;"><code>Function</code></td><td style="text-align:center;"><code>(type,msg,show(true),close(false))=&gt;{}</code></td><td style="text-align:center;">无</td></tr></tbody></table>',4);function u(m,f,p,b,T,P){const t=l("sdemo");return a(),s("div",null,[i,d(t,{filePath:"message/index.vue"}),g,d(t,{filePath:"message/msgType.vue"}),h,_,d(t,{filePath:"message/msgDuration.vue"}),x,d(t,{filePath:"message/msgShowClose.vue"}),y])}const q=n(r,[["render",u]]);export{C as __pageData,q as default};
