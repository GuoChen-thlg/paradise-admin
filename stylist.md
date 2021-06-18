


生死薄
object {
	名字
	性别
	年龄
	出生地
	过往
	成就
	简介
	种族
	寿命
	善
	恶
	身份 
	官职
	福禄
	身损	
	标签
}

丹药 {
	id-
	名字-
	功效-
	type-
	品级-
	创建时间-
	修改时间-
	发布时间-
	制丹人-
	活跃度-
	标签-
	二维码-
	image {
			id
			product_id
			src 
			alt
			w
			h
			创建时间
			修改时间
			变体id
			index
		}
	media
	handle
	创建时间
	修改时间
	变体 {
		id
		image 
		media
		创建时间
		修改时间
		条形码
		二维码
		最高价
		最低价
		现价
	}
}


权限控制


roles:[
	{
		type:''
		authority:{
			home:{
				add:true
				del:false
			}
		}
	},
]



角色1			
|				
|- 权限1		
|- 权限2		
|- 权限3		
|- 权限4		


角色2
|
|- 权限1
|- 权限8
|- 权限3
|- 权限6

用户1
|-角色1
|-角色2
|-角色3

用户1
|-角色6
|-角色5
|-角色10


