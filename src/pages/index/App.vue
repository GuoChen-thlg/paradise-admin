<template>
	<el-container class="container">
		<el-aside
			v-show="showAside"
			:width="isMobile ? '0' : isCollapse ? '64px' : '200px'"
			class="hidder-scrollbar aside-sidebar hidden-xs-only"
		>
			<!-- 侧边栏导航 -->
			<sidebar-control />
		</el-aside>

		<el-drawer
			direction="ltr"
			size="200"
			v-model="drawer"
			custom-class="hiddem-sm-and-up"
		>
			<sidebar-control />
		</el-drawer>

		<el-container class="main-container">
			<el-header
				v-show="showHeader"
				class="head-navigation"
				height="var(--header-height)"
			>
				<div class="control-container">
					<div class="open-close hidden-xs-only" @click="on_off">
						<i
							:class="[
								isCollapse
									? 'el-icon-s-unfold'
									: 'el-icon-s-fold',
							]"
						/>
					</div>
					<div
						class="open-close hidden-sm-and-up"
						@click="drawer = true"
					>
						<i class="el-icon-s-unfold" />
					</div>

					<div class="slogan-box">
						<p class="slogan">
							此项目正在开发中，所有数据均为 mock 数据 !!!
						</p>
					</div>

					<head-user />
				</div>
			</el-header>
			<el-header
				v-show="scrollTop > 60 && showHeader"
				class="head-navigation fixed"
				height="var(--header-height)"
				:style="{ left: isCollapse ? '64px' : '200px' }"
			>
				<div class="control-container">
					<div class="open-close hidden-xs-only" @click="on_off">
						<i
							:class="{
								'el-icon-s-fold': !isCollapse,
								'el-icon-s-unfold': isCollapse,
							}"
						/>
					</div>
					<div
						class="open-close hidden-sm-and-up"
						@click="drawer = true"
					>
						<i class="el-icon-s-unfold" />
					</div>
					<div class="slogan-box">
						<p class="slogan">
							此项目正在开发中，所有数据均为 mock 数据
							切勿当真！！！
						</p>
					</div>
					<head-user />
				</div>
			</el-header>
			<!-- TAB 标签 -->
			<ceumbs v-show="showTabNav"></ceumbs>

			<!-- 路由 -->
			<router-view v-slot="{ Component }">
				<keep-alive max="10" :include="cacheList" exclude="Home">
					<component :is="Component" />
				</keep-alive>
			</router-view>

			<el-footer v-show="showFooter">
				@2021|THLG
				<el-backtop></el-backtop>
			</el-footer>
		</el-container>
	</el-container>
</template>

<script lang="ts">
	import {
		defineComponent,
		reactive,
		watch,
		toRefs,
		ref,
		onMounted,
		onBeforeMount,
	} from 'vue'
	import { useRoute } from 'vue-router'
	import { useStore } from 'vuex'
	import Nprogress from 'nprogress'
	import { key } from '@/store'
	import SidebarControl from '@/components/SidebarControl.vue'
	import Ceumbs from '@/components/Crumbs.vue'
	import HeadUser from '@/components/HeadUser.vue'
	import { sidebar_actions, sidebar_mutations } from '@/store/modules/sidebar'
	import { useHookEvent, useResize } from '@/hooks'
	type WinEventMap =
		| keyof WindowEventMap
		| keyof GlobalEventHandlersEventMap
		| keyof WindowEventHandlersEventMap

	const events: Array<WinEventMap> = [
		'resize',
		'scroll',
		'gamepadconnected',
		'gamepaddisconnected',
	]
	export default defineComponent({
		name: 'App',
		components: {
			SidebarControl,
			Ceumbs,
			HeadUser,
		},
		setup() {
			const route = useRoute()
			const store = useStore(key)
			const hookEvent = useHookEvent()
			const isShow = reactive({
				showAside: false,
				showHeader: false,
				showFooter: false,
				showTabNav: false,
			})
			/**侧边栏在移动端时 收缩展开*/
			const drawer = ref(false)

			const { isCollapse } = toRefs(store.state.sidebar)
			const { scrollTop } = toRefs(store.state.device)
			const { cacheList } = toRefs(store.state.crumbs)

			Nprogress.inc()
			/* 设置主题 */
			const themeJson = JSON.parse(
				localStorage.getItem('themejson') || '{}'
			)
			// themeJson?._name || '默认主题'
			for (const key in themeJson) {
				if (
					Object.prototype.hasOwnProperty.call(themeJson, key) &&
					/^--/.test(key)
				) {
					document.documentElement.style.setProperty(
						key,
						themeJson[key]
					)
				}
			}

			/* 若页面刷新 则请求菜单数据 */
			if (store.state.user.login_statu) {
				store.dispatch(sidebar_actions.ASYNCREFRESHMENU)
			}
			/* 登录后 请求菜单数据 */
			watch(
				() => store.state.user.login_statu,
				newVal => {
					if (newVal) {
						store.dispatch(sidebar_actions.ASYNCREFRESHMENU)
					}
				}
			)

			/* 当页面发生改变时 */
			watch(
				() => route.path,
				() => {
					isShow.showAside =
						route.meta.showAside === undefined
							? true
							: (route.meta.showAside as boolean)
					isShow.showHeader =
						route.meta.showHeader === undefined
							? true
							: (route.meta.showHeader as boolean)
					isShow.showFooter =
						route.meta.showFooter === undefined
							? true
							: (route.meta.showFooter as boolean)
					isShow.showTabNav =
						route.meta.showTabNav === undefined
							? true
							: (route.meta.showTabNav as boolean)
				}
			)
			/* 请求通知权限 */
			Notification.requestPermission()

			hookEvent.on('scroll', () => {
				store.commit('device/update')
			})
			useResize(() => {
				store.commit('device/update')
			})

			onBeforeMount(() => {
				Nprogress.set(0.9)
				document.querySelector(".loader[role='loader']")?.remove()
				document.querySelector("[role='loader-style']")?.remove()
			})
			onMounted(() => {
				Nprogress.done()
			})

			events.forEach(type => {
				window.addEventListener(type, e => {
					hookEvent.emit(type, e)
				})
			})

			return {
				...toRefs(isShow),
				isCollapse,
				scrollTop,
				isMobile: false,
				cacheList,
				on_off: () => store.commit(sidebar_mutations.SWITCH),
				drawer,
			}
		},
	})
</script>

<style lang="scss" src="./style.scss"></style>
<style lang="scss" scoped src="./style.scoped.scss"></style>
