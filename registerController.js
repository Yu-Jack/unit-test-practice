const apiService = require("./apiService");
const run = async (req, res) => {
    const {
        username
    } = {...req.body};
    const result = await apiService.register(username)
    if (result.status !== 0) {
        return res.json({
            message: "註冊失敗"
        })
    }
    return res.json({
        message: "註冊成功"
    })
}

module.exports = {
    run
}