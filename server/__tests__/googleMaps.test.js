const app = require("../app")
const request = require('supertest')

describe("testGoogleMaps", () => {
    it("list nearest shop", async () => {
        const response = await request(app)
            .post("/nearestShop")
            .expect(200)
    })
    // it("fetch place photo", async () => {
    //     const response = await request(app)
    //         .get("/placePhoto/Aaw_FcJZxShqX-ku2dsH8I-HaEDiLb0A2WC7LX5VKsZAIktCKvOv-O4fxUqSU4d0Dw39Sc1CrvmYp8s-QrWH8rdfxduaIAGXKDQSZyla4yGKixXCX8BcDHHXwdVYfKWPy5WMfH0fvAYVTevQvoKJ7p4S1PZyUu__-F5iAKpvHOatbf3CzP_w")
    //         .redirects()
    // })
    // it("fetch place details", async () => {
    //     const response = await request(app)
    //         .get("/place-details/ChIJa5pKKfP7aS4RZDOfi0EbJB0")
    //         .expect(200)
    // })
    // it("read directions", async () => {
    //     const response = await request(app)
    //         .post(`/getDirections`)
    //         .send({
    //             "origin": {
    //                 "lat": -6.301455519188383,
    //                 "lng": 106.65049435312483
    //             },
    //             "destination": {
    //                 "lat": -6.179924052413002,
    //                 "lng": 106.82496462822036
    //             }
    //         })
    //         .expect(200)
    // })
})