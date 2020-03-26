const use = app => {
    app.get('/b', (req, res) => res.send("<h1>ff</h1>"))
}
const test1 = function () {
    console.log("t1")
}
module.exports = { use, test1 }