import { Menu } from '@/custom'

// 假设查询数据
export default {
	rootadmin: {
		name: 'rootadmin',
		avatar: undefined,
		routeList: [
			{
				name: '首页',
				icon: 'el-icon-s-home',
				path: '/home',
				componentName: 'Home',
			},
			{
				name: '幽冥界',
				icon: 'el-icon-s-home',
				child: [
					{
						name: '阎罗殿',
						path: '/hell',
						componentName: 'Hell',
					},
					{
						name: '鬼门关',
						path: '/hell',
						componentName: 'Hell',
					},
					{
						name: '黄泉路',
						path: '/hell',
						componentName: 'Hell',
					},
					{
						name: '奈何桥',
						path: '/hell',
						componentName: 'Hell',
					},
					{
						name: '孟婆亭',
						path: '/hell',
						componentName: 'Hell',
					},
					{
						name: '三生石',
						path: '/hell',
						componentName: 'Hell',
					},
					{
						name: '望乡台',
						path: '/hell',
						componentName: 'Hell',
					},
					{
						name: '忘川河',
						path: '/hell',
						componentName: 'Hell',
					},
					{
						name: '九道轮回',
						path: '/hell',
						componentName: 'Hell',
					},
					{
						name: '九幽地府',
						path: '/hell',
						componentName: 'Hell',
					},
					{
						name: '枉死城',
						path: '/hell',
						componentName: 'Hell',
					},
					{
						name: '十八层地狱',
						path: '/hell',
						isGroup: true,
						child: [
							{
								name: '第一层',
								path: '/hell',
							},
							{
								name: '第2层',
								path: '/hell',
							},
							{
								name: '第3层',
								path: '/hell',
							},
							{
								name: '第4层',
								path: '/hell',
							},
							{
								name: '第5层',
								path: '/hell',
							},
							{
								name: '第6层',
								path: '/hell',
							},
							{
								name: '第7层',
								path: '/hell',
							},
							{
								name: '第8层',
								path: '/hell',
							},
							{
								name: '第9层',
								path: '/hell',
							},
							{
								name: '第10层',
								path: '/hell',
							},
							{
								name: '第11层',
								path: '/hell',
							},
							{
								name: '第12层',
								path: '/hell',
							},
							{
								name: '第13层',
								path: '/hell',
							},
							{
								name: '第14层',
								path: '/hell',
							},
							{
								name: '第15层',
								path: '/hell',
							},
							{
								name: '第16层',
								path: '/hell',
							},
							{
								name: '第17层',
								path: '/hell',
							},
							{
								name: '第18层',
								path: '/hell',
							},
						],
					},
				],
			},
			{
				name: '人界',
				path: '/world',
				child: [
					{
						name: '东胜神州',
						path: '/world',
					},
					{
						name: '南澹部洲',
						path: '/world',
					},
					{
						name: '西牛贺洲',
						path: '/world',
					},
					{
						name: '北俱芦州',
						path: '/world',
					},
				],
			},
			{
				name: '今日股价',
				path: '/home',
			},
			{
				name: '登录',
				icon: 'iconfont icon-setting-copy',
				path: '/login',
				componentName: 'Login',
			},
			{
				name: '人员数据表',
				icon: 'iconfont icon-setting-copy',
				path: '/personnel',
				componentName: 'Personnel',
			},
			{
				name: '设置',
				path: '/home',
			},
			{
				name: '404',
				icon: 'el-icon-location',
				path: '/404',
				personnel: 'NotFount',
			},
			{
				name: '测试1',
				icon: 'el-icon-location',
				path: '/home',
			},
			{
				name: '测试2',
				icon: 'el-icon-location',
				path: '/home',
				child: [
					{
						name: '测试2-1',
						icon: 'el-icon-location',
						path: '/home',
					},
				],
			},
			{
				name: '测试3',
				icon: 'el-icon-location',
				path: '/home',
				child: [
					{
						name: '测试3-1',
						icon: 'el-icon-location',
						path: '/home',
						child: [
							{
								name: '测试3-1-1',
								icon: 'el-icon-location',
								path: '/home',
							},
						],
					},
				],
			},
		],
		role: [],
	},
	admin: {},
	test1: {},
	test2: {},
	test3: {},
}
