
<template>
    <div class="about">
      <h1>{{id?'编辑':'新建'}}分类</h1><!--有id显示编辑，没有显示新建 -->
        <el-form @submit.native.prevent="save"><!--表单 -->
          <el-form-item label="上级分类">   
              <el-select v-model="model.parent">\
                <el-option v-for="item in parents" :key="item.id" :label="item.name" :value="item._id"></el-option>
              </el-select>
          </el-form-item>
        <el-form-item label="名称">   
   <el-input v-model="model.name"></el-input>
        </el-form-item>
        <el-form-item >
      <el-button type="primary" native-type="submit">保存</el-button>
        </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default{
  props:{
     id:{}
  },
  data(){
    return{
      model:{},
      parents:[]
    }
  },
  methods: {
    async save(){
        //  let res
      if (this.id) {
        await this.$http.put(`rest/categories/${this.id}`,this.model)
      }else{
        await this.$http.post('rest/categories',this.model)
       }
       this.$router.push('/categories/list')
      this.$message({
        type:"success",
        message:'保存成功'
      })
    },
    async fetch(){
      const res=await this.$http.get(`rest/categories/${this.id}`)//get到一个对象
      this.model=res.data
    },
    async fetchParents(){
      const res=await this.$http.get(`rest/categories`)//get到一些对象，将它们存到数组中，再取出使用
      this.parents=res.data
    }
  },
  created(){ 
    this.fetchParents()
     this.id && this.fetch()  //前面条件满足后执行后面语句
  }

}

</script>

<template>
    <div class="about">
      <h1>{{id?'编辑':'新建'}}分类</h1><!--有id显示编辑，没有显示新建 -->
        <el-form @submit.native.prevent="save"><!--表单 -->
          <el-form-item label="上级分类">   
              <el-select v-model="model.parent">\
                <el-option v-for="item in parents" :key="item.id" :label="item.name" :value="item._id"></el-option>
              </el-select>
          </el-form-item>
        <el-form-item label="名称">   
   <el-input v-model="model.name"></el-input>
        </el-form-item>
        <el-form-item >
      <el-button type="primary" native-type="submit">保存</el-button>
        </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default{
  props:{
     id:{}
  },
  data(){
    return{
      model:{},
      parents:[]
    }
  },
  methods: {
    async save(){
        //  let res
      if (this.id) {
        await this.$http.put(`rest/categories/${this.id}`,this.model)
      }else{
        await this.$http.post('rest/categories',this.model)
       }
       this.$router.push('/categories/list')
      this.$message({
        type:"success",
        message:'保存成功'
      })
    },
    async fetch(){
      const res=await this.$http.get(`rest/categories/${this.id}`)//get到一个对象
      this.model=res.data
    },
    async fetchParents(){
      const res=await this.$http.get(`rest/categories`)//get到一些对象，将它们存到数组中，再取出使用
      this.parents=res.data
      console.log(this.parents)
    }
  },
  created(){ 
    this.fetchParents()
     this.id && this.fetch()  //前面条件满足后执行后面语句
  }

}

</script>
