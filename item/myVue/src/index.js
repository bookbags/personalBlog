import Due from "./core/instance/index.js";

const due = new Due({
    data:{
        name: "shutao",
        age: "100",
        score:{
            math: 100,
            english: 20
        },
        class:[1, 2, 3, 4]
    }
})
window.due = due;