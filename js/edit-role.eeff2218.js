(window.webpackJsonp=window.webpackJsonp||[]).push([["edit-role"],{"364c":function(e,t,n){"use strict";n.r(t),n("b0c0"),n("caad"),n("2532");var a=n("8bbf"),s=Object(a.withScopeId)("data-v-73b6c0ca");Object(a.pushScopeId)("data-v-73b6c0ca");var i=Object(a.createTextVNode)("保存"),r=Object(a.createTextVNode)(" 角色 key "),o=Object(a.createTextVNode)(" 角色名 "),l=Object(a.createTextVNode)(" 角色描述 "),d={class:"el-tree-node__label"},c={key:0,class:"permissions-list"},p={key:0,class:"permission-item"},_=Object(a.createTextVNode)("保存");Object(a.popScopeId)();var m=s((function(e,t,n,m,u,E){var h=Object(a.resolveComponent)("el-button"),L=Object(a.resolveComponent)("el-col"),b=Object(a.resolveComponent)("el-input"),f=Object(a.resolveComponent)("el-row"),v=Object(a.resolveComponent)("el-checkbox"),O=Object(a.resolveComponent)("el-tree"),N=Object(a.resolveComponent)("el-card"),j=Object(a.resolveComponent)("el-main");return Object(a.openBlock)(),Object(a.createBlock)(j,{class:"edit-role"},{default:s((function(){return[Object(a.createVNode)("div",null,[Object(a.createVNode)(h,{onClick:e.handleSave},{default:s((function(){return[i]})),_:1},8,["onClick"])]),Object(a.createVNode)(N,null,{default:s((function(){return[Object(a.createVNode)(f,null,{default:s((function(){return[Object(a.createVNode)(L,null,{default:s((function(){return[Object(a.createVNode)(f,null,{default:s((function(){return[Object(a.createVNode)(L,{xs:24,sm:24,md:12,lg:12,xl:12,class:""},{default:s((function(){return[Object(a.createVNode)(f,null,{default:s((function(){return[Object(a.createVNode)(L,{xs:{span:6},sm:{span:4},md:{span:8},lg:{span:6},xl:{span:2},class:"label"},{default:s((function(){return[r]})),_:1}),Object(a.createVNode)(L,{xs:{span:18},sm:{span:20},md:{span:16},lg:{span:18},xl:{span:22}},{default:s((function(){return[Object(a.createVNode)(b,{placeholder:"角色 key",modelValue:e.key,"onUpdate:modelValue":t[1]||(t[1]=function(t){return e.key=t}),modelModifiers:{trim:!0}},null,8,["modelValue"])]})),_:1})]})),_:1})]})),_:1}),Object(a.createVNode)(L,{xs:24,sm:24,md:12,lg:12,xl:12,class:""},{default:s((function(){return[Object(a.createVNode)(f,null,{default:s((function(){return[Object(a.createVNode)(L,{xs:{span:6},sm:{span:4},md:{span:8},lg:{span:6},xl:{span:2},class:"label"},{default:s((function(){return[o]})),_:1}),Object(a.createVNode)(L,{xs:{span:18},sm:{span:20},md:{span:16},lg:{span:18},xl:{span:22}},{default:s((function(){return[Object(a.createVNode)(b,{placeholder:"角色名",modelValue:e.name,"onUpdate:modelValue":t[2]||(t[2]=function(t){return e.name=t}),modelModifiers:{trim:!0}},null,8,["modelValue"])]})),_:1})]})),_:1})]})),_:1}),Object(a.createVNode)(L,{xs:24,sm:24,md:24,lg:24,xl:24},{default:s((function(){return[Object(a.createVNode)(f,null,{default:s((function(){return[Object(a.createVNode)(L,{xs:{span:6},sm:{span:4},md:{span:4},lg:{span:3},xl:{span:1},class:"label"},{default:s((function(){return[l]})),_:1}),Object(a.createVNode)(L,{xs:{span:18},sm:{span:20},md:{span:20},lg:{span:21},xl:{span:23}},{default:s((function(){return[Object(a.createVNode)(b,{type:"textarea",rows:2,placeholder:"角色描述",modelValue:e.describe,"onUpdate:modelValue":t[3]||(t[3]=function(t){return e.describe=t}),modelModifiers:{trim:!0}},null,8,["modelValue"])]})),_:1})]})),_:1})]})),_:1})]})),_:1})]})),_:1}),Object(a.createVNode)(L,null,{default:s((function(){return[Object(a.createVNode)(O,{data:e.defaultMenuTree,"node-key":"id",props:e.defaultProps,"show-checkbox":"","default-checked-keys":e.checkedKeys,ref:"menuTreeRef"},{default:s((function(t){var n=t.node;t=t.data;return[Object(a.createVNode)("span",d,Object(a.toDisplayString)(n.label),1),t.permissions&&0!==t.permissions.length?(Object(a.openBlock)(),Object(a.createBlock)("ul",c,[(Object(a.openBlock)(!0),Object(a.createBlock)(a.Fragment,null,Object(a.renderList)(t.permissions,(function(t){return Object(a.openBlock)(),Object(a.createBlock)(a.Fragment,{key:t.v},[t?(Object(a.openBlock)(),Object(a.createBlock)("li",p,[Object(a.createVNode)(v,{label:t.v,modelValue:t.state,"onUpdate:modelValue":function(e){return t.state=e},ref:e.handleCheckboxRef,checked:e.permissions.includes(t.v)},{default:s((function(){return[Object(a.createTextVNode)(Object(a.toDisplayString)(e.handlePermissionTitle(t.v)),1)]})),_:2},1032,["label","modelValue","onUpdate:modelValue","checked"])])):Object(a.createCommentVNode)("",!0)],64)})),128))])):Object(a.createCommentVNode)("",!0)]})),_:1},8,["data","props","default-checked-keys"])]})),_:1})]})),_:1})]})),_:1}),Object(a.createVNode)("div",null,[Object(a.createVNode)(h,{onClick:e.handleSave},{default:s((function(){return[_]})),_:1},8,["onClick"])])]})),_:1})})),u=n("5530"),E=n("1da1"),h=(n("96cf"),n("d81d"),n("4de4"),n("6389")),L=n("79f6"),b=[{id:1,name:"首页",icon:"el-icon-s-home",path:"/home",parent_id:0,disabled:!0},{id:2,parent_id:0,name:"幽冥界",icon:"iconfont icon-kulou",path:"/hell",children:[{name:"阎罗殿",path:"/hell",id:10,parent_id:2},{name:"鬼门关",path:"/hell/danger-spot",id:11,parent_id:2,permissions:[]},{name:"黄泉路",path:"/hell",id:12,parent_id:2,permissions:[]},{name:"奈何桥",path:"/hell",id:13,parent_id:2,permissions:[]},{name:"孟婆亭",path:"/hell",id:14,parent_id:2,permissions:[]},{name:"三生石",path:"/hell",id:15,parent_id:2,permissions:[]},{name:"望乡台",path:"/hell/township",id:16,parent_id:2,permissions:[]},{name:"忘川河",path:"/hell",id:17,parent_id:2,permissions:[]},{name:"六道轮回",path:"/hell/reincarnation",id:18,parent_id:2,permissions:[]},{name:"九幽地府",path:"/hell",id:19,parent_id:2,permissions:[]},{name:"枉死城",path:"/hell",id:20,parent_id:2,permissions:[]},{name:"生死簿",path:"/hell/obituary",id:21,parent_id:2,permissions:[]},{name:"十八层地狱",path:"/hell",isGroup:!0,id:22,parent_id:2,permissions:[],children:[{name:"第一层",path:"/hell",id:30,parent_id:22,permissions:[{state:!1,v:"HELL_ONE_C"},{state:!1,v:"HELL_ONE_U"},{state:!1,v:"HELL_ONE_D"}]},{name:"第2层",path:"/hell",id:31,parent_id:22,permissions:[{state:!1,v:"HELL_TWO_C"},{state:!1,v:"HELL_TWO_U"},{state:!1,v:"HELL_TWO_D"}]},{name:"第3层",path:"/hell",id:32,parent_id:22,permissions:[{state:!1,v:"HELL_THREE_C"},{state:!1,v:"HELL_THREE_U"},{state:!1,v:"HELL_THREE_D"}]},{name:"第4层",path:"/hell",id:33,parent_id:22,permissions:[{state:!1,v:"HELL_FOUR_C"},{state:!1,v:"HELL_FOUR_U"},{state:!1,v:"HELL_FOUR_D"}]},{name:"第5层",path:"/hell",id:34,parent_id:22,permissions:[{state:!1,v:"HELL_FIVES_C"},{state:!1,v:"HELL_FIVES_U"},{state:!1,v:"HELL_FIVES_D"}]},{name:"第6层",path:"/hell",id:35,parent_id:22,permissions:[{state:!1,v:"HELL_SIXTY_C"},{state:!1,v:"HELL_SIXTY_U"},{state:!1,v:"HELL_SIXTY_D"}]},{name:"第7层",path:"/hell",id:36,parent_id:22,permissions:[{state:!1,v:"HELL_SEVEN_C"},{state:!1,v:"HELL_SEVEN_U"},{state:!1,v:"HELL_SEVEN_D"}]},{name:"第8层",path:"/hell",id:37,parent_id:22,permissions:[{state:!1,v:"HELL_EIGHT_C"},{state:!1,v:"HELL_EIGHT_U"},{state:!1,v:"HELL_EIGHT_D"}]},{name:"第9层",path:"/hell",id:38,parent_id:22,permissions:[{state:!1,v:"HELL_NINE_C"},{state:!1,v:"HELL_NINE_U"},{state:!1,v:"HELL_NINE_D"}]},{name:"第10层",path:"/hell",id:39,parent_id:22,permissions:[{state:!1,v:"HELL_TEN_C"},{state:!1,v:"HELL_TEN_U"},{state:!1,v:"HELL_TEN_D"}]},{name:"第11层",path:"/hell",id:40,parent_id:22,permissions:[{state:!1,v:"HELL_ELEVEN_C"},{state:!1,v:"HELL_ELEVEN_U"},{state:!1,v:"HELL_ELEVEN_D"}]},{name:"第12层",path:"/hell",id:41,parent_id:22,permissions:[{state:!1,v:"HELL_TWELVE_C"},{state:!1,v:"HELL_TWELVE_U"},{state:!1,v:"HELL_TWELVE_D"}]},{name:"第13层",path:"/hell",id:42,parent_id:22,permissions:[{state:!1,v:"HELL_THIRTEEN_C"},{state:!1,v:"HELL_THIRTEEN_U"},{state:!1,v:"HELL_THIRTEEN_D"}]},{name:"第14层",path:"/hell",id:43,parent_id:22,permissions:[{state:!1,v:"HELL_FOURTEEN_C"},{state:!1,v:"HELL_FOURTEEN_U"},{state:!1,v:"HELL_FOURTEEN_D"}]},{name:"第15层",path:"/hell",id:44,parent_id:22,permissions:[{state:!1,v:"HELL_FIFTEEN_C"},{state:!1,v:"HELL_FIFTEEN_U"},{state:!1,v:"HELL_FIFTEEN_D"}]},{name:"第16层",path:"/hell",id:45,parent_id:22,permissions:[{state:!1,v:"HELL_SIXTEEN_C"},{state:!1,v:"HELL_SIXTEEN_U"},{state:!1,v:"HELL_SIXTEEN_D"}]},{name:"第17层",path:"/hell",id:46,parent_id:22,permissions:[{state:!1,v:"HELL_SEVENTEEN_C"},{state:!1,v:"HELL_SEVENTEEN_U"},{state:!1,v:"HELL_SEVENTEEN_D"}]},{name:"第18层",path:"/hell",id:47,parent_id:22,permissions:[{state:!1,v:"HELL_EIGHTEEN_C"},{state:!1,v:"HELL_EIGHTEEN_U"},{state:!1,v:"HELL_EIGHTEEN_D"}]}]}]},{id:3,parent_id:0,name:"人界",icon:"iconfont icon-ren",path:"/world",permissions:[],children:[{name:"统计",path:"/world",id:23,parent_id:3,permissions:[]},{name:"东胜神州",path:"/world/territory/east",id:24,parent_id:3,permissions:[]},{name:"南澹部洲",path:"/world/territory/south",id:25,parent_id:3,permissions:[]},{name:"西牛贺洲",path:"/world/territory/west",id:26,parent_id:3,permissions:[]},{name:"北俱芦州",path:"/world/territory/north",id:27,parent_id:3,permissions:[]}]},{id:4,parent_id:0,name:"今日股价",icon:"iconfont icon-shishigujia",path:"/stock"},{id:5,parent_id:0,icon:"iconfont icon-dan",name:"兜率宫",path:"/product"},{id:6,parent_id:0,name:"人员数据表",icon:"iconfont icon-setting-copy",path:"/personnel",permissions:[]},{id:7,parent_id:0,name:"share",icon:"iconfont icon-shexiangji",path:"/share",children:[{id:49,name:"分享",path:"/share",parent_id:7,permissions:[]},{id:50,name:"通信",path:"/share/socket",parent_id:7,permissions:[]}]},{id:9,parent_id:0,name:"系统",icon:"iconfont icon-setting-copy",children:[{id:48,name:"角色编辑",path:"/system/edit-role",parent_id:9,permissions:[]}]},{id:8,parent_id:0,name:"设置",icon:"iconfont icon-setting-copy",path:"/setting",permissions:[],children:[{name:"权限设置",path:"/setting/authority",id:28,parent_id:8,permissions:[]},{name:"角色权限",path:"/setting/role",id:29,parent_id:8,permissions:[]}]}],f=n("6ddb"),v=n("0613"),O=n("5880"),N=Object(a.defineComponent)({name:"EditRole",setup:function(){var e=Object(h.useRoute)(),t=(Object(O.useStore)(v.b),Object(a.reactive)([])),n=Object(a.reactive)({defaultProps:{children:"children",label:"name"},defaultMenuTree:b,describe:"",key:"",name:"",checkedKeys:[],elCheckboxVal:{},permissions:[]}),s=Object(a.ref)(null);return Object(a.onMounted)(Object(E.a)(regeneratorRuntime.mark((function t(){var a,s;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if("undefined"===e.params.key)return n.checkedKeys=[1],t.abrupt("return");t.next=3;break;case 3:return t.prev=3,t.next=6,Object(L.e)({key:e.params.key});case 6:a=t.sent,s=(null==a?void 0:a.role.menus)||[],n.key=(null==a?void 0:a.role.key)||"",n.name=(null==a?void 0:a.role.name)||"",n.describe=(null==a?void 0:a.role.describe)||"",n.permissions=(null==a?void 0:a.role.permissions)||[],n.checkedKeys=Object(f.h)(s,"children").map((function(e){return e.id})),t.next=18;break;case 15:t.prev=15,t.t0=t.catch(3),console.log(t.t0);case 18:case"end":return t.stop()}}),t,null,[[3,15]])})))),Object(u.a)(Object(u.a)({menuTreeRef:s},Object(a.toRefs)(n)),{},{handleCheckboxRef:function(e){e&&!t.map((function(e){return e.label})).includes(e.label)&&t.push(e)},handlePermissionTitle:function(e){return/^HELL_[A-Z]*_C$/.test(e)?"创建权":/^HELL_[A-Z]*_U$/.test(e)?"修改权":/^HELL_[A-Z]*_D$/.test(e)?"删除权":e},handleSave:function(){var e;null!==(e=s.value)&&void 0!==e&&e.getCheckedNodes(),t.filter((function(e){return e.isChecked})).map((function(e){return e.label}))}})}}),j=(n("95fb"),n("6b0d"));j=n.n(j);t.default=j()(N,[["render",m],["__scopeId","data-v-73b6c0ca"]])},"95fb":function(e,t,n){"use strict";n("e73e")},d81d:function(e,t,n){"use strict";var a=n("23e7"),s=n("b727").map;a({target:"Array",proto:!0,forced:!n("1dde")("map")},{map:function(e){return s(this,e,1<arguments.length?arguments[1]:void 0)}})},e73e:function(e,t,n){}}]);