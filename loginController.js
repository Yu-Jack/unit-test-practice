const apiService = require("./apiService");
const run = async (req, res) => {
    const {
        username
    } = {...req.body};
    const result = await apiService.login(username)
    if (result.status !== 0) {
        return res.json({
            message: "登入失敗"
        })
    }
    return res.json({
        message: "登入成功"
    })
}

module.exports = {
    run
}