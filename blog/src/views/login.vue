<template>
    <div class="login">
        <video :src="backSrc" autoplay muted loop></video>
        <div class="login_main">
            <header>
                <runBear width="200px"></runBear>
                <span>欢迎登陆</span>
            </header>
            <main>
                <div class="loginId">
                    <span>昵称</span><input type="text" v-model="login.loginId"/></div>
                <div class="loginPwd">
                    <span>密码</span><input type="password" v-model="login.loginPwd"/></div>
                <div class="capture">
                    <span>验证码</span><input type="text" v-model="login.capture" style="width:55%"/>
                    <span v-html="capture" @click="getNewCapture"></span>
                </div>
            </main>
            <footer>
                <button @click="submit">登录</button>
            </footer>
        </div>
    </div>
</template>

<script>
    import runBear from "@/components/runBear.vue";
    import {getCaptureApi} from "@/api/capture.js";
    import backSrc from "@/assets/back.mp4";
    export default {
        components: {
            runBear
        },
        data() {
            return {
                login: {
                    loginId: "bookbag",
                    loginPwd: "bookbags",
                    capture: ""
                },
                capture: ""
            };
        },
        methods: {
            async submit() {
                const msg = await this
                    .$store
                    .dispatch("loginIn", this.login); //登陆失败返回一个字符串
                if (typeof msg === "object") {
                    this
                        .$router
                        .push("/leaveWord");
                } else {
                    alert(msg);
                }
            },
            async getNewCapture() {
                this.fetchCapture();
            },
            async fetchCapture() {
                this.capture = await getCaptureApi();
            }
        },
        computed:{
            backSrc(){
                return backSrc;
            }
        },
        created() {
            this.fetchCapture();
        }
    };
</script>

<style lang="less" scoped="scoped">
    .login {
        width: 100%;
        height: 100%;
        overflow: hidden;
        .login_main {
            position: fixed;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-content: space-between;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            border: 1px solid;
            padding: 2rem;
            border-radius: 10px;
            height: 60%;
            background: rgba(0, 253, 198, 0.281);
            footer,
            header,
            main {
                text-align: center;
            }
            header {
                font-size: 3rem;
                text-align: center;
            }
            main {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                align-content: space-between;
                font-size: 1.5rem;
                div {
                    display: flex;
                    align-content: center;
                    justify-content: center;
                    flex-wrap: wrap;
                    width: 60%;
                    span:first-child {
                        display: block;
                        width: 100%;
                    }
                    input {
                        box-sizing: border-box;
                        font-size: 1.5rem;
                        outline: none;
                        height: 50px;
                        width: 100%;
                        border-radius: 3px;
                        padding-left: 1rem;
                        background-color:rgba(255, 255, 255, 0)

                    }
                }
            }
            footer {
                button {
                    width: 10rem;
                    font-size: 2rem;
                    text-align: center;
                }
            }
        }
        video{
            width: 100%;
        }
    }
</style>