<template>
    <div class="about">
      <el-table :data="items">
        <el-table-column prop="._id" label="ID" width="200"></el-table-column>
        <el-table-column prop="title" label="标题" ></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" @click="$router.push(`/indexArticles/edit/${scope.row._id}`)" size="small">编辑</el-button>
          <el-button type="text" @click="myDelete(scope.row)"  size="small">删除</el-button>
          <!--scope.row为行,记得这么写router.push内用反引号-->
        </template>
      </el-table-column>
      </el-table>
    </div>
</template>
<script>
export default{
  data() {
    return {
      items:[]
    }
  },
  methods: {
    async myDelete(row){
      this.$confirm(`是否永久删除"${row.name}"`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then( async () => {
          await this.$http.delete(`rest/indexArticles/delete/${row._id}`)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.fetch()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })          
        })
      
    },
    async fetch(){
      const res=await this.$http.get('rest/indexArticles')
      this.items=res.data
    },
    
  },
  //created在模板渲染成html前调用，即通常初始化某些属性值，然后再渲染成视图。
  created() {
    this.fetch()
  },
}

</script>
