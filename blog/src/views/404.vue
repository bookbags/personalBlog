<template>
    <div class="notFind">
        页面不存在
    </div>
</template>

<script>
export default {
  data() { 
    return {}
  },
}
</script>

<style lang="scss" scoped>
.notFind{
    width: 50vw;
    height: 50vh;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 5vw;
    text-align: center;
    line-height: 50vh;
}
</style>