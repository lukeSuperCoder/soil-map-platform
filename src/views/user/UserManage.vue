<template>
  <div class="user-manage">
    <div class="header">
      <el-button type="primary" @click="handleAdd">新增用户</el-button>
    </div>
    
    <!-- 用户列表 -->
    <el-table
      :data="userList"
      border
      v-loading="loading"
      style="width: 100%; margin-top: 20px;">
      <el-table-column prop="username" label="用户名" width="120"></el-table-column>
      <el-table-column prop="realName" label="真实姓名" width="120"></el-table-column>
      <el-table-column prop="phone" label="手机号码" width="120"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="status" label="状态" width="100">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status === 1 ? 'success' : 'danger'">
            {{ scope.row.status === 1 ? '启用' : '禁用' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="180">
        <template slot-scope="scope">
          {{ new Date(scope.row.createTime).toLocaleString() }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button 
            type="text" 
            style="margin-left: 10px; color: #F56C6C"
            @click="handleDelete(scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 新增/编辑用户对话框 -->
    <el-dialog 
      :title="dialogType === 'add' ? '新增用户' : '编辑用户'" 
      :visible.sync="dialogVisible"
      width="500px">
      <el-form 
        :model="userForm" 
        :rules="rules" 
        ref="userForm" 
        label-width="100px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" v-if="dialogType === 'add'">
          <el-input v-model="userForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" prop="realName">
          <el-input v-model="userForm.realName"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="userForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="userForm.email"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-switch
            v-model="userForm.status"
            :active-value="1"
            :inactive-value="0">
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm" :loading="submitLoading">
          确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getUserList, addUser, updateUser, deleteUser } from '@/api/user'

export default {
  name: 'UserManage',
  data() {
    return {
      userList: [],
      loading: false,
      dialogVisible: false,
      dialogType: 'add', // add or edit
      submitLoading: false,
      userForm: {
        username: '',
        password: '',
        realName: '',
        phone: '',
        email: '',
        status: 1
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ],
        realName: [
          { required: true, message: '请输入真实姓名', trigger: 'blur' }
        ],
        phone: [
          { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }
        ],
        email: [
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.fetchUserList()
  },
  methods: {
    // 获取用户列表
    async fetchUserList() {
      this.loading = true
      try {
        const res = await getUserList()
        this.userList = res.data
      } catch (error) {
        this.$message.error('获取用户列表失败')
      } finally {
        this.loading = false
      }
    },
    // 打开新增用户对话框
    handleAdd() {
      this.dialogType = 'add'
      this.userForm = {
        username: '',
        password: '',
        realName: '',
        phone: '',
        email: '',
        status: 1
      }
      this.dialogVisible = true
    },
    // 打开编辑用户对话框
    handleEdit(row) {
      this.dialogType = 'edit'
      this.userForm = { ...row }
      delete this.userForm.password // 编辑时不修改密码
      this.dialogVisible = true
    },
    // 删除用户
    handleDelete(row) {
      this.$confirm('确认删除该用户吗？', '提示', {
        type: 'warning'
      }).then(async () => {
        try {
          await deleteUser(row.id)
          this.$message.success('删除成功')
          this.fetchUserList()
        } catch (error) {
          this.$message.error('删除失败')
        }
      }).catch(() => {})
    },
    // 提交表单
    submitForm() {
      this.$refs.userForm.validate(async valid => {
        if (valid) {
          this.submitLoading = true
          try {
            if (this.dialogType === 'add') {
              await addUser(this.userForm)
              this.$message.success('添加成功')
            } else {
              await updateUser(this.userForm)
              this.$message.success('更新成功')
            }
            this.dialogVisible = false
            this.fetchUserList()
          } catch (error) {
            this.$message.error(this.dialogType === 'add' ? '添加失败' : '更新失败')
          } finally {
            this.submitLoading = false
          }
        }
      })
    }
  }
}
</script>

<style scoped>
.user-manage {
  padding: 20px;
}

.header {
  display: flex;
  justify-content: flex-end;
}

.el-dialog {
  border-radius: 8px;
}

.dialog-footer {
  text-align: right;
}
</style> 