"use strict";(self.webpackChunkTypeScriptAdvance=self.webpackChunkTypeScriptAdvance||[]).push([[974],{67974:function(S,i,n){n.r(i),n.d(i,{default:function(){return y}});var v=n(15009),c=n.n(v),f=n(99289),h=n.n(f),m=n(5574),g=n.n(m),e=n(67294),t=n(85893),p=function(){var C=(0,e.useState)([]),d=g()(C,2),T=d[0],j=d[1];(0,e.useEffect)(function(){x()},[]);var x=function(){var r=h()(c()().mark(function u(){var a;return c()().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:a=new XMLHttpRequest,a.open("get","https://api.github.com/repos/eternallycyf/my-demo-markdown/contributors"),a.send(),a.onload=function(){var s=JSON.parse(a.responseText);s=s.map(function(l){return{name:l.login,avatar_url:l.avatar_url,github_url:l.html_url}}),j(s)};case 4:case"end":return o.stop()}},u)}));return function(){return r.apply(this,arguments)}}();return(0,t.jsx)(t.Fragment,{children:(0,t.jsx)("div",{children:T.map(function(r){return(0,t.jsx)(e.Fragment,{children:(0,t.jsx)("span",{className:"avatar",onClick:function(){return window.open(r.github_url)},children:(0,t.jsx)("img",{src:r.avatar_url})})},r.name)})})})},y=p}}]);
