import Vue from 'vue'
import Vuex from 'vuex'
import { authAPI } from '../api/auth'
import { courseAPI } from '../api/course'
import { resourceAPI } from '../api/resource'
import { adminAPI } from '../api/admin'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 认证状态
    isAuthenticated: false,
    currentUser: null,
    token: localStorage.getItem('token') || null,
    
    // 用户信息
    user: {
      name: '张明同学',
      college: '计算机学院',
      grade: '2022级',
      role: 'user',
      email: 'zhangsan@example.com',
      phone: '13800138000',
      creditScore: 86,
      contributions: 32,
      favorites: {
        courses: 7,
        resources: 45
      }
    },
    
    // 课程数据
    courses: [
      {
        id: 1,
        title: '计算机科学导论',
        instructor: '张教授',
        college: '计算机学院',
        rating: 4.2,
        credits: 3,
        description: '本课程介绍计算机科学的基本概念，包括算法、数据结构、编程基础等。',
        image: '/images/courses/computer-science.svg'
      },
      {
        id: 2,
        title: '数据结构与算法',
        instructor: '李教授',
        college: '计算机学院',
        rating: 4.7,
        credits: 4,
        description: '深入学习常用数据结构及其算法实现，掌握算法分析与设计的基本方法。',
        image: '/images/courses/data-structure.svg'
      },
      {
        id: 3,
        title: '宏观经济学',
        instructor: '王教授',
        college: '经济学院',
        rating: 3.5,
        credits: 2,
        description: '研究国民经济运行的整体结构及其内在规律，包括国民收入、就业、通货膨胀等。',
        image: '/images/courses/economics.svg'
      }
    ],
    
    // 资源数据
    resources: [
      {
        id: 1,
        title: '数据结构期末复习重点',
        course: '数据结构与算法',
        semester: '2023秋季',
        author: '李同学',
        downloads: 326,
        type: 'pdf',
        rating: 4.0
      },
      {
        id: 2,
        title: '算法实验报告参考',
        course: '数据结构与算法',
        semester: '实验二',
        author: '张同学',
        downloads: 287,
        type: 'word',
        rating: 4.5
      },
      {
        id: 3,
        title: '链表专题讲义',
        course: '数据结构与算法',
        semester: '第四章',
        author: '王同学',
        downloads: 142,
        type: 'presentation',
        rating: 4.2
      },
      {
        id: 4,
        title: '图算法总结',
        course: '数据结构与算法',
        semester: '第五章',
        author: '刘同学',
        downloads: 198,
        type: 'pdf',
        rating: 4.0
      },
      {
        id: 5,
        title: '作业数据集',
        course: '数据结构与算法',
        semester: '实验三',
        author: '陈同学',
        downloads: 156,
        type: 'excel',
        rating: 4.8
      },
      {
        id: 6,
        title: '树结构课件',
        course: '数据结构与算法',
        semester: '第六章',
        author: '赵同学',
        downloads: 134,
        type: 'presentation',
        rating: 3.7
      }
    ],
    
    // 评论数据
    comments: [
      {
        id: 1,
        author: '张同学',
        rating: 5,
        date: '2023-12-12',
        content: '李教授讲课非常清晰，课程内容很实用，编程作业虽然有一定难度但收获很大。推荐给所有想深入学习算法的同学！'
      },
      {
        id: 2,
        author: '王同学',
        rating: 4,
        date: '2023-12-05',
        content: '课程内容扎实，需要投入大量时间完成作业和实验。期末考试难度较高，建议提前准备。助教团队很负责，答疑及时。'
      }
    ],
    
    // 筛选条件
    filters: {
      college: '全部学院',
      major: '全部专业',
      grade: '全部年级',
      credits: '不限学分',
      rating: '全部评分',
      courseTitle: '全部课程', // 资源按课程筛选
      resourceType: '全部类型',
      resourceRating: '全部评分'
    },
    
    // 搜索关键词
    searchKeyword: '',
    
    // 当前选中的课程
    selectedCourse: null,
    
    // 用户评价
    userRating: {
      rating: 0,
      comment: ''
    },
    // 资源详情与评价
    selectedResource: null,
    resourceUserRating: {
      rating: 0,
      comment: ''
    },
    resourceComments: [
      { id: 101, author: '张同学', rating: 4, date: '2023-12-12', content: '资料很实用，讲义排版清晰。' },
      { id: 102, author: '王同学', rating: 5, date: '2023-12-08', content: '包含习题答案，复习很方便！' },
      { id: 103, author: ' 陈同学 ', rating: 4, date: '2023-12-18', content: ' 例题解析很详细，步骤不跳步，基础弱的也能跟上。' },
      { id: 104, author: ' 杨同学 ', rating: 5, date: '2023-12-01', content: ' 知识点覆盖得很全，期末复习靠这份资料提了不少分！' },
      { id: 105, author: ' 赵同学 ', rating: 4, date: '2023-12-15', content: ' 讲解比课本通俗，配合视频课学，难点一下就懂了。' },
      { id: 106, author: ' 刘同学 ', rating: 5, date: '2023-12-05', content: ' 能直接打印，纸质版复习做笔记超方便，省了自己整理的时间。' }
    ],
    
    // 待审核资源
    pendingResources: [
      {
        id: 1,
        title: '操作系统实验报告',
        author: 'S20201234',
        date: '2023-12-13 14:23'
      },
      {
        id: 2,
        title: '计算机网络笔记',
        author: 'S20210876',
        date: '2023-12-12 09:45'
      }
    ],
    
    // 用户列表
    users: [
      {
        id: 'S20201234',
        name: '张明',
        college: '计算机学院',
        status: '正常'
      },
      {
        id: 'S20215678',
        name: '李华',
        college: '经济学院',
        status: '限制中'
      }
    ],
    
    // 统计数据
    statistics: {
      totalUsers: 8642,
      totalCourses: 327,
      totalResources: 12857,
      userGrowth: 12.5,
      courseGrowth: 5.2,
      resourceGrowth: 18.3
    },

    // 我的课程
    myCourses: [],

    // 我的资源
    myResources: [],

    // 加载状态
    loading: {
      courses: false,
      resources: false,
      users: false,
      statistics: false
    },

    // 错误状态
    error: null
  },
  
  mutations: {
    // 认证相关
  SET_AUTH(state, { user, token }) {
  state.isAuthenticated = true
  state.currentUser = user
  state.token = token
  // 只有当token存在时才保存到localStorage
  if (token) {
    localStorage.setItem('token', token)
  }
  localStorage.setItem('user', JSON.stringify(user))
},
    
    CLEAR_AUTH(state) {
      state.isAuthenticated = false
      state.currentUser = null
      state.token = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },
    
    INIT_AUTH(state) {
      const token = localStorage.getItem('token')
      const user = localStorage.getItem('user')
      if (token && user) {
        state.isAuthenticated = true
        state.currentUser = JSON.parse(user)
        state.token = token
      }
    },
    
    SET_FILTER(state, { key, value }) {
      state.filters[key] = value
    },
    
    SET_SEARCH_KEYWORD(state, keyword) {
      state.searchKeyword = keyword
    },
    
    SET_SELECTED_COURSE(state, course) {
      state.selectedCourse = course
    },
    
    SET_USER_RATING(state, { rating, comment }) {
        // 使用 Vue.set 保证响应式更新
        Vue.set(state.userRating, 'rating', rating)
        Vue.set(state.userRating, 'comment', comment)
    },
    // 资源相关
    SET_SELECTED_RESOURCE(state, resource) {
      state.selectedResource = resource
    },
    SET_RESOURCE_USER_RATING(state, { rating, comment }) {
      Vue.set(state.resourceUserRating, 'rating', rating)
      Vue.set(state.resourceUserRating, 'comment', comment)
    },
    SET_RESOURCE_COMMENTS(state, comments) {
      state.resourceComments = comments || []
    },
    ADD_RESOURCE_COMMENT(state, comment) {
      state.resourceComments.unshift(comment)
    },
    REMOVE_RESOURCE_COMMENT(state, commentId) {
      state.resourceComments = state.resourceComments.filter(c => c.id !== commentId)
    },
    INCREMENT_RESOURCE_DOWNLOADS(state, resourceId) {
      // 更新 resources 列表
      const idx = state.resources.findIndex(r => r.id === resourceId)
      if (idx !== -1) {
          const updated = { ...state.resources[idx], downloads: (state.resources[idx].downloads || 0) + 1 }
          state.resources.splice(idx, 1, updated)
      }
      // 更新已选中的资源
      if (state.selectedResource && state.selectedResource.id === resourceId) {
          state.selectedResource = {
              ...state.selectedResource,
              downloads: (state.selectedResource.downloads || 0) + 1
          }
      }
    },
    
    SET_COMMENTS(state, comments) {
      state.comments = comments || []
    },
    ADD_COMMENT(state, comment) {
      state.comments.unshift(comment)
    },
    REMOVE_COMMENT(state, commentId) {
      state.comments = state.comments.filter(c => c.id !== commentId)
    },
    
    UPDATE_USER(state, user) {
      const index = state.users.findIndex(u => u.id === user.id)
      if (index !== -1) {
        state.users.splice(index, 1, user)
      }
    },

    // 课程相关
    SET_COURSES(state, courses) {
      state.courses = courses
    },

    SET_MY_COURSES(state, courses) {
      state.myCourses = courses
    },

    // 资源相关
    SET_RESOURCES(state, resources) {
      state.resources = resources
    },

    SET_MY_RESOURCES(state, resources) {
      state.myResources = resources
    },

    // 管理员相关
    SET_USERS(state, users) {
      state.users = users
    },

    SET_PENDING_RESOURCES(state, resources) {
      state.pendingResources = resources
    },

    SET_STATISTICS(state, statistics) {
      state.statistics = statistics
    },

    // 加载状态
    SET_LOADING(state, { key, value }) {
      state.loading[key] = value
    },

    // 错误状态
    SET_ERROR(state, error) {
      state.error = error
    },

    CLEAR_ERROR(state) {
      state.error = null
    }
  },
  
  actions: {
    // 认证相关
async login({ commit }, credentials) {
  try {
    commit('SET_LOADING', { key: 'auth', value: true })
    commit('CLEAR_ERROR')
    const response = await authAPI.login(credentials)
    
    console.log('API响应:', response); // 添加日志以便调试
    
    // 适配实际的API响应格式
    let user, token;
    
    // 检查响应格式 - 根据您提供的信息进行适配
    if (response && response.data && response.data.baseResponse) {
      // 检查成功的状态码 (10000)
      if (response.data.baseResponse.code === 10000) {
        // 从响应中提取实际的用户数据
        user = response.data.user;
        
        // 从响应头中获取token
        token = response.headers['authorization'] || response.headers['x-auth-token'] || response.headers['access-token'];
        // 如果响应头中的token包含Bearer前缀，需要去掉
        if (token && token.startsWith('Bearer ')) {
          token = token.substring(7);
        }
        
        // 如果响应头中没有token，检查响应体中是否有
        if (!token) {
          token = response.data.token || response.data.access_token || response.data.data?.token;
        }
      } else {
        throw new Error(response.data.baseResponse.message || '登录失败')
      }
    }
    
    // 检查是否获取到了用户信息
    if (user) {
      // 使用API响应中的实际用户数据
      const actualUser = {
        userId: user.userId || 0,
        username: user.username || '',
        email: user.email || '',
        collegeId: user.collegeId || 0,
        majorId: user.majorId || 0,
        avatarUrl: user.avatarUrl || '',
        reputationScore: user.reputationScore || 0,
        roleId: user.roleId || 2,
        role: user.roleId === 1 ? 'admin' : user.roleId === 2 ? 'user' : 'guest', // 根据roleId设置role
        status: user.status || 'active',
        createdAt: user.createdAt || 0,
        updatedAt: user.updatedAt || 0
      };
      
      // 即使没有token也继续，因为可能在其他地方处理认证
      commit('SET_AUTH', { user: actualUser, token: token || '' })
      return actualUser
    } else {
      console.error('响应数据不完整:', response);
      throw new Error('登录响应数据格式不正确，缺少用户信息')
    }
  } catch (error) {
    // 更详细的错误处理
    console.error('登录错误:', error);
    let errorMessage = '登录失败';
    
    if (error.response) {
      // 服务器响应了错误状态码
      if (error.response.status === 401) {
        errorMessage = '用户名或密码错误';
      } else if (error.response.status === 400) {
        errorMessage = '请求参数错误';
      } else if (error.response.status === 500) {
        errorMessage = '服务器内部错误';
      } else {
        errorMessage = `登录失败 (${error.response.status})`;
      }
    } else if (error.request) {
      // 请求已发出但没有收到响应
      errorMessage = '网络连接失败，请检查网络设置';
    } else if (error.message) {
      // 其他错误信息
      errorMessage = error.message;
    }
    
    commit('SET_ERROR', errorMessage)
    throw new Error(errorMessage)
  } finally { 
    commit('SET_LOADING', { key: 'auth', value: false })
  }
},
    

    // 注册
    async register({ commit }, userData) {
      try {
        commit('SET_LOADING', { key: 'auth', value: true })
        commit('CLEAR_ERROR')
        
        // 调用注册API
        const response = await authAPI.register(userData)
        
        // 处理响应
        if (response && response.data) {
          // 检查是否是baseResponse格式
          if (response.data.baseResponse) {
            if (response.data.baseResponse.code === 10000) {
              // 注册成功，但通常注册后需要登录
              return response.data
            } else {
              throw new Error(response.data.baseResponse.message || '注册失败')
            }
          } else {
            // 直接返回数据格式
            return response.data
          }
        } else {
          throw new Error('注册响应数据格式不正确')
        }
      } catch (error) {
        // 错误处理
        let errorMessage = '注册失败'
        
        if (error.response) {
          // 服务器响应了错误状态码
          if (error.response.status === 409) {
            errorMessage = '该邮箱或用户名已被注册'
          } else if (error.response.status === 400) {
            errorMessage = '请求参数错误，请检查输入'
          } else if (error.response.status === 500) {
            errorMessage = '服务器内部错误，请稍后重试'
          } else {
            errorMessage = `注册失败 (${error.response.status})`
          }
        } else if (error.request) {
          // 请求已发出但没有收到响应
          errorMessage = '网络连接失败，请检查网络设置'
        } else if (error.message) {
          // 其他错误信息
          errorMessage = error.message
        }
        
        commit('SET_ERROR', errorMessage)
        throw new Error(errorMessage)
      } finally {
        commit('SET_LOADING', { key: 'auth', value: false })
      }
    },
    
    initAuth({ commit }) {
      commit('INIT_AUTH')
    },
  
    // 登出
    async logout({ commit }) {
      try {
        // 调用登出API
        await authAPI.logout()
      } catch (error) {
        console.error('Logout API error:', error)
      }finally { 
        commit('CLEAR_AUTH')
        commit('CLEAR_ERROR')
      }
    },
    
    initAuth({ commit }) {
      commit('INIT_AUTH')
    },

    //添加邮箱验证码获取功能
    async getEmailCode({ commit }, email) {
      try {
        const response = await authAPI.getEmailCode(email)
        return response
      } catch (error) {
        throw error
      }
    },


    // 添加邮箱验证功能
    async verifyEmail({ commit }, data) {
      try {
        const response = await authAPI.verifyEmail(data)
        return response
      } catch (error) {
        throw error
      }
    },

    //添加密码重置功能
    async resetPassword({ commit }, data) {
      try {
        const response = await authAPI.resetPassword(data)
        return response
      } catch (error) {
        throw error
      }
    },

    //添加token刷新功能
    async refreshToken({ commit }) {
      try {
        const response = await authAPI.refreshToken()
        const { token } = response.data
        commit('SET_AUTH', { user: state.currentUser, token })
        return token
      } catch (error) {
        //刷新失败则登出
        commit('CLEAR_AUTH')
        throw error
      }
    },
    

    updateFilter({ commit }, { key, value }) {
      commit('SET_FILTER', { key, value })
    },
    
    updateSearchKeyword({ commit }, keyword) {
      commit('SET_SEARCH_KEYWORD', keyword)
    },
    
    selectCourse({ commit }, course) {
      commit('SET_SELECTED_COURSE', course)
    },
    
    // 课程：提交评分与评论（替换原本仅前端入库的实现）
    async submitRating({ commit, state }, { rating, comment }) {
      const courseId = state.selectedCourse?.id
      if (!courseId) {
        const err = new Error('未选择课程，无法提交评价')
        commit('SET_ERROR', err.message)
        throw err
      }
      const author = state.currentUser?.username || '当前用户'
      try {
        // 先提交评分
        await courseAPI.submitCourseRating({ courseId, rating })
        // 再提交评论（同时附带评分，后端可选择是否使用）
        const res = await courseAPI.submitCourseComment({ courseId, content: comment, rating })

        // 兼容后端返回：若返回评论实体则直接使用，否则本地构造一条
        const serverComment = res?.data || null
        const newComment = serverComment && serverComment.id
          ? serverComment
          : {
              id: Date.now(),
              author,
              rating,
              date: new Date().toISOString().split('T')[0],
              content: comment
            }

        commit('ADD_COMMENT', newComment)
        commit('SET_USER_RATING', { rating: 0, comment: '' })
        return newComment
      } catch (error) {
        commit('SET_ERROR', error?.message || '提交课程评价失败')
        throw error
      }
    },

    // 课程：拉取评论列表
    async fetchCourseComments({ commit }, courseId) {
      try {
        const { data } = await courseAPI.getCourseComments(courseId)
        const list = Array.isArray(data) ? data : (data?.items || [])
        commit('SET_COMMENTS', list)
        return list
      } catch (error) {
        commit('SET_ERROR', error?.message || '加载课程评论失败')
        throw error
      }
    },

    // 课程：删除评论
    async deleteCourseComment({ commit }, commentId) {
      try {
        await courseAPI.deleteCourseComment(commentId)
        commit('REMOVE_COMMENT', commentId)
      } catch (error) {
        commit('SET_ERROR', error?.message || '删除课程评论失败')
        throw error
      }
    },

    // 课程：删除评分（通常不需要更新本地列表）
    async deleteCourseRating(_, ratingId) {
      try {
        await courseAPI.deleteCourseRating(ratingId)
      } catch (error) {
        throw error
      }
    },

    // 资源：提交评分与评论（ResourceDetail.vue 调用）
    async submitResourceRating({ commit, state }, { rating, comment }) {
      const resourceId = state.selectedResource?.id
      if (!resourceId) {
        const err = new Error('未选择资源，无法提交评价')
        commit('SET_ERROR', err.message)
        throw err
      }
      const author = state.currentUser?.username || '当前用户'
      try {
        // 先提交评分
        await resourceAPI.submitResourceRating({ resourceId, rating })
        // 再提交评论（同时附带评分，后端可选择是否使用）
        const res = await resourceAPI.submitResourceComment({ resourceId, content: comment, rating })

        const serverComment = res?.data || null
        const newComment = serverComment && serverComment.id
          ? serverComment
          : {
              id: Date.now(),
              author,
              rating,
              date: new Date().toISOString().split('T')[0],
              content: comment
            }

        commit('ADD_RESOURCE_COMMENT', newComment)
        commit('SET_RESOURCE_USER_RATING', { rating: 0, comment: '' })
        return newComment
      } catch (error) {
        commit('SET_ERROR', error?.message || '提交资源评价失败')
        throw error
      }
    },

    // 资源：拉取评论列表
    async fetchResourceComments({ commit }, resourceId) {
      try {
        const { data } = await resourceAPI.getResourceComments(resourceId)
        const list = Array.isArray(data) ? data : (data?.items || [])
        commit('SET_RESOURCE_COMMENTS', list)
        return list
      } catch (error) {
        commit('SET_ERROR', error?.message || '加载资源评论失败')
        throw error
      }
    },

    // 资源：删除评论
    async deleteResourceComment({ commit }, commentId) {
      try {
        await resourceAPI.deleteResourceComment(commentId)
        commit('REMOVE_RESOURCE_COMMENT', commentId)
      } catch (error) {
        commit('SET_ERROR', error?.message || '删除资源评论失败')
        throw error
      }
    },

    // 资源：删除评分
    async deleteResourceRating(_, ratingId) {
      try {
        await resourceAPI.deleteResourceRating(ratingId)
      } catch (error) {
        throw error
      }
    },

    updateUser({ commit }, user) {
      commit('UPDATE_USER', user)
    },

    // 课程相关
    async fetchCourses({ commit, state }, params = {}) {
      try {
        commit('SET_LOADING', { key: 'courses', value: true })
        const response = await courseAPI.getCourses(params)
        commit('SET_COURSES', response.data)
        return response.data
      } catch (error) {
        // 网络连接失败时，使用本地模拟数据
        console.warn('API请求失败，使用本地模拟数据:', error)
        // 如果state中已有课程数据，使用现有数据
        if (state.courses && state.courses.length > 0) {
          return state.courses
        }
        // 否则使用默认的模拟课程数据
        const mockCourses = [
          {
            id: 1,
            title: '计算机科学导论',
            instructor: '张教授',
            college: '计算机学院',
            rating: 4.2,
            credits: 3,
            description: '本课程介绍计算机科学的基本概念，包括算法、数据结构、编程基础等。',
            image: '/images/courses/computer-science.svg'
          },
          {
            id: 2,
            title: '数据结构与算法',
            instructor: '李教授',
            college: '计算机学院',
            rating: 4.7,
            credits: 4,
            description: '深入学习常用数据结构及其算法实现，掌握算法分析与设计的基本方法。',
            image: '/images/courses/data-structure.svg'
          },
          {
            id: 3,
            title: '宏观经济学',
            instructor: '王教授',
            college: '经济学院',
            rating: 3.5,
            credits: 2,
            description: '研究国民经济运行的整体结构及其内在规律，包括国民收入、就业、通货膨胀等。',
            image: '/images/courses/economics.svg'
          }
        ]
        commit('SET_COURSES', mockCourses)
        return mockCourses
      } finally {
        commit('SET_LOADING', { key: 'courses', value: false })
      }
    },

    async fetchCourseById({ commit }, courseId) {
      try {
        const response = await courseAPI.getCourseById(courseId)
        return response.data
      } catch (error) {
        throw error
      }
    },

    async searchCourses({ commit }, { keyword, filters }) {
      try {
        const response = await courseAPI.searchCourses(keyword, filters)
        return response.data
      } catch (error) {
        throw error
      }
    },

    async fetchMyCourses({ commit }) {
      try {
        const response = await courseAPI.getMyCourses()
        commit('SET_MY_COURSES', response.data)
        return response.data
      } catch (error) {
        throw error
      }
    },

    async enrollCourse({ commit }, courseId) {
      try {
        await courseAPI.enrollCourse(courseId)
        // 重新获取我的课程列表
        await this.dispatch('fetchMyCourses')
      } catch (error) {
        throw error
      }
    },

    // 资源相关
    async fetchResources({ commit }, params = {}) {
      try {
        const response = await resourceAPI.getResources(params)
        commit('SET_RESOURCES', response.data)
        return response.data
      } catch (error) {
        throw error
      }
    },

    async fetchResourceById({ commit }, resourceId) {
      try {
        const response = await resourceAPI.getResourceById(resourceId)
        return response.data
      } catch (error) {
        throw error
      }
    },

    async searchResources({ commit }, { keyword, filters }) {
      try {
        const response = await resourceAPI.searchResources(keyword, filters)
        return response.data
      } catch (error) {
        throw error
      }
    },

    async uploadResource({ commit }, resourceData) {
      try {
        const response = await resourceAPI.uploadResource(resourceData)
        return response.data
      } catch (error) {
        throw error
      }
    },

    async fetchMyResources({ commit }) {
      try {
        const response = await resourceAPI.getMyResources()
        commit('SET_MY_RESOURCES', response.data)
        return response.data
      } catch (error) {
        throw error
      }
    },

    // 管理员相关
    async fetchUsers({ commit }, params = {}) {
      try {
        const response = await adminAPI.getUsers(params)
        commit('SET_USERS', response.data)
        return response.data
      } catch (error) {
        throw error
      }
    },

    async fetchPendingResources({ commit }, params = {}) {
      try {
        const response = await adminAPI.getPendingResources(params)
        commit('SET_PENDING_RESOURCES', response.data)
        return response.data
      } catch (error) {
        throw error
      }
    },

    async reviewResource({ commit }, { resourceId, action, comment }) {
      try {
        await adminAPI.reviewResource(resourceId, action, comment)
        // 重新获取待审核资源列表
        await this.dispatch('fetchPendingResources')
      } catch (error) {
        throw error
      }
    },

    async fetchStatistics({ commit }) {
      try {
        const response = await adminAPI.getStatistics()
        commit('SET_STATISTICS', response.data)
        return response.data
      } catch (error) {
        throw error
      }
    }
  },
  
  getters: {
    // 认证相关
    isAuthenticated: (state) => state.isAuthenticated,
    currentUser: (state) => state.currentUser,
    token: (state) => state.token,
    
    filteredCourses: (state) => {
      let filtered = state.courses
      
      if (state.filters.college !== '全部学院') {
        filtered = filtered.filter(course => course.college === state.filters.college)
      }
      
      if (state.filters.credits !== '不限学分') {
        const credits = parseInt(state.filters.credits)
        filtered = filtered.filter(course => course.credits === credits)
      }
      
      if (state.filters.rating !== '全部评分') {
        const minRating = parseFloat(state.filters.rating.replace('分以上', ''))
        filtered = filtered.filter(course => course.rating >= minRating)
      }
      
      if (state.searchKeyword) {
        filtered = filtered.filter(course => 
          course.title.includes(state.searchKeyword) ||
          course.instructor.includes(state.searchKeyword) ||
          course.description.includes(state.searchKeyword)
        )
      }
      
      return filtered
    },
    
    filteredResources: (state) => {
      let filtered = state.resources

      // 课程筛选
      if (state.filters.courseTitle && state.filters.courseTitle !== '全部课程') {
        filtered = filtered.filter(resource => resource.course === state.filters.courseTitle)
      }

      // 类型筛选
      if (state.filters.resourceType && state.filters.resourceType !== '全部类型') {
        filtered = filtered.filter(resource => resource.type === state.filters.resourceType)
      }

      // 评分筛选
      if (state.filters.resourceRating && state.filters.resourceRating !== '全部评分') {
        const minRating = parseFloat(state.filters.resourceRating.replace('分以上', ''))
        filtered = filtered.filter(resource => resource.rating >= minRating)
      }

      // 关键词筛选
      if (state.searchKeyword) {
        filtered = filtered.filter(resource => 
          resource.title.includes(state.searchKeyword) ||
          resource.course.includes(state.searchKeyword) ||
          resource.author.includes(state.searchKeyword)
        )
      }
      
      return filtered
    }
  }
})
