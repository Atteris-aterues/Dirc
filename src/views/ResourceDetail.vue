<template>
  <div class="px-8 py-6" v-if="selectedResource">
    <div class="grid grid-cols-3 gap-8">
      <!-- 左侧资源信息 -->
      <div class="col-span-1">
        <div class="card p-6">
          <div class="flex items-center mb-4">
            <div 
              class="rounded-md flex items-center justify-center p-3 mr-4"
              :class="getTypeClass(selectedResource.type)"
            >
              <span 
                class="iconify text-3xl"
                :class="getTypeColor(selectedResource.type)"
                :data-icon="getTypeIcon(selectedResource.type)"
              ></span>
            </div>
            <div>
              <h1 class="text-2xl font-bold mb-1">{{ selectedResource.title }}</h1>
              <p class="text-gray-600">{{ selectedResource.course }} · {{ selectedResource.semester }}</p>
            </div>
          </div>
          <div class="flex justify-between text-sm mb-4">
            <span>作者：{{ selectedResource.author }}</span>
            <div class="flex items-center">
              <span class="iconify mr-1" data-icon="mdi:download"></span>
              <span>{{ selectedResource.downloads }}次下载</span>
            </div>
          </div>
          <div class="flex items-center">
            <div class="star-rating flex mr-2">
              <span 
                v-for="star in 5" 
                :key="star"
                class="iconify star"
                :class="{ active: star <= Math.floor(selectedResource.rating) }"
                data-icon="mdi:star"
              ></span>
            </div>
            <span class="text-sm text-gray-600">{{ selectedResource.rating }}</span>
          </div>
        </div>

        <!-- 新增：资源操作 + 文件信息 -->
        <div class="card p-6 mt-6">
          <h3 class="text-lg font-bold mb-3">资源操作</h3>
          <div class="flex space-x-2 mb-4">
            <button class="btn-primary flex items-center" @click="downloadResource">
              <span class="iconify mr-2" data-icon="mdi:download"></span>
              下载资源
            </button>
            <button class="btn-secondary flex items-center" @click="toggleFavorite">
              <span class="iconify mr-2" :data-icon="isFavorite ? 'mdi:heart' : 'mdi:heart-outline'"></span>
              {{ isFavorite ? '已收藏' : '收藏' }}
            </button>
          </div>

          <h3 class="text-lg font-bold mb-3">文件信息</h3>
          <ul class="space-y-2 text-sm text-gray-700">
            <li class="flex items-center"><span class="iconify mr-2" data-icon="mdi:file"></span> 类型：{{ selectedResource.type }}</li>
            <li class="flex items-center"><span class="iconify mr-2" data-icon="mdi:book-education"></span> 课程：{{ selectedResource.course }}</li>
            <li class="flex items-center"><span class="iconify mr-2" data-icon="mdi:calendar"></span> 学期：{{ selectedResource.semester }}</li>
            <li class="flex items-center"><span class="iconify mr-2" data-icon="mdi:account"></span> 作者：{{ selectedResource.author }}</li>
            <li class="flex items-center"><span class="iconify mr-2" data-icon="mdi:star"></span> 评分：{{ selectedResource.rating }}</li>
            <li class="flex items-center"><span class="iconify mr-2" data-icon="mdi:download"></span> 下载：{{ selectedResource.downloads }}</li>
          </ul>
        </div>

        <!-- 新增：相关资源 -->
        <div class="card p-6 mt-6">
          <h3 class="text-lg font-bold mb-3">相关资源</h3>
          <div class="space-y-3">
            <div 
              v-for="res in relatedResources" 
              :key="res.id" 
              class="flex items-center justify-between border border-gray-100 rounded p-2"
            >
              <div>
                <div class="text-sm font-medium">{{ res.title }}</div>
                <div class="text-xs text-gray-500">{{ res.course }} · {{ res.semester }}</div>
              </div>
              <button class="btn-secondary text-xs" @click="openResource(res)">查看详情</button>
            </div>
            <div v-if="relatedResources.length === 0" class="text-sm text-gray-500">暂无相关资源</div>
          </div>
        </div>
      </div>

      <!-- 右侧评分和评论 -->
      <div class="col-span-2">
        <div class="card p-6 mb-8">
          <h2 class="text-xl font-bold mb-4">资源评分</h2>
          <div class="mb-6">
            <h3 class="font-bold mb-3">您的评价</h3>
            <div class="mb-4">
              <label class="block text-gray-700 mb-2">评分</label>
              <div class="star-rating flex space-x-1">
                <span
                  v-for="star in 5"
                  :key="star"
                  class="star-char text-2xl"
                  :class="star <= resourceUserRating.rating ? 'active' : 'inactive'"
                  role="button"
                  tabindex="0"
                  :aria-label="`评分${star}星`"
                  @click="setRating(star)"
                  @keydown.enter.prevent="setRating(star)"
                >{{ star <= resourceUserRating.rating ? '★' : '☆' }}</span>
              </div>
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 mb-2">评论</label>
              <textarea 
                class="w-full border border-gray-300 rounded-md p-3 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
                v-model="resourceUserRating.comment"
                placeholder="请输入您的评价..."
              ></textarea>
            </div>
            <button class="btn-primary" @click="submit">提交评价</button>
          </div>

          <!-- 评论列表 -->
          <div class="card p-6">
            <h2 class="text-xl font-bold mb-4">用户评价（{{ resourceComments.length }}条）</h2>
            <div 
              v-for="comment in resourceComments" 
              :key="comment.id"
              class="comment-item"
            >
              <div class="flex items-start justify-between mb-2">
                <div class="flex items-center">
                  <div class="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 mr-3"></div>
                  <div>
                    <h4 class="font-bold">{{ comment.author }}</h4>
                    <div class="flex items-center">
                      <div class="star-rating flex mr-2">
                        <span 
                          v-for="star in 5" 
                          :key="star"
                          class="iconify star"
                          :class="{ active: star <= comment.rating }"
                          data-icon="mdi:star"
                        ></span>
                      </div>
                      <span class="text-gray-500 text-sm">{{ comment.date }}</span>
                    </div>
                  </div>
                </div>
                <!-- 点赞按钮（右侧） -->
                <button
                  class="inline-flex items-center space-x-1 px-2 py-1 rounded hover:bg-blue-50 transition transform active:scale-95"
                  :class="comment.liked ? 'text-blue-600' : 'text-gray-600'"
                  @click="toggleResourceCommentLike(comment)"
                  :aria-label="comment.liked ? '取消点赞' : '点赞'"
                >
                  <span class="iconify" :data-icon="comment.liked ? 'mdi:thumb-up' : 'mdi:thumb-up-outline'"></span>
                  <span>{{ comment.likes || 0 }}</span>
                </button>
              </div>
              <p class="text-gray-700">{{ comment.content }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ResourceDetail',
  data() {
    return {
      isFavorite: false
    }
  },
  computed: {
    ...mapState(['selectedResource', 'resourceComments', 'resourceUserRating']),
    relatedResources() {
      const list = this.$store.state.resources || []
      const cur = this.selectedResource
      if (!cur) return []
      return list
        .filter(r => r.course === cur.course && r.id !== cur.id)
        .slice(0, 3)
    }
  },
  methods: {
    setRating(rating) {
      this.$store.commit('SET_RESOURCE_USER_RATING', {
        rating,
        comment: this.resourceUserRating.comment
      })
    },
    async submit() {
      if (this.resourceUserRating.rating > 0 && this.resourceUserRating.comment.trim()) {
        try {
          await this.$store.dispatch('submitResourceRating', {
            rating: this.resourceUserRating.rating,
            comment: this.resourceUserRating.comment
          })
          alert('评价提交成功！')
        } catch (error) {
          console.error('提交资源评价失败:', {
            status: error?.response?.status,
            data: error?.response?.data,
            url: error?.config?.url
          })
          const msg = error?.response?.data?.message || error?.message || '提交失败，后端报错(500)'
          alert(msg)
        }
      } else {
        alert('请选择评分并填写评论')
      }
    },
    watch: {
      selectedResource: {
        immediate: true,
        async handler(res) {
          try {
            if (res && res.id) {
              await this.$store.dispatch('fetchResourceComments', res.id)
            } else {
              // 未选中资源时，清空评论，避免残留
              this.$store.commit('SET_RESOURCE_COMMENTS', [])
            }
          } catch (error) {
            console.error('加载资源评论失败:', {
              status: error?.response?.status,
              data: error?.response?.data
            })
            const msg = error?.response?.data?.message || error?.message || '加载资源评论失败'
            this.$root?.$emit?.('message', msg, 'error')
          }
        }
      }
    },
    downloadResource() {
      if (!this.selectedResource) return
      this.$store.commit('INCREMENT_RESOURCE_DOWNLOADS', this.selectedResource.id)
      alert('开始下载（示例）')
    },
    toggleFavorite() {
      this.isFavorite = !this.isFavorite
    },
    openResource(res) {
      this.$store.commit('SET_SELECTED_RESOURCE', res)
      // 当前页面即可刷新详情，无需跳转
    },
    getTypeClass(type) {
      const classes = {
        pdf: 'bg-blue-100',
        word: 'bg-orange-100',
        presentation: 'bg-purple-100',
        excel: 'bg-green-100',
        powerpoint: 'bg-yellow-100'
      }
      return classes[type] || 'bg-gray-100'
    },
    getTypeColor(type) {
      const colors = {
        pdf: 'text-blue-600',
        word: 'text-orange-500',
        presentation: 'text-purple-600',
        excel: 'text-green-500',
        powerpoint: 'text-yellow-500'
      }
      return colors[type] || 'text-gray-500'
    },
    getTypeIcon(type) {
      const icons = {
        pdf: 'mdi:file-pdf',
        word: 'mdi:file-word',
        presentation: 'mdi:file-presentation',
        excel: 'mdi:file-excel',
        powerpoint: 'mdi:file-powerpoint'
      }
      return icons[type] || 'mdi:file'
    },
    async toggleResourceCommentLike(comment) {
      if (!this.$store.getters.isAuthenticated) {
        this.$root?.$emit?.('message', '请先登录后再点赞', 'error')
        return
      }
      const id = comment.id
      try {
        if (comment.liked) {
          await this.$store.dispatch('unlikeResourceComment', id)
          this.$root?.$emit?.('message', '已取消点赞', 'success')
        } else {
          await this.$store.dispatch('likeResourceComment', id)
          this.$root?.$emit?.('message', '已点赞', 'success')
        }
      } catch (error) {
        const status = error?.response?.status
        const msg = error?.response?.data?.message || error?.message || '操作失败'
        console.error('资源评论点赞操作失败:', { id, likedBefore: comment.liked, status, msg })
        this.$root?.$emit?.('message', msg, 'error')
      }
    },
  },
  async created() {
    // 若未选择资源，默认选第一条
    if (!this.selectedResource && this.$store.state.resources?.length > 0) {
      this.$store.commit('SET_SELECTED_RESOURCE', this.$store.state.resources[0])
    }
  }
}
</script>