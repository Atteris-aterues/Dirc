import api from './index'

// 资源相关API
export const resourceAPI = {
  // 获取资源列表
  getResources(params = {}) {
    return api.get('/resources', { params })
  },

  // 获取资源详情
  getResourceById(id) {
    return api.get(`/resources/${id}`)
  },

  // 搜索资源
  searchResources(keyword, filters = {}) {
    return api.get('/resources/search', {
      params: { keyword, ...filters }
    })
  },

  // 上传资源
  uploadResource(resourceData) {
    return api.post('/resources', resourceData)
  },

  // 更新资源信息
  updateResource(id, resourceData) {
    return api.put(`/resources/${id}`, resourceData)
  },

  // 删除资源
  deleteResource(id) {
    return api.delete(`/resources/${id}`)
  },

  // 下载资源
  downloadResource(id) {
    return api.get(`/resources/${id}/download`, {
      responseType: 'blob'
    })
  },

  // 获取资源评价
  getResourceReviews(resourceId, params = {}) {
    return api.get(`/resources/${resourceId}/reviews`, { params })
  },

  // 获取资源评论（支持分页 params & 回退到 reviews 路径）
  getResourceComments(resourceId, params = {}, config = {}) {
    const cfg = { params, ...(config || {}) }
    return api.get(`/resources/${resourceId}/comments`, cfg).catch((err) => {
      const status = err?.response?.status
      if (status === 404 || status === 405) {
        console.warn('[getResourceComments] /resources/:id/comments 未实现，尝试 /resource_comments?resourceId=:id', { resourceId })
        const cfg2 = { params: { resourceId, ...(params || {}) }, ...(config || {}) }
        return api.get('/resource_comments', cfg2).catch((err2) => {
          const s2 = err2?.response?.status
          if (s2 === 404 || s2 === 405) {
            console.warn('[getResourceComments] /resource_comments 未实现，尝试 /resources_comments?resourceId=:id', { resourceId })
            return api.get('/resources_comments', cfg2).catch((err3) => {
              const s3 = err3?.response?.status
              if (s3 === 404 || s3 === 405) {
                console.warn('[getResourceComments] 所有评论路径未实现，尝试 /resources/:id/reviews', { resourceId })
                return api.get(`/resources/${resourceId}/reviews`, cfg)
              }
              return Promise.reject(err3)
            })
          }
          return Promise.reject(err2)
        })
      }
      return Promise.reject(err)
    })
  },



  // 提交资源评论（兼容后端 /resource_comments/ 路径）
  // commentData 可以是浏览器的 FormData 或 node 的 form-data 实例
  submitResourceComment(commentData, config = {}) {
    const cfg = { ...(config || {}) }
    // 如果是 node 的 form-data，它会提供 getHeaders()
    if (commentData && typeof commentData.getHeaders === 'function') {
      cfg.headers = { ...(cfg.headers || {}), ...commentData.getHeaders() }
    }
    return api.post('/resource_comments', commentData, cfg)
  },

  // 提交资源评分（兼容后端 /resource_ratings/ 路径）
  // ratingData 可以是浏览器的 FormData 或 node 的 form-data 实例
  submitResourceRating(ratingData, config = {}) {
    const cfg = { ...(config || {}) }
    // 如果是 node 的 form-data，它会提供 getHeaders()
    if (ratingData && typeof ratingData.getHeaders === 'function') {
      cfg.headers = { ...(cfg.headers || {}), ...ratingData.getHeaders() }
    }
    return api.post('/resource_ratings', ratingData, cfg)
  },

  // 删除资源评分
  // 支持两种用法：
  //  - deleteResourceRating(ratingId) -> DELETE /resource_ratings/:id
  //  - deleteResourceRating() -> DELETE /resource_ratings (后端根据 token 删除当前用户的评分或批量删除)
  deleteResourceRating(ratingId, config = {}) {
    const cfg = { ...(config || {}) }
    if (ratingId) {
      return api.delete(`/resource_ratings/${ratingId}`, cfg)
    }
    return api.delete('/resource_ratings', cfg)
  },

  // 删除资源评论
  // 用法：
  //  - deleteResourceComment(commentId) -> DELETE /resource_comments/:id
  //  - deleteResourceComment(null, params) -> DELETE /resource_comments?...
  // 同时对路径 /resources_comments 做回退兼容
  deleteResourceComment(commentId, params = {}, config = {}) {
    const cfg = { ...(config || {}) }
    if (commentId) {
      return api.delete(`/resource_comments/${commentId}`, cfg).catch((err) => {
        const status = err?.response?.status
        if (status === 404 || status === 405) {
          return api.delete(`/resources_comments/${commentId}`, cfg)
        }
        return Promise.reject(err)
      })
    }
    const cfgWithParams = { params: params || {}, ...(config || {}) }
    return api.delete('/resource_comments', cfgWithParams).catch((err) => {
      const status = err?.response?.status
      if (status === 404 || status === 405) {
        return api.delete('/resources_comments', cfgWithParams)
      }
      return Promise.reject(err)
    })
  },
  likeResourceComment(commentId, config = {}) {
    return api.post(`/resource_comments/${commentId}/like`, null, config)
  },
  unlikeResourceComment(commentId, config = {}) {
    return api.delete(`/resource_comments/${commentId}/like`, config)
  },
  // 获取我的资源
  getMyResources() {
    return api.get('/resources/my-resources')
  },

  // 获取收藏的资源
  getFavoriteResources() {
    return api.get('/resources/favorites')
  },

  // 收藏/取消收藏资源
  toggleFavorite(resourceId) {
    return api.post(`/resources/${resourceId}/favorite`)
  },

  // 获取资源统计
  getResourceStats(resourceId) {
    return api.get(`/resources/${resourceId}/stats`)
  }
}

