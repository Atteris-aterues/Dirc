<template>
  <div class="app-container min-h-screen flex flex-col">
    <NavBar v-if="$route.path !== '/login'" />
    <main class="flex-grow">
      <router-view />
    </main>
    <Footer v-if="$route.path !== '/login'" />
    <ErrorHandler />
    <LoadingSpinner 
      :loading="globalLoading" 
      :message="loadingMessage" 
    />
    <!-- 简单的消息提示组件 -->
    <div v-if="message.text" :class="['message', message.type]" @click="clearMessage">
      {{ message.text }}
    </div>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
import Footer from './components/Footer.vue'
import ErrorHandler from './components/ErrorHandler.vue'
import LoadingSpinner from './components/LoadingSpinner.vue'
import { mapState } from 'vuex'

export default {
  name: 'App',
  components: {
    NavBar,
    Footer,
    ErrorHandler,
    LoadingSpinner
  },
  data() {
    return {
      message: {
        text: '',
        type: 'info' // success, error, warning, info
      }
    }
  },
  computed: {
    ...mapState(['loading']),
    globalLoading() {
      return Object.values(this.loading).some(loading => loading)
    },
    loadingMessage() {
      if (this.loading.courses) return '加载课程中...'
      if (this.loading.resources) return '加载资源中...'
      if (this.loading.users) return '加载用户中...'
      if (this.loading.statistics) return '加载统计中...'
      return '加载中...'
    }
  },
  methods: {
    showMessage(text, type = 'info') {
      this.message = { text, type }
      setTimeout(() => {
        this.clearMessage()
      }, 3000)
    },
    clearMessage() {
      this.message = { text: '', type: 'info' }
    }
  },
  // 全局方法，可以在任何组件中通过 this.$root.$emit('message', text, type) 调用
  mounted() {
    // 在根实例上监听全局消息事件
    this.$root.$on('message', (text, type) => {
      this.showMessage(text, type)
    })
  },
  beforeDestroy() {
    // 组件销毁时取消根实例的监听
    this.$root.$off('message')
  }
}
</script>

<style scoped>
.message {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 12px 20px;
  border-radius: 4px;
  color: white;
  font-weight: 500;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  cursor: pointer;
  transition: opacity 0.3s;
}

.message.success {
  background-color: #52c41a;
}

.message.error {
  background-color: #ff4d4f;
}

.message.warning {
  background-color: #faad14;
}

.message.info {
  background-color: #1890ff;
}
</style>