# 土壤信息服务平台

基于 Vue.js 和 OpenLayers 开发的土壤信息服务平台，提供土壤数据可视化、空间分析和查询功能。

## 功能特点

### 1. 地图可视化
- 多源底图切换（矢量图、影像图、地形图）
- WMS 图层展示（有效磷、有机质分布）
- 图层控制工具栏
- 图例动态显示

### 2. 空间分析
- 交互式绘图工具（圆形、多边形）
- 面积自动计算
- 空间范围查询
- 查询结果过滤（pH值）
- 面积统计分析

### 3. 土壤要素查询
- 多条件组合查询
- 数据表格展示
- 字段排序功能
- 分页显示

### 4. 数据展示
- 分类数据展示
- 多级表头结构
- 数据过滤功能
- 实时统计功能

## 技术栈

- Vue.js 2.x
- Element UI
- OpenLayers 6.x
- Axios
- Vue Router

## 安装说明

### 环境要求
- Node.js >= 12.x (推荐 18.12.1)
- npm >= 6.x

### 安装步骤

1. 克隆项目
```bash
git clone [项目地址]
cd fujian-soil-platform
```

2. 安装依赖
```bash
npm install
```

3. 启动开发服务器
```bash
npm run serve
```

4. 生产环境构建
```bash
npm run build
```

### Docker 部署

本项目支持 Docker 环境部署，使用 Node.js 18.12.1 版本。

#### 远程部署docker镜像
```bash
   # 拉取镜像
   docker pull lukesupercoder/soil-platform:latest
   
   # 运行容器
   docker run -d -p 80:80 lukesupercoder/soil-platform:latest
   
   # 或者使用docker-compose
   export DOCKER_USERNAME=你的用户名
   docker-compose up -d app-prod
```

#### 开发环境

```bash
# 启动开发环境
docker-compose up app-dev

# 后台运行
docker-compose up -d app-dev
```

#### 生产环境

```bash
# 构建并启动生产环境
docker-compose up --build app-prod

# 后台运行
docker-compose up -d app-prod

# 仅构建镜像
docker-compose build app-prod

# 停止服务
docker-compose down
```

#### 自定义配置

可通过修改 `docker-compose.yml` 文件自定义端口映射和环境变量。

## 项目配置

### 开发环境配置
- 默认开发服务器端口：8080
- API 服务器地址：在 `.env` 文件中配置

### 生产环境配置
- 在 `.env.production` 文件中配置生产环境变量
- 可通过 `vue.config.js` 自定义构建配置

## 使用说明

### 1. 地图操作
- 底图切换：使用右上角工具栏的底图切换按钮
- 图层控制：在图层管理标签页中控制专题图层显示
- 图例查看：地图右下角显示当前图层图例

### 2. 空间分析
- 选择绘图工具（圆形/多边形）
- 在地图上进行绘制
- 自动显示面积计算结果
- 弹窗展示查询结果
- 使用 pH 值过滤器筛选数据

### 3. 土壤要素查询
- 设置查询条件（省份、城市、县区等）
- 设置数值范围（pH值、有机质等）
- 点击查询按钮获取结果
- 使用表格工具进行排序和过滤

## 注意事项

1. 确保 GeoServer 服务正常运行
2. 检查天地图密钥配置
3. 注意浏览器兼容性（推荐使用 Chrome 或 Firefox）
4. 大数据量查询可能需要较长响应时间

## 开发团队

- 前端开发：[开发者信息]
- 技术支持：[支持团队信息]
- 联系方式：[联系方式]

## License

[授权信息]
