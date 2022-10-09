<template>
  <div class="pagination">
    <button :disabled="pageNo==1" @click="$emit('getPage', pageNo-1)">上一页</button>
    <button v-if="startNumAndEndNum.start!=1" @click="$emit('getPage', 1)">1</button>
    <button v-if="startNumAndEndNum.start>2">···</button>

<!-- 分页连续 -->
    <button v-for="(page, index) in startNumAndEndNum.end" :key="index" v-show="page>=startNumAndEndNum.start" @click="$emit('getPage', page)" :class="{'active':pageNo==page}">{{ page }}</button>
    
    <button v-if="startNumAndEndNum.end<=totalPage-1">···</button>
    <button v-if="startNumAndEndNum.end!=totalPage" @click="$emit('getPage', totalPage)">{{ totalPage }}</button>
    <button :disabled="pageNo==totalPage" @click="$emit('getPage', pageNo+1)">下一页</button>
    
    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
  export default {
    name: "PaginationMy",
    props:['pageNo', 'pageSize', 'total', 'continues'],
    computed: {
      totalPage() {
        return Math.ceil( this.total/this.pageSize )
      },
      startNumAndEndNum() {
        const { pageNo, continues, totalPage } = this
        // 创建连续的起始页和终结页
        let start = 0, end = 0
        // 开始判断
        if(continues > totalPage) {
          // 连续的页数大于总页数
          start = 1
          end = totalPage
        }else {
          // 数据大于5页---正常情况
          start = pageNo - parseInt(continues/2)
          end = pageNo + parseInt(continues/2)
          // 异常情况---负数
          if(start < 1) {
            end = pageNo + (1 - start) + parseInt(continues/2)
            start = 1
          }
          // 异常情况---end大于最后一页
          if(end > totalPage) {
            start = pageNo - (end - totalPage) - parseInt(continues/2)
            end = totalPage
          }
          if(pageNo == 4){
            start = pageNo - parseInt(continues/2)
            end = pageNo - 1 + parseInt(continues/2)
          }
        }
        return {start, end}
      }
    },
  }
</script>

<style lang="less" scoped>
  .pagination {
    text-align: center;
    button {
      margin: 0 5px;
      background-color: #f4f4f5;
      color: #606266;
      outline: none;
      border-radius: 2px;
      padding: 0 4px;
      vertical-align: top;
      display: inline-block;
      font-size: 13px;
      min-width: 35.5px;
      height: 28px;
      line-height: 28px;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      border: 0;

      &[disabled] {
        color: #c0c4cc;
        cursor: not-allowed;
      }

      &.active {
        cursor: pointer;
        background-color: #ff4040;
        color: #fff;
      }
    }
  }
</style>
