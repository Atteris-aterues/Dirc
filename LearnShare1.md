---
title: 默认模块
language_tabs:
  - shell: Shell
  - http: HTTP
  - javascript: JavaScript
  - ruby: Ruby
  - python: Python
  - php: PHP
  - java: Java
  - go: Go
toc_footers: []
includes: []
search: true
code_clipboard: true
highlight_theme: darkula
headingLevel: 2
generator: "@tarslib/widdershins v4.0.30"

---

# 默认模块

Base URLs:

# Authentication

# 课程

## GET 搜索课程

GET /api/courses/search

获取课程列表，支持按学院、专业、年级、学分、评分等进行筛选和搜索。

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|keywords|query|string| 否 |搜索关键词（课程名或教师名）|
|collegeId|query|integer| 否 |学院ID|
|grade|query|string| 否 |年级|
|minRating|query|number(float)| 否 |最小综合评分|
|page_size|query|integer| 是 |页面大小|
|page_num|query|integer| 是 |页码|

> 返回示例

> 200 Response

```json
{
  "baseResponse": {
    "code": 0,
    "message": "string"
  },
  "courses": [
    {
      "courseId": 0,
      "courseName": "string",
      "teacherId": 0,
      "credit": 0,
      "majorId": 0,
      "grade": "string",
      "description": "string",
      "createdAt": 0,
      "updatedAt": 0
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功获取课程列表|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» baseResponse|object|true|none||none|
|»» code|integer|true|none||none|
|»» message|string|true|none||none|
|» courses|[object]|true|none||none|
|»» courseId|integer|true|none||none|
|»» courseName|string|true|none||none|
|»» teacherId|integer|true|none||none|
|»» credit|integer|true|none||none|
|»» majorId|integer|true|none||none|
|»» grade|string|true|none||none|
|»» description|string|true|none||none|
|»» createdAt|integer|true|none||none|
|»» updatedAt|integer|true|none||none|

## GET 获取课程详情

GET /api/courses/{course_id}

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|course_id|path|string| 是 |none|

> 返回示例

> 200 Response

```json
{
  "baseResponse": {
    "code": 0,
    "message": "string"
  },
  "course": {
    "courseId": 0,
    "courseName": "string",
    "teacherId": 0,
    "credit": 0,
    "majorId": 0,
    "grade": "string",
    "description": "string",
    "createdAt": 0,
    "updatedAt": 0
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功获取课程详情|Inline|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|课程不存在|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» baseResponse|object|true|none||none|
|»» code|integer|true|none||none|
|»» message|string|true|none||none|
|» course|object|true|none||none|
|»» courseId|integer|true|none||none|
|»» courseName|string|true|none||none|
|»» teacherId|integer|true|none||none|
|»» credit|integer|true|none||none|
|»» majorId|integer|true|none||none|
|»» grade|string|true|none||none|
|»» description|string|true|none||none|
|»» createdAt|integer|true|none||none|
|»» updatedAt|integer|true|none||none|

## GET 获取课程资源列表

GET /api/courses/{course_id}/resources

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|course_id|path|string| 是 |none|
|page_num|query|number| 是 |页码|
|page_size|query|number| 是 |每页数量|
|type|query|string| 否 |资源类型|
|status|query|string| 否 |资源状态|

> 返回示例

> 200 Response

```json
{
  "baseResponse": {
    "code": 0,
    "message": "string"
  },
  "resources": [
    {
      "resourceId": 0,
      "title": "string",
      "description": "string",
      "filePath": "string",
      "fileType": "string",
      "fileSize": 0,
      "uploaderId": 0,
      "courseId": 0,
      "downloadCount": 0,
      "averageRating": 0,
      "ratingCount": 0,
      "status": 0,
      "createdAt": 0
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» baseResponse|object|true|none||none|
|»» code|integer|true|none||none|
|»» message|string|true|none||none|
|» resources|[object]|true|none||none|
|»» resourceId|integer|false|none||none|
|»» title|string|false|none||none|
|»» description|string|false|none||none|
|»» filePath|string|false|none||none|
|»» fileType|string|false|none||none|
|»» fileSize|integer|false|none||none|
|»» uploaderId|integer|false|none||none|
|»» courseId|integer|false|none||none|
|»» downloadCount|integer|false|none||none|
|»» averageRating|integer|false|none||none|
|»» ratingCount|integer|false|none||none|
|»» status|integer|false|none||none|
|»» createdAt|integer|false|none||none|

# 数据模型
---
title: 默认模块
language_tabs:
  - shell: Shell
  - http: HTTP
  - javascript: JavaScript
  - ruby: Ruby
  - python: Python
  - php: PHP
  - java: Java
  - go: Go
toc_footers: []
includes: []
search: true
code_clipboard: true
highlight_theme: darkula
headingLevel: 2
generator: "@tarslib/widdershins v4.0.30"

---

# 默认模块

Base URLs:

# Authentication

# 资源

## GET 搜索资源

GET /api/resources/search

获取资源列表，支持按标签、课程、下载量/评分排序。

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|keyword|query|string| 否 |搜索关键词|
|tagId|query|integer| 否 |标签ID|
|sortBy|query|string| 否 |排序方式：latest (最新), hot (下载量), rating (评分)|
|course_id|query|string| 否 |课程ID|
|page_size|query|integer| 是 |页面大小|
|page_num|query|integer| 是 |页码|

#### 枚举值

|属性|值|
|---|---|
|sortBy|latest|
|sortBy|hot|
|sortBy|rating|

> 返回示例

> 200 Response

```json
{
  "baseResp": {
    "code": 0,
    "message": "string"
  },
  "resources": [
    {
      "resourceId": 0,
      "title": "string",
      "description": "string",
      "filePath": "string",
      "fileType": "string",
      "fileSize": 0,
      "uploaderId": 0,
      "courseId": 0,
      "downloadCount": 0,
      "averageRating": 0,
      "ratingCount": 0,
      "status": 0,
      "createdAt": 0,
      "tags": [
        {
          "tagId": 0,
          "tagName": "string"
        }
      ]
    }
  ],
  "total": 0
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功获取资源列表|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» baseResp|object|true|none||none|
|»» code|integer|true|none||none|
|»» message|string|true|none||none|
|» resources|[object]|true|none||none|
|»» resourceId|integer|false|none||none|
|»» title|string|false|none||none|
|»» description|string|false|none||none|
|»» filePath|string|false|none||none|
|»» fileType|string|false|none||none|
|»» fileSize|integer|false|none||none|
|»» uploaderId|integer|false|none||none|
|»» courseId|integer|false|none||none|
|»» downloadCount|integer|false|none||none|
|»» averageRating|number|false|none||none|
|»» ratingCount|integer|false|none||none|
|»» status|integer|false|none||none|
|»» createdAt|integer|false|none||none|
|»» tags|[object]|false|none||none|
|»»» tagId|integer|true|none||none|
|»»» tagName|string|true|none||none|
|» total|integer|true|none||none|

## POST 上传课程资源

POST /api/resources

用户上传课程资源文件。仅支持 .pdf, .docx, .pptx, .zip，最大3MB。上传后资源进入待审核或直接发布。

> Body 请求参数

```yaml
file: ""
title: ""
description: ""
course_id: 0
tags: ""

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 是 |none|
|body|body|object| 否 |none|
|» file|body|string(binary)| 是 |资源文件 (最大3MB)|
|» title|body|string| 是 |资源标题|
|» description|body|string| 否 |资源简介 (可选)|
|» course_id|body|integer| 是 |关联课程ID|
|» tags|body|[string]| 否 |资源标签 (例如: 期末复习资料)|

> 返回示例

> 201 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|上传成功，资源已直接发布|Inline|
|202|[Accepted](https://tools.ietf.org/html/rfc7231#section-6.3.3)|上传成功，资源进入审核流程|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|文件类型/大小不符合要求|Inline|

### 返回数据结构

## GET 下载课程资源

GET /api/resources/{resource_id}/download

记录下载日志，增加上传者信誉分，并返回资源下载链接。

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|resource_id|path|string| 是 |none|
|Authorization|header|string| 是 |none|

> 返回示例

> 200 Response

```json
{
  "download_url": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|下载成功，返回资源链接|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» download_url|string(url)|false|none||none|

## POST 举报资源

POST /api/report/resources/{resource_id}

用户举报违规、低质量或侵权的资源。

> Body 请求参数

```yaml
content: 涉黄

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|resource_id|path|string| 是 |none|
|Authorization|header|string| 是 |none|
|body|body|object| 否 |none|
|» content|body|string| 否 |none|

> 返回示例

> 202 Response

```json
{}
```

> 404 Response

```
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|202|[Accepted](https://tools.ietf.org/html/rfc7231#section-6.3.3)|举报提交成功，进入审核队列|Inline|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|none|Inline|

### 返回数据结构

## GET 获取资源信息

GET /api/resources/{resource_id}

获取单个资源的基本信息，如描述，上传者等

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|resource_id|path|string| 是 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

# 数据模型



