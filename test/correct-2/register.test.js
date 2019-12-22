const sinon = require("sinon");
const registerController = require("../../registerController");
const network = require("../../network");
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

let networkPostStub;
describe("[註冊功能]", () => {
    before(() => {
        networkPostStub = sinon.stub(network, "post");
    })

    after(() => {
        networkPostStub.restore();
    })
    it("註冊成功", async () => {
        const data = {
            username: "123"
        }
        const req = mockRequest(data)
        const res = mockResponse();
        networkPostStub.withArgs("http://localhost:7070/api/register", data).resolves({
            status: 0
        })
        await registerController.run(req, res)
        sinon.assert.calledWith(res.json, {
            message: "註冊成功",
        });
        sinon.assert.calledOnce(res.json);
    })
    it("註冊錯誤", async () => {
        const data = {
            username: "123"
        }
        const req = mockRequest(data)
        const res = mockResponse();
        networkPostStub.withArgs("http://localhost:7070/api/register", data).resolves({
            status: -1
        })
        await registerController.run(req, res)
        sinon.assert.calledWith(res.json, {
            message: "註冊失敗",
        });
        sinon.assert.calledOnce(res.json);
    })
})