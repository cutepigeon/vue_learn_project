
<template>
    <div class="about">
      <h1>{{id?'编辑':'新建'}}英雄</h1><!--有id显示编辑，没有显示新建 -->
      <el-form label-width="120px"  @submit.native.prevent="save"><!--表单,设置表单中label的宽度 -->
        <el-tabs type="border-card" value="basic"><!--默认选中value对应的name -->
          <el-tab-pane label="基础信息" name="basic">
              <el-form-item label="名称">   
                <el-input v-model="model.name"></el-input>
              </el-form-item>
              <el-form-item label="称号">   
                <el-input v-model="model.title"></el-input>
              </el-form-item >
              <el-form-item label="头像">   
                <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :headers="getAuthHeaders()"
              :show-file-list="false"
              :on-success="afterUpload">
              <img v-if="model.avatar" :src="model.avatar" class="avatar">
               <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                 </el-upload>
                </el-form-item>  
                 <el-form-item label="背景图">
                 <el-upload
                 class="avatar-uploader"
                 :action="uploadUrl"
                 :headers="getAuthHeaders()"
                 :show-file-list="false"
                 :on-success="res=>$set(model,'banner',res.url)">
                 <img v-if="model.banner" :src="model.banner" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                  </el-form-item>
                   
              <el-form-item label="类型">
               <el-select  v-model="model.categories" multiple ><!--加multiple变多选 -->
                 <el-option v-for="item in categories" :key="item._id" :label="item.name" :value="item._id"></el-option>
               </el-select><!--有_id才能实现name的渲染-->
              </el-form-item>
              <el-form-item label="难度">   
                <el-rate :max="9" v-model="model.scores.difficult" style="margin-top:0.6rem"></el-rate>
              </el-form-item >
              <el-form-item label="技能">   
                <el-rate :max="9" v-model="model.scores.skills" style="margin-top:0.6rem"></el-rate>
              </el-form-item >
              <el-form-item label="攻击">   
                <el-rate :max="9" v-model="model.scores.attack" style="margin-top:0.6rem"></el-rate>
              </el-form-item >
              <el-form-item label="生存">   
                <el-rate :max="9" v-model="model.scores.survive" style="margin-top:0.6rem"></el-rate>
              </el-form-item >
              <el-form-item label="顺风出装">
                <el-select  v-model="model.items1" multiple ><!--加multiple变多选 -->
                  <el-option v-for="item in items1" :key="item._id" :label="item.name" :value="item._id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="逆风出装">
                <el-select  v-model="model.items2" multiple ><!--加multiple变多选 -->
                  <el-option v-for="item in items2" :key="item._id" :label="item.name" :value="item._id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="使用技巧">
                <el-input v-model="model.usageTips"  type="textarea"></el-input>
              </el-form-item>
              <el-form-item label="对抗技巧">
                <el-input v-model="model.battleTips"  type="textarea"></el-input>
              </el-form-item>
              <el-form-item label="团战思路">
                <el-input v-model="model.teamTips"  type="textarea"></el-input>
              </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="技能信息" name="skills">
            <el-button size="small" type="text" @click="model.skills.push({})"><i class="el-icon-plus" ></i>  添加技能 </el-button>
            <el-row type="flex" style="flex-wrap: wrap" ><!--flex-wrap让弹性盒元素在必要的时候拆行-->
              <el-col :md="12" v-for="(item,i) in model.skills" :key="i">
                <el-form-item label="名称" >
                  <el-input v-model="item.name"></el-input>
                </el-form-item>
                <el-form-item label="图标">
                  <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :headers="getAuthHeaders()"
              :show-file-list="false"
              :on-success="res=>$set(item,'icon',res.url)">
              <img v-if="item.icon" :src="item.icon" class="avatar">
               <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                 </el-upload>
                </el-form-item>
                <el-form-item label="冷却" >
                    <el-input v-model="item.delay"></el-input>
                  </el-form-item>
                  <el-form-item label="消耗值" >
                      <el-input v-model="item.cost"></el-input>
                    </el-form-item>
                <el-form-item label="描述">
                  <el-input type="textarea" v-model="item.description"></el-input>
                </el-form-item>
                <el-form-item label="小提示">
                  <el-input type="textarea" v-model="item.tips"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="danger" size="small" @click="model.skills.splice(i,1)">删除</el-button><!--删除，传入参数1为位置，2为个数-->
                </el-form-item>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="最佳搭档" name="partners">
              <el-button size="small" type="text" @click="model.partners.push({})"><i class="el-icon-plus" ></i>  添加英雄 </el-button>
              <el-row type="flex" style="flex-wrap: wrap" ><!--flex-wrap让弹性盒元素在必要的时候拆行-->
                <el-col :md="12" v-for="(item,i) in model.partners" :key="i">
                  <el-form-item label="名称" >
                    <el-select filterable  v-model="item.hero"><!-- 加了filterable后可以查找-->
                      <el-option 
                      v-for="hero in heroes"
                      :key="hero._id"
                      :value="hero._id"
                      :label="hero.name">               
                      </el-option>
                    </el-select>
                  </el-form-item>
                   <el-form-item label="描述" >
                      <el-input v-model="item.description"></el-input>
                    </el-form-item>
                  <el-form-item>
                    <el-button type="danger" size="small" @click="model.partners.splice(i,1)">删除</el-button><!--删除，传入参数1为位置，2为个数-->
                  </el-form-item>
                </el-col>
              </el-row>
            </el-tab-pane>

        </el-tabs>
        <el-form-item style="margin-top: 1rem">
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
      model:{
        scores:{
          difficult:0,
          skills:0,
          attack:0,
          survive:0
        },
        skills:[],
        partners:[]
      },
      heroes:[],
      categories:[],
      items1:[],
      items2:[]
    }
  },
  methods: {
    async save(){
        //  let res
      if (this.id) {
        await this.$http.put(`rest/heroes/${this.id}`,this.model)
      }else{
        await this.$http.post('rest/heroes',this.model)
       }
       this.$router.push('/heroes/list')
      this.$message({
        type:"success",
        message:'保存成功'
      })
    },
    async fetch(){
      const res=await this.$http.get(`rest/heroes/${this.id}`)
      // this.model=res.data
      this.model=Object.assign({},this.model,res.data)
    },
    async fetchCategories(){
      const res=await this.$http.get(`rest/categories`)
      this.categories=res.data
    },
    async fetchHeroes(){
      const res=await this.$http.get(`rest/heroes`)
      this.heroes=res.data
    },
    async fetchItems(){
      const res=await this.$http.get(`rest/items`)
      this.items1=res.data
      this.items2=res.data
    },
    //上传图片
    afterUpload(res){
       this.$set(this.model,'avatar',res.url) 
      //  this.model.avatar=res.url   一致，但这么赋值有时候会赋值不上     
    },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
  },
  created(){
    this.fetchItems()
    this.fetchCategories()
    this.fetchHeroes()
     this.id && this.fetch()//前面条件满足后执行后面语句
  }
}
</script>

