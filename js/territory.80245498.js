(window.webpackJsonp=window.webpackJsonp||[]).push([["territory"],{a684:function(e,t,n){"use strict";n.r(t);var r=n("8bbf"),o=n("6389"),c=Object(r.defineComponent)({name:"Territory",props:{},setup:function(){var e=Object(o.useRoute)(),t=Object(o.useRouter)();switch(e.params.continent){case"east":case"west":case"south":case"north":break;default:t.push("/404")}return{}}}),a=n("6b0d");a=n.n(a);t.default=a()(c,[["render",function(e,t,n,o,c,a){var s=Object(r.resolveComponent)("el-main");return Object(r.openBlock)(),Object(r.createBlock)(s,null,{default:Object(r.withCtx)((function(){return[Object(r.createTextVNode)(Object(r.toDisplayString)(e.$route.params.continent),1)]})),_:1})}]])}}]);