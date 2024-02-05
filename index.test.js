const request = require("supertest");
const app = require("./index");

describe("API server", () => {
  let api;

  beforeAll(() => {
    // Start the server
    api = app.listen(9000, () => {
      console.log("Test server running on port 9000");
    });
  });

  afterAll((done) => {
    // Close the server
    console.log("Gracefully stopping test server");
    api.close(done);
  });

  it("responds to / with status 200", async () => {
    const response = await request(api).get("/");
    console.log(response);
    expect(response.statusCode).toBe(200);
  });

  it('responds to /api with "Hello World!"', async () => {
    const response = await request(api).get("/api");
    expect(response.text).toEqual("Hello World!");
  });

  it("retrieves all pets", async () => {
    const response = await request(api).get("/api/v1/pets");
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});
