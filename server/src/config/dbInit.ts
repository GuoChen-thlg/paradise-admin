export const permissions = [
	{ flag_key: 'PERSONNEL_C', name: '增人员', describe: '' },
	{ flag_key: 'PERSONNEL_D', name: '删人员', describe: '' },
	{ flag_key: 'PERSONNEL_U', name: '改人员', describe: '' },
	{ flag_key: 'PERSONNEL_R', name: '查人员', describe: '' },

	{ flag_key: 'PEUDUCT_C', name: '增产品', describe: '' },
	{ flag_key: 'PEUDUCT_D', name: '删产品', describe: '' },
	{ flag_key: 'PEUDUCT_U', name: '改产品', describe: '' },

	{ flag_key: 'ROLE_C', name: '增角色', describe: '' },
	{ flag_key: 'ROLE_D', name: '删角色', describe: '' },
	{ flag_key: 'ROLE_U', name: '改角色', describe: '' },
	{ flag_key: 'ROLE_R', name: '查角色', describe: '' },

	// /**地府*/
	{ name: '地狱', describe: '', flag_key: 'HELL_R' },
	// 地狱十八层管理权限
	{ name: '地狱第一层', describe: '', flag_key: 'HELL_ONE_C' },
	{ name: '地狱第一层', describe: '', flag_key: 'HELL_ONE_R' },
	{ name: '地狱第一层', describe: '', flag_key: 'HELL_ONE_U' },
	{ name: '地狱第一层', describe: '', flag_key: 'HELL_ONE_D' },
	{ name: '地狱第二层', describe: '', flag_key: 'HELL_TWO_C' },
	{ name: '地狱第二层', describe: '', flag_key: 'HELL_TWO_R' },
	{ name: '地狱第二层', describe: '', flag_key: 'HELL_TWO_U' },
	{ name: '地狱第二层', describe: '', flag_key: 'HELL_TWO_D' },
	{ name: '地狱第三层', describe: '', flag_key: 'HELL_THREE_C' },
	{ name: '地狱第三层', describe: '', flag_key: 'HELL_THREE_R' },
	{ name: '地狱第三层', describe: '', flag_key: 'HELL_THREE_U' },
	{ name: '地狱第三层', describe: '', flag_key: 'HELL_THREE_D' },
	{ name: '地狱第四层', describe: '', flag_key: 'HELL_FOUR_C' },
	{ name: '地狱第四层', describe: '', flag_key: 'HELL_FOUR_R' },
	{ name: '地狱第四层', describe: '', flag_key: 'HELL_FOUR_U' },
	{ name: '地狱第四层', describe: '', flag_key: 'HELL_FOUR_D' },
	{ name: '地狱第五层', describe: '', flag_key: 'HELL_FIVES_C' },
	{ name: '地狱第五层', describe: '', flag_key: 'HELL_FIVES_R' },
	{ name: '地狱第五层', describe: '', flag_key: 'HELL_FIVES_U' },
	{ name: '地狱第五层', describe: '', flag_key: 'HELL_FIVES_D' },
	{ name: '地狱第六层', describe: '', flag_key: 'HELL_SIXTY_C' },
	{ name: '地狱第六层', describe: '', flag_key: 'HELL_SIXTY_R' },
	{ name: '地狱第六层', describe: '', flag_key: 'HELL_SIXTY_U' },
	{ name: '地狱第六层', describe: '', flag_key: 'HELL_SIXTY_D' },
	{ name: '地狱第七层', describe: '', flag_key: 'HELL_SEVEN_C' },
	{ name: '地狱第七层', describe: '', flag_key: 'HELL_SEVEN_R' },
	{ name: '地狱第七层', describe: '', flag_key: 'HELL_SEVEN_U' },
	{ name: '地狱第七层', describe: '', flag_key: 'HELL_SEVEN_D' },
	{ name: '地狱第八层', describe: '', flag_key: 'HELL_EIGHT_C' },
	{ name: '地狱第八层', describe: '', flag_key: 'HELL_EIGHT_R' },
	{ name: '地狱第八层', describe: '', flag_key: 'HELL_EIGHT_U' },
	{ name: '地狱第八层', describe: '', flag_key: 'HELL_EIGHT_D' },
	{ name: '地狱第九层', describe: '', flag_key: 'HELL_NINE_C' },
	{ name: '地狱第九层', describe: '', flag_key: 'HELL_NINE_R' },
	{ name: '地狱第九层', describe: '', flag_key: 'HELL_NINE_U' },
	{ name: '地狱第九层', describe: '', flag_key: 'HELL_NINE_D' },
	{ name: '地狱第十层', describe: '', flag_key: 'HELL_TEN_C' },
	{ name: '地狱第十层', describe: '', flag_key: 'HELL_TEN_R' },
	{ name: '地狱第十层', describe: '', flag_key: 'HELL_TEN_U' },
	{ name: '地狱第十层', describe: '', flag_key: 'HELL_TEN_D' },
	{ name: '地狱第十一层', describe: '', flag_key: 'HELL_ELEVEN_C' },
	{ name: '地狱第十一层', describe: '', flag_key: 'HELL_ELEVEN_R' },
	{ name: '地狱第十一层', describe: '', flag_key: 'HELL_ELEVEN_U' },
	{ name: '地狱第十一层', describe: '', flag_key: 'HELL_ELEVEN_D' },
	{ name: '地狱第十二层', describe: '', flag_key: 'HELL_TWELVE_C' },
	{ name: '地狱第十二层', describe: '', flag_key: 'HELL_TWELVE_R' },
	{ name: '地狱第十二层', describe: '', flag_key: 'HELL_TWELVE_U' },
	{ name: '地狱第十二层', describe: '', flag_key: 'HELL_TWELVE_D' },
	{ name: '地狱第十三层', describe: '', flag_key: 'HELL_THIRTEEN_C' },
	{ name: '地狱第十三层', describe: '', flag_key: 'HELL_THIRTEEN_R' },
	{ name: '地狱第十三层', describe: '', flag_key: 'HELL_THIRTEEN_U' },
	{ name: '地狱第十三层', describe: '', flag_key: 'HELL_THIRTEEN_D' },
	{ name: '地狱第十四层', describe: '', flag_key: 'HELL_FOURTEEN_C' },
	{ name: '地狱第十四层', describe: '', flag_key: 'HELL_FOURTEEN_R' },
	{ name: '地狱第十四层', describe: '', flag_key: 'HELL_FOURTEEN_U' },
	{ name: '地狱第十四层', describe: '', flag_key: 'HELL_FOURTEEN_D' },
	{ name: '地狱第十五层', describe: '', flag_key: 'HELL_FIFTEEN_C' },
	{ name: '地狱第十五层', describe: '', flag_key: 'HELL_FIFTEEN_R' },
	{ name: '地狱第十五层', describe: '', flag_key: 'HELL_FIFTEEN_U' },
	{ name: '地狱第十五层', describe: '', flag_key: 'HELL_FIFTEEN_D' },
	{ name: '地狱第十六层', describe: '', flag_key: 'HELL_SIXTEEN_C' },
	{ name: '地狱第十六层', describe: '', flag_key: 'HELL_SIXTEEN_R' },
	{ name: '地狱第十六层', describe: '', flag_key: 'HELL_SIXTEEN_U' },
	{ name: '地狱第十六层', describe: '', flag_key: 'HELL_SIXTEEN_D' },
	{ name: '地狱第十七层', describe: '', flag_key: 'HELL_SEVENTEEN_C' },
	{ name: '地狱第十七层', describe: '', flag_key: 'HELL_SEVENTEEN_R' },
	{ name: '地狱第十七层', describe: '', flag_key: 'HELL_SEVENTEEN_U' },
	{ name: '地狱第十七层', describe: '', flag_key: 'HELL_SEVENTEEN_D' },
	{ name: '地狱第十八层', describe: '', flag_key: 'HELL_EIGHTEEN_C' },
	{ name: '地狱第十八层', describe: '', flag_key: 'HELL_EIGHTEEN_R' },
	{ name: '地狱第十八层', describe: '', flag_key: 'HELL_EIGHTEEN_U' },
	{ name: '地狱第十八层', describe: '', flag_key: 'HELL_EIGHTEEN_D' },
	// { flag_key: '', name: 'q', describe: '' },
	// { flag_key: '', name: 'q', describe: '' },
]

export const menuTree = [
	{
		id: 1,
		name: '首页',
		icon: 'el-icon-s-home',
		path: '/home',
		parent_id: 0,
	},
	{
		id: 2,
		parent_id: 0,
		name: '幽冥界',
		icon: 'iconfont icon-kulou',
		path: '/hell',
		permissions: ['HELL_R'],
		child: [
			{
				name: '阎罗殿',
				path: '/hell',
				id: 10,
				parent_id: 2,
				permissions: ['HELL_R'],
			},
			{
				name: '鬼门关',
				path: '/hell/danger-spot',
				id: 11,
				parent_id: 2,
				permissions: [''],
			},
			{
				name: '黄泉路',
				path: '/hell',
				id: 12,
				parent_id: 2,
				permissions: [''],
			},
			{
				name: '奈何桥',
				path: '/hell',
				id: 13,
				parent_id: 2,
				permissions: [''],
			},
			{
				name: '孟婆亭',
				path: '/hell',
				id: 14,
				parent_id: 2,
				permissions: [''],
			},
			{
				name: '三生石',
				path: '/hell',
				id: 15,
				parent_id: 2,
				permissions: [''],
			},
			{
				name: '望乡台',
				path: '/hell/township',
				id: 16,
				parent_id: 2,
				permissions: [''],
			},
			{
				name: '忘川河',
				path: '/hell',
				id: 17,
				parent_id: 2,
				permissions: [''],
			},
			{
				name: '六道轮回',
				path: '/hell/reincarnation',
				id: 18,
				parent_id: 2,
				permissions: [''],
			},
			{
				name: '九幽地府',
				path: '/hell',
				id: 19,
				parent_id: 2,
				permissions: [''],
			},
			{
				name: '枉死城',
				path: '/hell',
				id: 20,
				parent_id: 2,
				permissions: [''],
			},
			{
				name: '生死簿',
				path: '/hell/obituary',
				id: 21,
				parent_id: 2,
				permissions: [''],
			},
			{
				name: '十八层地狱',
				path: '/hell',
				isGroup: true,
				id: 22,
				parent_id: 2,
				permissions: [''],
				child: [
					{
						name: '第一层',
						path: '/hell',
						id: 30,
						parent_id: 22,
						permissions: [
							'HELL_ONE_C',
							'HELL_ONE_R',
							'HELL_ONE_U',
							'HELL_ONE_D',
						],
					},
					{
						name: '第2层',
						path: '/hell',
						id: 31,
						parent_id: 22,
						permissions: [
							'HELL_TWO_C',
							'HELL_TWO_R',
							'HELL_TWO_U',
							'HELL_TWO_D',
						],
					},
					{
						name: '第3层',
						path: '/hell',
						id: 32,
						parent_id: 22,
						permissions: [
							'HELL_THREE_C',
							'HELL_THREE_R',
							'HELL_THREE_U',
							'HELL_THREE_D',
						],
					},
					{
						name: '第4层',
						path: '/hell',
						id: 33,
						parent_id: 22,
						permissions: [
							'HELL_FOUR_C',
							'HELL_FOUR_R',
							'HELL_FOUR_U',
							'HELL_FOUR_D',
						],
					},
					{
						name: '第5层',
						path: '/hell',
						id: 34,
						parent_id: 22,
						permissions: [
							'HELL_FIVES_C',
							'HELL_FIVES_R',
							'HELL_FIVES_U',
							'HELL_FIVES_D',
						],
					},
					{
						name: '第6层',
						path: '/hell',
						id: 35,
						parent_id: 22,
						permissions: [
							'HELL_SIXTY_C',
							'HELL_SIXTY_R',
							'HELL_SIXTY_U',
							'HELL_SIXTY_D',
						],
					},
					{
						name: '第7层',
						path: '/hell',
						id: 36,
						parent_id: 22,
						permissions: [
							'HELL_SEVEN_C',
							'HELL_SEVEN_R',
							'HELL_SEVEN_U',
							'HELL_SEVEN_D',
						],
					},
					{
						name: '第8层',
						path: '/hell',
						id: 37,
						parent_id: 22,
						permissions: [
							'HELL_EIGHT_C',
							'HELL_EIGHT_R',
							'HELL_EIGHT_U',
							'HELL_EIGHT_D',
						],
					},
					{
						name: '第9层',
						path: '/hell',
						id: 38,
						parent_id: 22,
						permissions: [
							'HELL_NINE_C',
							'HELL_NINE_R',
							'HELL_NINE_U',
							'HELL_NINE_D',
						],
					},
					{
						name: '第10层',
						path: '/hell',
						id: 39,
						parent_id: 22,
						permissions: [
							'HELL_TEN_C',
							'HELL_TEN_R',
							'HELL_TEN_U',
							'HELL_TEN_D',
						],
					},
					{
						name: '第11层',
						path: '/hell',
						id: 40,
						parent_id: 22,
						permissions: [
							'HELL_ELEVE_C',
							'HELL_ELEVE_R',
							'HELL_ELEVE_U',
							'HELL_ELEVE_D',
						],
					},
					{
						name: '第12层',
						path: '/hell',
						id: 41,
						parent_id: 22,
						permissions: [
							'HELL_TWELVE_C',
							'HELL_TWELVE_R',
							'HELL_TWELVE_U',
							'HELL_TWELVE_D',
						],
					},
					{
						name: '第13层',
						path: '/hell',
						id: 42,
						parent_id: 22,
						permissions: [
							'HELL_THIRTEEN_C',
							'HELL_THIRTEEN_R',
							'HELL_THIRTEEN_U',
							'HELL_THIRTEEN_D',
						],
					},
					{
						name: '第14层',
						path: '/hell',
						id: 43,
						parent_id: 22,
						permissions: [
							'HELL_FOURTEEN_C',
							'HELL_FOURTEEN_R',
							'HELL_FOURTEEN_U',
							'HELL_FOURTEEN_D',
						],
					},
					{
						name: '第15层',
						path: '/hell',
						id: 44,
						parent_id: 22,
						permissions: [
							'HELL_FIFTEEN_C',
							'HELL_FIFTEEN_R',
							'HELL_FIFTEEN_U',
							'HELL_FIFTEEN_D',
						],
					},
					{
						name: '第16层',
						path: '/hell',
						id: 45,
						parent_id: 22,
						permissions: [
							'HELL_SIXTEEN_C',
							'HELL_SIXTEEN_R',
							'HELL_SIXTEEN_U',
							'HELL_SIXTEEN_D',
						],
					},
					{
						name: '第17层',
						path: '/hell',
						id: 46,
						parent_id: 22,
						permissions: [
							'HELL_SEVENTEEN_C',
							'HELL_SEVENTEEN_R',
							'HELL_SEVENTEEN_U',
							'HELL_SEVENTEEN_D',
						],
					},
					{
						name: '第18层',
						path: '/hell',
						id: 47,
						parent_id: 22,
						permissions: [
							'HELL_EIGHTEEN_C',
							'HELL_EIGHTEEN_R',
							'HELL_EIGHTEEN_U',
							'HELL_EIGHTEEN_D',
						],
					},
				],
			},
		],
	},
	{
		id: 3,
		parent_id: 0,
		name: '人界',
		icon: 'iconfont icon-ren',
		path: '/world',
		permissions: [''],
		child: [
			{
				name: '统计',
				path: '/world',
				id: 23,
				parent_id: 3,
				permissions: [''],
			},
			{
				name: '东胜神州',
				path: '/world/territory/east',
				id: 24,
				parent_id: 3,
				permissions: [''],
			},
			{
				name: '南澹部洲',
				path: '/world/territory/south',
				id: 25,
				parent_id: 3,
				permissions: [''],
			},
			{
				name: '西牛贺洲',
				path: '/world/territory/west',
				id: 26,
				parent_id: 3,
				permissions: [''],
			},
			{
				name: '北俱芦州',
				path: '/world/territory/north',
				id: 27,
				parent_id: 3,
				permissions: [''],
			},
		],
	},
	{
		id: 4,
		parent_id: 0,
		name: '今日股价',
		icon: 'iconfont icon-shishigujia',
		path: '/stock',
	},
	{
		id: 5,
		parent_id: 0,
		icon: 'iconfont icon-dan',
		name: '兜率宫',
		path: '/product',
	},
	{
		id: 6,
		parent_id: 0,
		name: '人员数据表',
		icon: 'iconfont icon-setting-copy',
		path: '/personnel',
		permissions: [''],
	},
	{
		id: 7,
		parent_id: 0,
		name: 'share',
		icon: 'iconfont icon-shexiangji',
		path: '',
		child: [
			//
			{
				id: 49,
				name: '分享',
				path: '/share',
				parent_id: 7,
				permissions: [''],
			},
			{
				id: 50,
				name: '通信',
				path: '/share/socket',
				parent_id: 7,
				permissions: [''],
			},
		],
	},
	{
		id: 9,
		parent_id: 0,
		name: '系统',
		icon: 'iconfont icon-setting-copy',
		child: [
			{
				id: 48,
				name: '角色编辑',
				path: '/system/edit-role',
				parent_id: 9,
				permissions: [''],
			},
		],
	},
	{
		id: 8,
		parent_id: 0,
		name: '设置',
		icon: 'iconfont icon-setting-copy',
		path: '/setting',
		permissions: [''],
		child: [
			{
				name: '权限设置',
				path: '/setting/authority',
				id: 28,
				parent_id: 8,
				permissions: [''],
			},
			{
				name: '角色设置',
				path: '/setting/edit-role',
				id: 29,
				parent_id: 8,
				permissions: [''],
			},
		],
	},
]