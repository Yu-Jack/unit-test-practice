const sinon = require("sinon");
const loginController = require("../../loginController");
const axios = require("axios");
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
let axiosPostStub
describe("[登入功能]", () => {
    before(() => {
        axiosPostStub = sinon.stub(axios, "post");
    })

    after(() => {
        axiosPostStub.restore();
    })

    it("登入成功", async () => {
        const data = {
            username: "123"
        }
        const req = mockRequest(data)
        const res = mockResponse();
        axiosPostStub.withArgs("http://localhost:7070/api/login", data).resolves({
            status: 0
        })
        await loginController.run(req, res)
        sinon.assert.calledWith(res.json, {
            message: "登入成功",
        });
        sinon.assert.calledOnce(res.json);
    })
    it("登入錯誤", async () => {
        const data = {
            username: "123"
        }
        const req = mockRequest(data)
        const res = mockResponse();
        axiosPostStub.withArgs("http://localhost:7070/api/login", data).resolves({
            status: -1
        })
        await loginController.run(req, res)
        sinon.assert.calledWith(res.json, {
            message: "登入失敗",
        });
        sinon.assert.calledOnce(res.json);
    })
})