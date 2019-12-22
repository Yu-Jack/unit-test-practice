const http = require("http");
const network = require("../../network");

let server;
describe("[network 功能]", () => {
    afterEach(() => {
        server.close();
        server = null;
    })

    it("測試攔截功能(interceptors)", (done) => {
        server = http.createServer((req, res) => {
            const data = {a:1}
            res.end(JSON.stringify(data));
        }).listen(5000, () => {
            network.post("http://localhost:5000").then((data) => {
                done();
            })
        })
    })
});