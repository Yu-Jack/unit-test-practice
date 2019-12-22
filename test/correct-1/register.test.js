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

let apiServiceRegisterStub;
describe("[註冊功能]", () => {
    before(() => {
        apiServiceRegisterStub = sinon.stub(apiService, "register");
    })

    after(() => {
        apiServiceRegisterStub.restore();
    })
    it("註冊成功", async () => {
        const req = mockRequest({
            username: "123"
        })
        const res = mockResponse();
        apiServiceRegisterStub.withArgs("123").resolves({
            status: 0
        })
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
        apiServiceRegisterStub.withArgs("123").resolves({
            status: -1
        })
        await registerController.run(req, res)
        sinon.assert.calledWith(res.json, {
            message: "註冊失敗",
        });
        sinon.assert.calledOnce(res.json);
    })
})