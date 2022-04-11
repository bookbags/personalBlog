const banner = require("../tables/banner");
const {
    baseUrl
} = require("./common");
banner.sync({
    force: true
}).then(async () => {
    await banner.bulkCreate([{
        midImg: baseUrl + "/img49.jpg",
        bigImg: baseUrl + "/backgroundImg/back1.jpg",
        title: "爱能创造一切，也能毁灭一切",
        description: "当你用爱保护羊群不受狼的伤害，那么对于狼，这种爱心就等于毁灭，因为他们会因此而被活活饿死",
    }, {
        midImg: baseUrl + "/img49.jpg",
        bigImg: baseUrl + "/backgroundImg/back2.jpg",
        title: "一天是不良人",
        description: "一辈子都是不良人",
    }, {
        midImg: baseUrl + "/img49.jpg",
        bigImg: baseUrl + "/backgroundImg/back3.jpg",
        title: "光芒总会暗淡，星辰也终将陨落",
        description: "，但是在暗淡的光芒后面，定会出现更夺目的星光",
    }]);
    console.log("保存成功");
})