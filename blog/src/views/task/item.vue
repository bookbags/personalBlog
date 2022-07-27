<template>
    <ul>
        <li v-for="item of items" :key="item">{{item}}</li>
    </ul>
</template>

<script>
export default {
    props:{
        items:{
            type: Array,
            required: true
        }
    },
  data() { 
    return {}
  },
}
</script>

<style lang="less" scoped>
ul{
    display: flex;
    flex-wrap: nowrap;
    margin: 0px;
    padding: 0px;
    height: 100%;
    li{
        text-align: center;
        list-style: none;
        flex: 1 1 auto;
        padding:1em;
    }
}
</style>