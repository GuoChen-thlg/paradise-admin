<template>
  <el-main class="socket">
    <h1>Socket</h1>

    <el-row :gutter="20">
      <el-col :span="5">
        <!-- 在线用户列表 -->
        <ul>
          <li
            v-for="user in online_list"
            :key="user.account"
            :class="{ communication: user.account !== account }"
          >
            <div>
              <!-- TODO 用户头像 昵称 等信息 -->
              {{ user.account }}
              <el-button
                size="mini"
                v-if="user.account !== account"
                @click="handleCall(user.account)"
              >
                呼叫
              </el-button>
            </div>
          </li>
        </ul>
      </el-col>
      <el-col :span="18"> </el-col>
    </el-row>
    <el-dialog
      v-model="video_show"
      :close-on-click-modal="false"
      :modal="false"
      custom-class="video-container-dialog"
    >
      <!-- :show-close="false" -->
      <template #title>
        <div v-el-dialog-drag class="title">
          xxx 邀请你视频通话
        </div>
      </template>
      <div
        v-el-dialog-drag-width
        class="video-container"
        @click="self_minor = !self_minor"
      >
        <video
          :class="[
            'remote_video',
            { 'main-video': self_minor, 'minor-video': !self_minor }
          ]"
          autoplay="autoplay"
          ref="remote_video"
        ></video>
        <video
          :class="[
            'self_video',
            { 'main-video': !self_minor, 'minor-video': self_minor }
          ]"
          autoplay="autoplay"
          ref="self_video"
          muted="muted"
        ></video>
      </div>
      <div :class="['but-operate', { calling: call_state }]">
        <el-button circle class="answer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              d="m19.70322,16.23838l0,3.20278a0.86709,0.90576 0 0 1 -0.8064,0.90395c-0.37892,0.02717 -0.68847,0.04167 -0.92779,0.04167c-7.66249,0 -13.87347,-6.48798 -13.87347,-14.49221c0,-0.24999 0.01301,-0.57335 0.03989,-0.96917a0.86709,0.90576 0 0 1 0.86536,-0.84236l3.06604,0a0.43355,0.45288 0 0 1 0.43181,0.40759c0.01994,0.20833 0.03815,0.37408 0.05549,0.49998a12.05345,12.59101 0 0 0 1.04745,3.62396c0.08237,0.18115 0.02861,0.39763 -0.12746,0.51357l-1.87118,1.39669a11.31295,11.81749 0 0 0 5.93438,6.19904l1.33532,-1.95101a0.4006,0.41846 0 0 1 0.49684,-0.13496a12.05345,12.59101 0 0 0 3.46837,1.09144c0.12053,0.01812 0.2792,0.03804 0.4769,0.05797a0.43355,0.45288 0 0 1 0.38932,0.45107l-0.00087,0z"
              fill="rgba(0,255,0,1)"
            /></svg
        ></el-button>
        <el-button circle class="refuse" @click="handleCloseVideoCall">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path
              fill="none"
              transform="rotate(-90 11.932886123657228,12.201342582702637)"
              d="M0 0h24v24H0z"
            />
            <path
              transform="rotate(133 11.966941833496094,14.046981811523436)"
              d="m19.77034,18.05046l0,3.20278a0.86709,0.90576 0 0 1 -0.8064,0.90395c-0.37892,0.02717 -0.68847,0.04167 -0.92779,0.04167c-7.66249,0 -13.87347,-6.48798 -13.87347,-14.49221c0,-0.24999 0.01301,-0.57335 0.03989,-0.96917a0.86709,0.90576 0 0 1 0.86536,-0.84236l3.06604,0a0.43355,0.45288 0 0 1 0.43181,0.40759c0.01994,0.20833 0.03815,0.37408 0.05549,0.49998a12.05345,12.59101 0 0 0 1.04745,3.62396c0.08237,0.18115 0.02861,0.39763 -0.12746,0.51357l-1.87118,1.39669a11.31295,11.81749 0 0 0 5.93438,6.19904l1.33532,-1.95101a0.4006,0.41846 0 0 1 0.49684,-0.13496a12.05345,12.59101 0 0 0 3.46837,1.09144c0.12053,0.01812 0.2792,0.03804 0.4769,0.05797a0.43355,0.45288 0 0 1 0.38932,0.45107l-0.00087,0z"
              fill="rgba(255,0,0,1)"
            />
          </svg>
        </el-button>
      </div>
    </el-dialog>

    <el-button @click="handleRingTone">RingTone</el-button>

    <!-- <audio
      autoplay="autoplay"
      loop="loop"
      preload="auto"
      src="/static/music/call.mp3"
    ></audio> -->
  </el-main>
</template>
<script lang="ts">
import {
  defineComponent,
  onUnmounted,
  reactive,
  ref,
  toRefs,
  nextTick
} from 'vue'
import { io } from 'socket.io-client'
import Cookie from 'js-cookie'
import Message from 'element-plus/lib/el-message'
import { Error } from 'sequelize/types'
export default defineComponent({
  name: 'Socket',
  setup() {
    const enum PhoneStatu {
      /** 空闲的 */
      Idle,
      /** 打电话 */
      Call,
      /** 正在打电话 */
      ActiveCall,
      /** 被呼叫 */
      PassiveAnswer
    }

    const chat = reactive<{
      statu: PhoneStatu
      video_show: boolean
      account: string | null
      remote: string | null
      online_list: { account: string }[]
      local_media_stream: MediaStream | null
      // eslint-disable-next-line no-undef
      offer: RTCSessionDescriptionInit | null
      self_minor: boolean
      call_state: boolean
    }>({
      statu: PhoneStatu.Idle,
      video_show: false,
      // 当前用户
      account: null,
      // 被呼叫方
      remote: null,
      // 当前在线用户列表
      online_list: [],
      // 本地用户媒体流
      local_media_stream: null,
      offer: null,
      self_minor: true,
      call_state: false
    })
    // 被呼叫方视频
    const remote_video = ref<HTMLVideoElement | null>(null)
    // 自己的视频
    const self_video = ref<HTMLVideoElement | null>(null)
    // RTCPeerConnection
    let peerConnection: RTCPeerConnection | null = null
    const socket = io(process.env.VUE_APP_SOCKETURL as string, {
      auth: {
        Authorization:
          Cookie.get('authorization') || localStorage.getItem('authorization')
      }
    })
    // 建立 socket 连接
    // 加入到房间中

    socket.on('connect', () => {
      log('正在加入房间 连接成功')
    })
    // 通过信令服务器将信息发送给远端
    function emitToServer(msg: {
      // 接收方账户
      account: string
      // 信息主体
      data: {
        // 信息的类型
        type: string
        // 发起方 账户
        sponsor: string
        // 接收方 账户
        recipient: string
        // 其他信息
        [k: string]: unknown
      }
    }) {
      socket.emit('webrtc-message', msg)
    }
    // 接受远端信息
    socket.on('webrtc-message', async msg => {
      switch (msg.type) {
        case 'offer':
          // 对方发出邀请
          // 远端名称  发起者名称
          chat.remote = msg.sponsor
          chat.video_show = true

          try {
            await new Promise((resolve, reject) => {
              const time = setTimeout(() => {
                reject()
                chat.video_show = false
              }, 30e3)
              nextTick(() => {
                const button_answer = document.querySelector(
                  'button.el-button.answer'
                ) as HTMLButtonElement
                const handleAnswer = () => {
                  chat.call_state = true
                  resolve()
                  clearTimeout(time)
                  handleVideoOfferMag(msg.offer)
                  button_answer.removeEventListener('click', handleAnswer)
                }
                button_answer.addEventListener('click', handleAnswer)
              })
            })
          } catch (err) {
            log_err(err)
          }
          break
        case 'answer':
          // 对方同意邀请
          // console.log('来自远端信息 answer', msg.answer)
          handleVideoAnswerMsg(msg.answer)
          break
        case 'new-ice-candidate':
          // console.log('来自远端信息 new-ice-candidate', msg.candidate)
          handleNewICECandidateMsg(msg.candidate)
          break
        case 'hand-up':
          // 对方挂断 结束通话
          handleHangUpMsg()
          break
        case 'refuse':
          // 对方拒绝通话
          log('对方拒绝了您的电话')
          handleHangUpMsg()
          break
        case 'busy':
          // 对方忙碌
          log('对方忙碌中...')
          break

        default:
          log('未知的消息')
          log(msg)
          break
      }
    })
    // 确定自己已上线
    // 已加入聊天室中
    socket.on('online', msg => {
      chat.account = msg.account
      Message.success(`${msg.account} 加入 `)
    })
    // 获取在线人员列表
    socket.on('online_list', msg => {
      chat.online_list = msg
      log(msg)
    })
    // 在连接时发生错误
    socket.on('connect_error', err => {
      if (/Authorization/.test(err.message)) Message.error(err.message)
      log(err)
    })

    function log(...mag: unknown[]) {
      console.info(`[${new Date().toLocaleTimeString()}]`, ...mag)
    }
    function log_err(...mag: unknown[]) {
      console.trace(`[${new Date().toLocaleTimeString()}]`, ...mag)
    }
    function handleUserMediaError(err: Error) {
      switch (err.name) {
        case 'AbortError':
          log('出现异常，设备无法被使用')
          Message.error('出现异常，设备无法被使用')
          break
        case 'NotAllowedError':
          log('权限不足')
          Message.error('权限不足')
          break
        case 'NotFoundError':
          log('找不到满足请求参数的媒体类型')
          Message.error('找不到满足请求参数的媒体类型')
          break
        case 'NotReadableError':
          log('设备无法被访问')
          Message.error('设备无法被访问')
          break
        case 'OverConstrainedError':
          log('设备无法满足需求')
          Message.error('设备无法满足需求')
          break
        case 'SecurityError':
          log('媒体设备被禁止使用')
          Message.error('媒体设备被禁止使用')
          break
        case 'TypeError':
          log('constraints 未设置')
          Message.error('constraints 未设置')
          break
        default:
          log_err(err)
          break
      }
      log_err(err)
    }

    async function handleDialogOpen() {
      chat.video_show = !chat.video_show
    }
    /** 创建 PeerConnection 并绑定事件
     * @param {boolean} flag 提议者 true 应答者 false
     */
    function handleCreatePeerConnection(flag: boolean) {
      log('初始化 RTC 实例 正在创建连接...')
      // 创建本地 PeerConnection 实例
      // 设置事件处理程序
      peerConnection = new RTCPeerConnection({
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' }
        ]
      })
      if (flag) {
        // 提议者
        // 当发生需要会话协商的更改时会触发此事件。
        // 这种协商应该作为提议者进行，因为有些会话变化不能作为应答者进行协商
        peerConnection.onnegotiationneeded = handleNegotiationNeededEvent
      } else {
        // 应答者
      }
      peerConnection.onicecandidate = handleIceCandidateEvent
      peerConnection.oniceconnectionstatechange = handleIceconnectionstatechangeEvnet
      peerConnection.onicegatheringstatechange = handleIceGatheringStateChangeEvent
      peerConnection.onsignalingstatechange = handleSignalingStateChangeEvent
      peerConnection.ontrack = handleTrackEvent
    }
    // 开始协商的过程
    async function handleNegotiationNeededEvent() {
      try {
        log('创建 offer')
        const offer = await (peerConnection as RTCPeerConnection).createOffer()
        if ((peerConnection as RTCPeerConnection).signalingState != 'stable') {
          return
        }
        // 设置为本地描述 我们需要创建一个 SDP 提议并将其发送给我们想要连接的对等方
        // 包括有关我们在本地添加到连接的媒体流的信息（即我们要发送到通话另一端的视频），以及收集的任何 ICE 候选已经通过 ICE 层
        await (peerConnection as RTCPeerConnection).setLocalDescription(offer)
        log('向远端发送 offer')
        // 通过信令服务器发送给远端
        emitToServer({
          account: chat.remote as string,
          data: {
            type: 'offer',
            sponsor: chat.account as string,
            recipient: chat.remote as string,
            offer: (peerConnection as RTCPeerConnection).localDescription
          }
        })
      } catch (err) {
        log_err(err)
      }
    }
    // candidate 交换阶段
    // 只要本地代理 ICE 需要通过信令服务器传递信息给其他对等端时就会触发。
    // 这让本地代理与其他对等体相协商而浏览器本身在使用时无需知道任何详细的有关信令技术的细节，
    // 只需要简单地应用这种方法就可使用您选择的任何消息传递技术将 ICE 候选发送到远程对等方。

    // 如果事件的 candidate 属性是 null，ICE 收集已经完成。
    // 不应将此消息发送到远程对等方。
    // 发生这种情况时，连接 iceGatheringState 也已更改为 complete。
    async function handleIceCandidateEvent(event: RTCPeerConnectionIceEvent) {
      if (event.candidate) {
        log('候选人' + event.candidate.candidate)
        emitToServer({
          account: chat.remote as string,
          data: {
            type: 'new-ice-candidate',
            sponsor: chat.account as string,
            recipient: chat.remote as string,
            candidate: event.candidate
          }
        })
      } else {
        log('*** 收集完成')
      }
    }
    // ICE 代理的状态是否有故障或意外关闭
    // 当状态发生改变  closed failed
    // disconnected
    function handleIceconnectionstatechangeEvnet() {
      // log('ICE 代理的状态变更' + peerConnection?.iceConnectionState)
      switch (
        (peerConnection as RTCPeerConnection).iceConnectionState as string
      ) {
        case 'closed':
        case 'failed':
          handleCloseVideoCall()
          break
      }
    }
    function handleIceGatheringStateChangeEvent() {
      log(
        '检测 ICE 代理的状态',
        (peerConnection as RTCPeerConnection).iceGatheringState
      )
    }
    // stable
    // 目前没有正在进行的报价和答案交换。这可能意味着该 RTCPeerConnection 对象是新的，在这种情况下 localDescription 和 remoteDescription 都是 null; 这也可能意味着协商已完成并已建立连接。
    // have-local-offer
    // 本地 peer 已经调用 RTCPeerConnection.setLocalDescription()，传入代表 offer 的 SDP（通常是通过调用创建的 RTCPeerConnection.createOffer()），offer 已经申请成功。
    // have-remote-offer
    // 远程对等方创建了一个提议并使用信令服务器将其传递给本地对等方，本地对等方通过调用 将提议设置为远程描述 RTCPeerConnection.setRemoteDescription()。
    // have-local-pranswer
    // 已应用远程对等方发送的提议并已创建答案（通常通过调用 RTCPeerConnection.createAnswer()）并通过调用应用 RTCPeerConnection.setLocalDescription()。这个临时答案描述了支持的媒体格式等，但可能没有包含完整的 ICE 候选集。其他候选人将在稍后单独交付。
    // have-remote-pranswer
    // 已收到临时答复并成功应用，以响应先前通过调用 发送和建立的报价 setLocalDescription()setLocalDescription()。
    function handleSignalingStateChangeEvent() {
      // log('信令状态变更' + (peerConnection as RTCPeerConnection).signalingState)
      switch ((peerConnection as RTCPeerConnection).signalingState as string) {
        case 'closed':
          log('信令状态变更 ----closed')
          handleCloseVideoCall()
          break
      }
    }

    async function handleTrackEvent(event: RTCTrackEvent) {
      console.log('远端视频流', event.streams[0])
      if (remote_video.value) {
        remote_video.value.srcObject = event.streams[0]
      }
    }

    // 创建连接实例
    // 接收远端 sdp
    // 设置为远端描述
    // 获取本地媒体流
    // 创建 answer sdp 并设置本地描述
    // eslint-disable-next-line no-undef
    async function handleVideoOfferMag(offer: RTCSessionDescriptionInit) {
      log('收到远端的邀请 没有实例 创建实例')
      if (!peerConnection) {
        handleCreatePeerConnection(false)
      }
      log('收到 offer', '设置远端描述')
      const desc = new RTCSessionDescription(offer)
      // 连接状态   回滚
      try {
        if ((peerConnection as RTCPeerConnection).signalingState != 'stable') {
          await Promise.all([
            (peerConnection as RTCPeerConnection).setLocalDescription({
              type: 'rollback'
            }),
            (peerConnection as RTCPeerConnection).setRemoteDescription(desc)
          ])
          return
        } else {
          // 设置远程描述
          await (peerConnection as RTCPeerConnection).setRemoteDescription(desc)
        }
      } catch (err) {
        log_err(err)
      }
      if (!chat.local_media_stream) {
        try {
          // getDisplayMedia getUserMedia
          chat.local_media_stream = await (navigator.mediaDevices as any).getDisplayMedia(
            {
              video: true,
              audio: true
            }
          )
        } catch (err) {
          handleUserMediaError(err)
        }
      }
      if (self_video.value) {
        self_video.value.srcObject = chat.local_media_stream
      }
      try {
        log('将视频流添加到 peerConnection')
        ;(chat.local_media_stream as null | MediaStream)
          ?.getTracks()
          .forEach(track => {
            // eslint-disable-next-line @typescript-eslint/no-extra-semi
            ;(peerConnection as RTCPeerConnection).addTrack(
              track,
              chat.local_media_stream as MediaStream
            )
          })
      } catch (err) {
        log_err(err)
      }
      try {
        log('创建 answer', '设置本地描述')
        const answer = await (peerConnection as RTCPeerConnection).createAnswer()
        await (peerConnection as RTCPeerConnection).setLocalDescription(answer)
        // 将本地 answer 发送给远端
        emitToServer({
          account: chat.remote as string,
          data: {
            type: 'answer',
            sponsor: chat.account as string,
            recipient: chat.remote as string,
            answer: (peerConnection as RTCPeerConnection).localDescription
          }
        })
      } catch (err) {
        log_err(err)
      }
    }

    // 设置为远端描述
    // eslint-disable-next-line no-undef
    async function handleVideoAnswerMsg(answer: RTCSessionDescriptionInit) {
      log('接收远端 answer')
      // const desc = new RTCSessionDescription(answer)
      try {
        await (peerConnection as RTCPeerConnection).setRemoteDescription(answer)
      } catch (err) {
        log_err(err)
      }
    }

    // 添加候选人信息
    // 实例化 RTCIceCandidate
    // 通过 addIceCandidate 添加到 RTC 实例中
    async function handleNewICECandidateMsg(candidate: RTCIceCandidate) {
      if (!peerConnection) return
      const _candidate = new RTCIceCandidate(candidate)
      log('添加收到的候选人')
      try {
        await (peerConnection as RTCPeerConnection).addIceCandidate(_candidate)
      } catch (err) {
        log_err(err)
      }
    }
    // 关闭视频通话
    function handleCloseVideoCall() {
      log('正在关闭电话')
      chat.remote = null
      chat.call_state = false
      chat.self_minor = true
      chat.video_show = false
      if (peerConnection) {
        peerConnection.onicecandidate = null
        peerConnection.oniceconnectionstatechange = null
        peerConnection.onicegatheringstatechange = null
        peerConnection.onsignalingstatechange = null
        peerConnection.onnegotiationneeded = null
        peerConnection.ontrack = null
        // 停止所有 transceiver
        peerConnection.getTransceivers().forEach(transceiver => {
          transceiver.stop()
        })
        // 将 Video secObject 暂停
        if (self_video.value?.srcObject) {
          self_video.value.pause()
          ;(self_video.value.srcObject as null | MediaStream)
            ?.getTracks()
            .forEach(track => {
              track.stop()
            })
        }
        if (remote_video.value?.srcObject) {
          remote_video.value.pause()
          ;(remote_video.value.srcObject as null | MediaStream)
            ?.getTracks()
            .forEach(track => {
              track.stop()
            })
        }
        peerConnection.close()
        peerConnection = null
        chat.local_media_stream = null
      }
    }
    function handleRingTone() {
      // 创建音频上下文
      const acxt = new AudioContext()
      // 创建音调控制对象
      const oscillator = acxt.createOscillator()
      // 创建音量控制对象
      const gain = acxt.createGain()
      // 音调音量关联
      oscillator.connect(gain)
      // 音量与设备关联
      gain.connect(acxt.destination)
      oscillator.type = 'sine'
      oscillator.frequency.value = 1650.0

      gain.gain.setValueAtTime(0, acxt.currentTime)

      gain.gain.linearRampToValueAtTime(1, acxt.currentTime + 0.01)

      oscillator.start(acxt.currentTime)

      gain.gain.exponentialRampToValueAtTime(0.001, acxt.currentTime + 1)

      oscillator.stop(acxt.currentTime + 1)
    }

    // 呼叫远程对象
    async function handleCall(target: string) {
      if (peerConnection) {
        alert('已经在打电话了')
        return
      }
      chat.remote = target
      if (chat.remote === chat.account) {
        alert('不能和自己打电话')
        return
      }
      // 创建连接
      handleCreatePeerConnection(true)
      // 打开通话弹窗
      chat.call_state = true
      chat.video_show = true
      // await new Promise(resolve => {
      //   nextTick(resolve)
      // })

      // 获取本地媒体流
      try {
        log('获取本地视频流')
        // getDisplayMedia  getUserMedia
        chat.local_media_stream = await (navigator.mediaDevices as any).getDisplayMedia(
          {
            video: true,
            audio: true
          }
        )
        if (self_video.value) {
          self_video.value.srcObject = chat.local_media_stream
          // await self_video.value.play()
        }
      } catch (err) {
        handleUserMediaError(err.name)
      }
      try {
        console.log('将视频流添加到 peerConnection')
        ;(chat.local_media_stream as null | MediaStream)
          ?.getTracks()
          .forEach(track => {
            // eslint-disable-next-line @typescript-eslint/no-extra-semi
            ;(peerConnection as RTCPeerConnection).addTrack(
              track,
              chat.local_media_stream as MediaStream
            )
          })
      } catch (err) {
        //
        log_err(err)
      }
    }

    function handleHangUpMsg() {
      log('对方结束通话')
      handleCloseVideoCall()
    }
    onUnmounted(() => {
      handleCloseVideoCall()
      socket.emit('offline')
      socket.close()
    })
    return {
      ...toRefs(chat),
      self_video,
      remote_video,
      handleCall,
      handleCloseVideoCall,
      handleDialogOpen,
      handleRingTone
    }
  }
})
</script>
<style lang="scss" scoped>
.communication {
  cursor: pointer;
}
.video-container {
  position: relative;
  cursor: pointer;
  .remote_video {
    background-color: rgb(0, 0, 0);
  }
  .self_video {
    background-color: rgb(230, 230, 240);
  }
  .main-video {
    max-height: 100%;
    max-width: 100%;
    width: 100%;
  }
  .minor-video {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 1;
    width: 30%;
  }
}
.but-operate {
  display: flex;
  justify-content: space-around;
  &.calling {
    .answer {
      display: none;
    }
  }
}
.socket :deep(.video-container-dialog) {
  min-width: 340px;
  height: auto !important;
  pointer-events: all;
}
.socket :deep(.video-container-dialog .el-dialog__header) {
  padding: 10px;
}
.socket :deep(.video-container-dialog .el-dialog__body) {
  padding: 0;
}
.socket :deep(div[style*='inset']) {
  pointer-events: none;
}
</style>