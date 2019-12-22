const sinon = require("sinon");
const loginController = require("../../loginController");
const apiService = require("../../apiService");
const mockRequest = (data) => {
    return {
        body: data
    }
}

const mockResponse = () => {
    const res = {};
    res.json = sinon.stub().returns(res);
    return res;
}

const apiServiceStub = sinon.stub(apiService);
describe("[登入功能]", () => {
    it("登入成功", async () => {
        const req = mockRequest({
            username: "123"
        })
        const res = mockResponse();
        apiServiceStub.login.withArgs("123").resolves({
            status: 0
        });
        await loginController.run(req, res)
        sinon.assert.calledWith(res.json, {
            message: "登入成功",
        });
        sinon.assert.calledOnce(res.json);
    })
    it("登入錯誤", async () => {
        const req = mockRequest({
            username: "123"
        })
        const res = mockResponse();
        apiServiceStub.login.withArgs("123").resolves({
            status: -1
        });
        await loginController.run(req, res)
        sinon.assert.calledWith(res.json, {
            message: "登入失敗",
        });
        sinon.assert.calledOnce(res.json);
    })
})