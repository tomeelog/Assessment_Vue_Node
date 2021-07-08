const app = require("../routes/auth");
const app2 = require("../routes/events");
const request = require("supertest");
const httpMocks = require("node-mocks-http");


describe('Post Endpoints', () => {

    it('POST endpoint', async () => {
        let res = httpMocks.createResponse();
        let req = httpMocks.createRequest();
        app.post(res)

        expect(res.statusCode).toBe(200)
    });

    it('GET endpoint', async () => {
        let res = httpMocks.createResponse();
        let req = httpMocks.createRequest();
        app.get(res)

        expect(res.statusCode).toBe(200);

    });
});