const sinon = require("sinon");
const registerController = require("../../registerController");
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
describe("[註冊功能]", () => {
    it("註冊成功", async () => {
        const req = mockRequest({
            username: "123"
        })
        const res = mockResponse();
        apiServiceStub.register.withArgs("123").resolves({
            status: 0
        });
        await registerController.run(req, res)
        sinon.assert.calledWith(res.json, {
            message: "註冊成功",
        });
        sinon.assert.calledOnce(res.json);
    })
    it("註冊錯誤", async () => {
        const req = mockRequest({
            username: "123"
        })
        const res = mockResponse();
        apiServiceStub.register.withArgs("123").resolves({
            status: -1
        });
        await registerController.run(req, res)
        sinon.assert.calledWith(res.json, {
            message: "註冊失敗",
        });
        sinon.assert.calledOnce(res.json);
    })
})