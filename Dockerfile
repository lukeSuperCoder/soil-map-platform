# 基础镜像使用 node:18.12.1
FROM node:18.12.1-alpine

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装依赖
RUN npm install

# 复制源代码
COPY . .

# 设置构建参数
ARG NODE_ENV=production

# 构建应用
RUN npm run build

# 使用 nginx 来提供静态内容
FROM nginx:stable-alpine

# 从构建阶段复制构建结果到 nginx 容器
COPY --from=0 /app/dist /usr/share/nginx/html

# 复制 nginx 配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 暴露 80 端口
EXPOSE 80

# 启动 nginx
CMD ["nginx", "-g", "daemon off;"] 