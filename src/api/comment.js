import api from './index'

// 评论相关 API
export const commentAPI = {
  // 点赞评论
  // 用法：
  //  - likeComment(commentId) -> POST /comments/:id/likes
  //  - likeComment(null, data) -> POST /comments/likes (body 包含 commentId 或其他信息)
  likeComment(commentId, data = {}, config = {}) {
    const cfg = { ...(config || {}) }
    if (commentId) {
      return api.post(`/comments/${commentId}/likes`, data, cfg)
    }
    return api.post('/comments/likes', data, cfg)
  },

  // 取消点赞
  // 用法：
  //  - unlikeComment(commentId) -> DELETE /comments/:id/likes
  //  - unlikeComment(null, data) -> DELETE /comments/likes (body 或 query 参数由 data 指定)
  unlikeComment(commentId, data = {}, config = {}) {
    const cfg = { ...(config || {}) }
    if (commentId) {
      return api.delete(`/comments/${commentId}/likes`, cfg)
    }
    // axios 支持在 delete 请求的 config 中传 data
    cfg.data = data || {}
    return api.delete('/comments/likes', cfg)
  }
}

export default commentAPI
