<template>
  <el-container class="main-container">
    <!-- 顶部标题栏 -->
    <el-header height="60px">
      <div class="header-title">
        福建省土壤信息服务平台
      </div>
      <div class="header-right">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            {{ userInfo.realName }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    
    <el-container>
      <!-- 左侧侧边栏 -->
      <el-aside width="250px">
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          router>
          <el-menu-item index="/">
            <i class="el-icon-map-location"></i>
            <span slot="title">土壤分布</span>
          </el-menu-item>
          <el-menu-item index="/soil/element-query">
            <i class="el-icon-search"></i>
            <span slot="title">土壤要素查询</span>
          </el-menu-item>
          <el-menu-item index="/user">
            <i class="el-icon-user"></i>
            <span slot="title">用户管理</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      
      <!-- 中间内容区域 -->
      <el-main>
        <router-view v-if="$route.path !== '/'"></router-view>
        <soil-map v-else></soil-map>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import SoilMap from './soil/SoilMap.vue'

export default {
  name: 'Home',
  components: {
    SoilMap
  },
  data() {
    return {
      userInfo: JSON.parse(localStorage.getItem('userInfo')) || {}
    }
  },
  mounted() {
    if (this.$route.path === '/') {

    }
  },
  methods: {
    handleCommand(command) {
      if (command === 'logout') {
        localStorage.removeItem('isLogin')
        localStorage.removeItem('userInfo')
        this.$router.push('/login')
        this.$message.success('已退出登录')
      }
    }
  }
}
</script>

<style scoped>
.main-container {
  height: 100%;
}

.el-header {
  background-color: #409EFF;
  color: white;
  line-height: 60px;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-title {
  font-size: 20px;
  font-weight: bold;
}

.header-right {
  color: white;
}

.el-dropdown-link {
  cursor: pointer;
  color: white;
}

.el-aside {
  background-color: #545c64;
}

.el-menu {
  border-right: none;
}

.el-main {
  padding: 0;
  background-color: #f0f2f5;
  height: calc(100vh - 60px);
}

.map-container {
  width: 100%;
  height: 100%;
  background-color: white;
}
</style> 