# paradise-admin

paradise-admin 适用于管理人员及产品的前端解决方案，将人员管理，产品交易数据分析与一体。

基于 vue3 element-plus typescript 开发。

演示地址:[👉👉👉 戳这里](https://paradise-admin.thlg.ml/)

## 功能模块

-   [x] 👍vue 脚手架 👍（脚手架助你安装/卸载组件更方便）
-   [x] 工业化 UI 组件（上手即用，无需自己造轮子）
-   [ ] 自适应布局（完美适配大中小屏）
-   [x] 👉 多 TAB 导航
-   [ ] 登录/注销
-   [ ] 权限验证
-   [x] Tinymce 编辑器
-   [x] 虚拟列表战术数据
-   [x] 动态侧边栏（支持多级路由）
-   [ ] 面包屑导航
-   [x] echartjs 图表
-   [x] 404 错误页面
-   [x] mock 数据
-   [ ] 炫酷 hover 特效
-   [x] 录屏
-   [ ] 1v1 聊天
-   [x] 商品展示
-   [ ] 商品交易
-   [ ] 接入支付接口
-   [ ] 人员管理
-   [ ] 权限管理

## 准备

```sh
git clone https://github.com/GuoChen-thlg/paradise-admin.git

cd paradise-admin

npm imstall

npm run serve
```
## 部署到 github pages 

修改 [gh-page.sh](https://github.com/GuoChen-thlg/paradise-admin/blob/dev/gh-page.sh) 和 [CNAME](https://github.com/GuoChen-thlg/paradise-admin/blob/dev/CNAME) 文件

>   ```sh
>    # gh-page.sh
>    #......
>    git branch [gh-page]
>    git checkout [gh-page]
>    git remote add [paradise-admin] [github:GuoChen-thlg/paradise-admin.git]
>    git push -u [paradise-admin] [gh-page] -f
>   ```


```sh
npm run deploy
````

## 构建

```sh
npm run build
```

## 浏览器支持

最后两个版本的桌面浏览器 移动端不支持某些 API

## 许可证

此项目根据 MIT 许可证获得许可 ，有关详细信息 ，请参阅 [LICENSE](https://github.com/GuoChen-thlg/paradise-admin/blob/dev/LICENSE) 文件