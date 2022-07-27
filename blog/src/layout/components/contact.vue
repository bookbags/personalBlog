<template>
  <ul class="Contact">
      <li>
          <a href="tencent://message/?Menu=yes&uin=3147079725
          &Service=300&sigT=45a1e5847943b64c6ff3990f8a9e644d2b31356cb0b4ac6b24663a3c8dd0f8aa12a595b1714f9d45">
              <Icon type="qq"></Icon>
              <span>3147079725</span>
          </a>
          <div class="pop">
              <img :src="$store.state.global.globalData.qqQrCode">
          </div>
      </li>
      <li>
          <a href="mailto:3147079725@qq.com">
              <Icon type="mail"></Icon>
              <span>3147079725@qq.com</span>
          </a>
      </li>
      <li>
          <a>
              <Icon type="github"></Icon>
              <span>bookbag</span>
          </a>
      </li>
      <li>
          <a>
              <Icon type="weixin" class="weixin"></Icon>
              <span>19114033589</span>
          </a>
          <div class="pop">
             <img :src="$store.state.global.globalData.weixinQrCode">
          </div>
      </li>
  </ul>
</template>

<script>
import Icon from "@/components/icon.vue"
export default {
    components:{
        Icon
    }
}
</script>

<style scoped lang="less">
@import "~@/globalCss/color.less";
    .Contact{
        width: 100%;
        margin: 0px;
        padding: 0px;
        color: @words;
        li{
            padding: 10px 5px;
            position: relative;
            list-style: none;
            text-align: center;
            cursor: pointer;
            a{
                font-size: @fontSize;
                text-decoration: none;
                padding-left: 10px;
                color: lighten(@words, 30%);
                display: flex;
                height: 30px;
                line-height: 30px;
                .Icon{
                    margin-right: 3px;
                    font-size: @fontSize;
                    &.weixin{
                        font-size: 27px;
                        margin-right: 1px;
                    }
                }
            }
            &:hover{
                .pop{
                    transform: scale(1);
                }
            }
            .pop{
                transform: scaleY(0);
                transform-origin: center bottom;
                transition: all .3s;
                position: absolute;
                top: -200px;
                left: 0px;
                padding: 10px 15px;
                background-color: #fff;
                border-radius: 5px;
                img{
                    width: 150px;
                    height: 150px;
                }
                &::after{
                    content: "";
                    position: absolute;
                    bottom: -10px;
                    left: 50%;
                    transform: translateX(-50%) rotate(45deg);
                    width: 20px;
                    height: 20px;
                    background: #fff;
                }
            }
        }
    }
</style>