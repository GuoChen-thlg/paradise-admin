(window.webpackJsonp=window.webpackJsonp||[]).push([["personnel"],{"0e8b":function(e,t,o){"use strict";o("14a1")},"14a1":function(e,t,o){},2463:function(e,t,o){"use strict";o.r(t);var n=o("8bbf"),a=Object(n.withScopeId)("data-v-7129591c");Object(n.pushScopeId)("data-v-7129591c");var c=Object(n.createVNode)("div",null,null,-1),l=Object(n.createTextVNode)(" 编辑 "),r=Object(n.createTextVNode)("Edit"),b=Object(n.createTextVNode)("Delete");Object(n.popScopeId)();var d=a((function(e,t,o,d,i,p){var u=Object(n.resolveComponent)("el-table-column"),s=Object(n.resolveComponent)("el-button"),j=Object(n.resolveComponent)("el-table"),O=Object(n.resolveComponent)("el-pagination"),f=Object(n.resolveComponent)("el-skeleton"),m=Object(n.resolveComponent)("el-main");return Object(n.openBlock)(),Object(n.createBlock)(m,{class:"personnel"},{default:a((function(){return[c,0!==e.table.data.length?(Object(n.openBlock)(),Object(n.createBlock)(n.Fragment,{key:0},[Object(n.createVNode)(j,{data:e.table.data},{default:a((function(){return[Object(n.createVNode)(u,{type:"selection"}),(Object(n.openBlock)(!0),Object(n.createBlock)(n.Fragment,null,Object(n.renderList)(e.column,(function(e,t){return Object(n.openBlock)(),Object(n.createBlock)(u,{key:e.label,label:e.label,prop:e.prop,"show-overflow-tooltip":0!==t,sortable:e.sortable,"min-width":e.width},null,8,["label","prop","show-overflow-tooltip","sortable","min-width"])})),128)),Object(n.createVNode)(u,{align:"right","min-width":"150px"},{header:a((function(){return[l]})),default:a((function(e){return[Object(n.createVNode)(s,{key:e.id,size:"mini"},{default:a((function(){return[r]})),_:2},1024),Object(n.createVNode)(s,{size:"mini",type:"danger"},{default:a((function(){return[b]})),_:1})]})),_:1})]})),_:1},8,["data"]),Object(n.createVNode)(O,{class:"pagination",background:"",layout:"prev, pager, next",total:1e3})],64)):(Object(n.openBlock)(),Object(n.createBlock)(f,{key:1,rows:10,animated:""}))]})),_:1})})),i=o("79f6"),p=Object(n.defineComponent)({name:"Personnel",setup:function(){var e=Object(n.ref)([{label:"ID",prop:"id",width:""},{label:"姓名",prop:"name",width:""},{label:"注册时间",prop:"date",width:"100px",sortable:!0},{label:"部门",prop:"department",width:""},{label:"职务",prop:"duties",width:""}]),t=Object(n.reactive)({data:[],search:""});return Object(i.h)().then((function(e){e&&(t.data=e.data)})),{column:e,table:t}}}),u=(o("0e8b"),o("6b0d"));u=o.n(u);t.default=u()(p,[["render",d],["__scopeId","data-v-7129591c"]])}}]);