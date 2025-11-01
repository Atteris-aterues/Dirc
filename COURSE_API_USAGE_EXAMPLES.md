# 课程详情API使用示例

## 获取课程详情接口参数说明

### 接口地址
```
GET /courses/:id
```

### Path参数
- **id** (必填): 课程ID，整数类型

### Query参数
- **include** (可选): 包含的关联数据，多个值用逗号分隔
  - `reviews`: 包含课程评价
  - `resources`: 包含相关资源
  - `students`: 包含选课学生信息
  - `all`: 包含所有关联数据
- **userId** (可选): 当前用户ID，用于获取用户相关的课程信息

### 请求头
- **Authorization** (可选): `Bearer <token>`，用于获取个性化信息

## 使用示例

### 1. 基本课程信息
```javascript
// 只获取课程基本信息
const course = await courseAPI.getCourseById(1)
```

### 2. 包含评价的课程详情
```javascript
// 获取课程详情，包含用户评价
const courseWithReviews = await courseAPI.getCourseById(1, {
  include: 'reviews'
})
```

### 3. 包含所有关联数据
```javascript
// 获取完整的课程详情，包含所有关联数据
const fullCourseDetails = await courseAPI.getCourseById(1, {
  include: 'all'
})
```

### 4. 获取用户相关的课程信息
```javascript
// 获取课程详情，包含用户是否已选课、已收藏等信息
const userCourseInfo = await courseAPI.getCourseById(1, {
  include: 'reviews,resources',
  userId: 'S20201234'
})
```

### 5. 在Vue组件中使用
```javascript
// 在Vue组件中
export default {
  data() {
    return {
      course: null,
      loading: false
    }
  },
  async created() {
    await this.loadCourseDetails()
  },
  methods: {
    async loadCourseDetails() {
      this.loading = true
      try {
        // 获取完整的课程详情
        const response = await this.$store.dispatch('fetchCourseById', {
          courseId: this.$route.params.id,
          params: {
            include: 'all',
            userId: this.$store.state.currentUser?.id
          }
        })
        this.course = response
      } catch (error) {
        console.error('加载课程详情失败:', error)
      } finally {
        this.loading = false
      }
    }
  }
}
```

### 6. 在Vuex Store中使用
```javascript
// 在store的actions中
async fetchCourseById({ commit }, { courseId, params = {} }) {
  try {
    commit('SET_LOADING', { key: 'courses', value: true })
    const response = await courseAPI.getCourseById(courseId, params)
    commit('SET_SELECTED_COURSE', response.data)
    return response.data
  } catch (error) {
    throw error
  } finally {
    commit('SET_LOADING', { key: 'courses', value: false })
  }
}
```

## 响应数据结构

### 基本响应
```json
{
  "code": 200,
  "message": "获取课程详情成功",
  "data": {
    "id": 1,
    "title": "计算机科学导论",
    "instructor": "张教授",
    "college": "计算机学院",
    "rating": 4.2,
    "credits": 3,
    "description": "课程描述...",
    "image": "/images/courses/computer-science.svg"
  }
}
```

### 包含关联数据的响应
```json
{
  "code": 200,
  "message": "获取课程详情成功",
  "data": {
    "id": 1,
    "title": "计算机科学导论",
    "instructor": "张教授",
    "college": "计算机学院",
    "rating": 4.2,
    "credits": 3,
    "description": "课程描述...",
    "image": "/images/courses/computer-science.svg",
    "schedule": {
      "semester": "2024春季",
      "time": "周一 8:00-10:00",
      "location": "教学楼A101"
    },
    "requirements": ["高等数学", "线性代数"],
    "objectives": ["掌握基本概念", "培养编程思维"],
    "isEnrolled": false,
    "isFavorite": false,
    "reviews": [
      {
        "id": 1,
        "author": "张同学",
        "rating": 5,
        "content": "课程内容很实用",
        "date": "2024-01-15"
      }
    ],
    "resources": [
      {
        "id": 1,
        "title": "课程讲义",
        "type": "pdf",
        "downloads": 156,
        "size": "2.5MB"
      }
    ],
    "statistics": {
      "totalStudents": 120,
      "averageRating": 4.2,
      "totalResources": 15,
      "totalDownloads": 1250
    }
  }
}
```

## 常见使用场景

### 1. 课程列表页点击查看详情
```javascript
// 只需要基本信息
const course = await courseAPI.getCourseById(courseId)
```

### 2. 课程详情页
```javascript
// 需要完整信息，包括评价和资源
const course = await courseAPI.getCourseById(courseId, {
  include: 'reviews,resources',
  userId: currentUserId
})
```

### 3. 管理员查看课程
```javascript
// 管理员需要看到选课学生信息
const course = await courseAPI.getCourseById(courseId, {
  include: 'all'
})
```

### 4. 移动端优化
```javascript
// 移动端可能只需要基本信息，减少数据传输
const course = await courseAPI.getCourseById(courseId, {
  include: 'reviews' // 只包含评价，不包含资源列表
})
```

## 错误处理

```javascript
try {
  const course = await courseAPI.getCourseById(999, {
    include: 'all'
  })
} catch (error) {
  if (error.response?.status === 404) {
    console.log('课程不存在')
  } else if (error.response?.status === 401) {
    console.log('需要登录')
  } else {
    console.log('获取课程详情失败:', error.message)
  }
}
```

