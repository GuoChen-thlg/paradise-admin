# paradise-admin

paradise-admin 是一个用于人员管理、 产品管理、 数据分析为一体的综合项目。<br>
产品背景：随着时代的不断发展，信息网络技术成为促进时代发展的重要因素，在整个时代发展的过程中，计算机应用发挥了不可替代的作用，而且随着经济的不断发展，计算机应用逐渐渗透到社会的各个领域，并发挥了巨大的作用。我们需要用数据展望三界，以调节宏观经济，促进经济发展，控制生灵的投胎转世，以建立和平稳定的发展事态。

## 技术栈

### 前端

-   vue3
-   element-plus
-   typescript

### 后端

-   Koa
-   typescript

演示地址:[👉👉👉 戳这里](https://paradise-admin.thlg.ml/)

## TODO （已实现）

-   [x] 👉 多 TAB 导航
-   [x] Tinymce 编辑器
-   [x] 虚拟列表 数据
-   [x] 动态侧边栏（支持多级路由）
-   [x] 面包屑导航
-   [x] echartjs 图表
-   [x] 商品展示
-   [x] 录屏
-   [x] 404 错误页面
-   [x] mock 数据

## 模块

```
-
 |- 数据分析
 |- 冥界
     |-
     |- 十八层地狱
            |- 第一层
            |- ...
            |-第十八层
 |- 人界
     |-数据总览
     |- 各个大陆
     |- ...
 |- 兜率宫
      |- 产品列表
      |- 产品编辑
 |- 三界人员列表
         |- 添加新人员
         |- 人员信息编辑
 |- 设置
     |- 角色设置
     |- 权限设置
     |- 发现新大陆
 |- 我的
     |- 个人中心
     |- 背包
 |- 三界股市
 |- （其他）...
```

## 准备

```sh
git clone https://github.com/GuoChen-thlg/paradise-admin.git

cd paradise-admin

npm imstall

npm run serve
```

## 部署到 github pages

修改 [gh-page.sh](https://github.com/GuoChen-thlg/paradise-admin/blob/dev/gh-page.sh) 和 [CNAME](https://github.com/GuoChen-thlg/paradise-admin/blob/dev/CNAME) 文件

> ```sh
>  # gh-page.sh
>  #......
>  git branch [gh-page]
>  git checkout [gh-page]
>  git remote add [paradise-admin] [github:GuoChen-thlg/paradise-admin.git]
>  git push -u [paradise-admin] [gh-page] -f
> ```

```sh
npm run deploy
```

## docker

开发

-   默认咦安装 docker

```sh
npm run compose-up-dev
```

访问 [http://localhost:8001](http://localhost:8001)

## 浏览器支持

最后两个版本的桌面浏览器 移动端不支持某些 API

## 许可证

此项目根据 MIT 许可证获得许可 ，有关详细信息 ，请参阅 [LICENSE](https://github.com/GuoChen-thlg/paradise-admin/blob/dev/LICENSE) 文件
