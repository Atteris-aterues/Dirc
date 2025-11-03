<template>
  <div class="min-h-screen relative flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
    <!-- Canvas动态渐变背景 -->
    <GradientBackground />
    
    <!-- 登录内容，确保在Canvas之上 -->
    <div class="max-w-md w-full space-y-8 relative z-10">
      <!-- Logo和标题 -->
      <div class="text-center">
        <img 
          src="/images/icons/logo.svg" 
          alt="教育资源共享平台" 
          class="w-20 h-20 mx-auto mb-4"
          @error="handleLogoError"
        />
        <h2 class="text-3xl font-bold text-gray-900">智慧选课平台</h2>
        <p class="mt-2 text-sm text-gray-600">请登录您的账户</p>
      </div>

      
      <!-- 登录表单 -->
      <div class="bg-white bg-opacity-95 backdrop-blur-sm card p-8 shadow-2xl">
        <form @submit.prevent="handleLogin" class="space-y-6">
          <!-- 邮箱输入 -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
              邮箱
            </label>
            <input
              id="email"
              v-model="loginForm.email"
              type="email"
              required
              class="w-full border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="请输入邮箱地址"
            />
          </div>

          <!-- 密码输入 -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
              密码
            </label>
            <div class="relative">
              <input
                id="password"
                v-model="loginForm.password"
                :type="showPassword ? 'text' : 'password'"
                required
                class="w-full border border-gray-300 rounded-md py-3 px-4 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="请输入密码"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <span 
                  class="iconify text-gray-400 hover:text-gray-600"
                  :data-icon="showPassword ? 'mdi:eye-off' : 'mdi:eye'"
                ></span>
              </button>
            </div>
          </div>

          <!-- 记住我和忘记密码 -->
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember-me"
                v-model="loginForm.rememberMe"
                type="checkbox"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label for="remember-me" class="ml-2 block text-sm text-gray-700">
                记住我
              </label>
            </div>
            <div class="text-sm">
              <a href="#" class="font-medium text-blue-600 hover:text-blue-500">
                忘记密码？
              </a>
            </div>
          </div>

          <!-- 登录按钮 -->
          <div>
            <button
              type="submit"
              :disabled="isLoading"
              class="w-full btn-primary py-3 text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="isLoading" class="flex items-center justify-center">
                <span class="iconify animate-spin mr-2" data-icon="mdi:loading"></span>
                登录中...
              </span>
              <span v-else>登录</span>
            </button>
          </div>

          <!-- 错误信息 -->
          <div v-if="errorMessage" class="bg-red-50 border border-red-200 rounded-md p-4">
            <div class="flex">
              <span class="iconify text-red-400 mr-2" data-icon="mdi:alert-circle"></span>
              <span class="text-sm text-red-700">{{ errorMessage }}</span>
            </div>
          </div>

          <!-- 注册链接 -->
          <div class="text-center">
            <p class="text-sm text-gray-600">
              还没有账户？
              <a href="#" @click.prevent="showRegister = true" class="font-medium text-blue-600 hover:text-blue-500">
                立即注册
              </a>
            </p>
          </div>
        </form>
      </div>

      <!-- 快速登录选项 -->
      <div class="bg-white bg-opacity-95 backdrop-blur-sm card p-6 shadow-2xl">
        <h3 class="text-lg font-medium text-gray-900 mb-4 text-center">快速登录</h3>
        <div class="grid grid-cols-2 gap-4">
          <button
            @click="quickLogin('student')"
            class="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <span class="iconify mr-2 text-blue-600" data-icon="mdi:account"></span>
            学生登录
          </button>
          <button
            @click="quickLogin('admin')"
            class="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <span class="iconify mr-2 text-red-600" data-icon="mdi:shield-crown"></span>
            管理员登录
          </button>
        </div>
      </div>
    </div>

    <!-- 注册模态框 -->
    <div v-if="showRegister" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg p-8 max-w-md w-full mx-4 shadow-2xl">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-xl font-bold text-gray-900">注册新账户</h3>
          <button @click="showRegister = false" class="text-gray-400 hover:text-gray-600">
            <span class="iconify text-xl" data-icon="mdi:close"></span>
          </button>
        </div>


        <form @submit.prevent="handleRegister" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">用户名</label>
            <input
              v-model="registerForm.username"
              type="text"
              required
              class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="请输入用户名"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">邮箱</label>
            <input
              v-model="registerForm.email"
              type="email"
              required
              class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="请输入邮箱"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">密码</label>
            <input
              v-model="registerForm.password"
              type="password"
              required
              class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="请输入密码"
              @focus="clearErrorMessage"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">确认密码</label>
            <input
              v-model="registerForm.confirmPassword"
              type="password"
              required
              class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="请再次输入密码"
              @focus="clearErrorMessage"
            />
          </div>

          <!-- 注册错误信息 -->
         <div v-if="errorMessage" class="bg-red-50 border border-red-200 rounded-md p-4"> 
          <div class="flex">
            <span class="iconify text-red-400 mr-2" data-icon="mdi:alert-circle"></span>
            <span class="text-sm text-red-700">{{ errorMessage }}</span>
          </div>
        </div>

          <div class="flex space-x-4 pt-4">
            <button
              type="button"
              @click="showRegister = false"
              class="flex-1 btn-secondary"
            >
              取消
            </button>
            <button
              type="submit"
              class="flex-1 btn-primary"
            >
              注册
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import GradientBackground from '../components/GradientBackground.vue'

export default {
  name: 'Login',
  components: {
    GradientBackground
  },
  data() {
    return {
      showPassword: false,
      showRegister: false,
      isLoading: false,
      errorMessage: '',
      loginForm: {
        email: '',
        password: '',
        rememberMe: false
      },
      registerForm: {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      }
    }
  },

  methods: {
    ...mapActions(['login','register']),

    clearErrorMessage() {
      this.errorMessage = '';
    },
    async handleLogin() {
      try {
        // 显示加载状态
        this.isLoading = true;
        this.errorMessage = '';
        
        // 调用 Vuex 中的 login action
        const user = await this.login({
          email: this.loginForm.email,
          password: this.loginForm.password
        });
        
        // 登录成功后的处理
        this.$root.$emit('message', '登录成功', 'success');

        // 确保登录状态已保存后再跳转
        await this.$nextTick();
        
        // 根据用户角色跳转到相应页面
        if (user && user.role === 'admin') {
          this.$router.push('/admin');
        } else {
          this.$router.push('/'); // 或者跳转到用户主页
        }
      } catch (error) {
        // 登录失败处理
        const errorMessage = (error && error.message) || '登录失败，请检查账号密码';
        this.errorMessage = errorMessage;
        this.$root.$emit('message', errorMessage, 'error');
      } finally {
        this.isLoading = false;
      }
    },
    
    async handleRegister() {
      if (this.registerForm.password !== this.registerForm.confirmPassword) {
        const errorMessage = '两次输入的密码不一致';
        this.errorMessage = errorMessage;
        this.$root.$emit('message', errorMessage, 'error');
        return
      }
      
      try {
        // 只传递需要的字段
        const registerData = {
          username: this.registerForm.username,
          email: this.registerForm.email,
          password: this.registerForm.password
        };
        
        await this.register(registerData)
        // 注册成功后关闭注册模态框并显示成功消息
        this.showRegister = false
        this.$root.$emit('message', '注册成功', 'success');

        // 清空注册表单
        this.registerForm = {
          username: '',
          email: '',
          password: '',
          confirmPassword: ''
        };
      } catch (error) {
        const errorMessage = error.message || '注册失败，请重试';
        this.errorMessage = errorMessage;
        this.$root.$emit('message', errorMessage, 'error');
      }
    },
    
    quickLogin(type) {
      if (type === 'student') {
        this.loginForm.email = '2451965602@qq.com'
        this.loginForm.password = 'lbl102300218'
      } else if (type === 'admin') {
        this.loginForm.email = 'admin@example.com'
        this.loginForm.password = '123456'
      }
      this.handleLogin()
    },
    handleLogoError(event) {
      // Logo 加载失败时显示占位符
      event.target.style.display = 'none'
      const placeholder = document.createElement('div')
      placeholder.className = 'bg-gray-200 border-2 border-dashed rounded-xl w-20 h-20 mx-auto mb-4'
      event.target.parentNode.insertBefore(placeholder, event.target)
    }
  },

    watch: {
    showRegister(newVal) {
      if (newVal) {
        // 当打开注册模态框时，清除所有错误信息
        this.clearErrorMessage();
      }else {
        // 当关闭注册模态框时，清除所有错误信息
        this.clearErrorMessage();
      }
    }
  }
}
</script>