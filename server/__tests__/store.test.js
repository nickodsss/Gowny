const app = require("../app")
const request = require('supertest')
const { CreateStore } = require('../lib/createStore')
const DeleteUser = require('../lib/deleteUser')
const { CreateUser } = require('../lib/createUser')
const DeleteStore = require('../lib/deleteStore')

beforeAll(async () => {
    await Promise.allSettled(
        [
            CreateUser(),
            CreateStore()
        ]
    )
})

afterAll(async () => {
    await Promise.allSettled(
        [
            DeleteUser(),
            DeleteStore()
        ]
    )
});

describe("testStore", () => {
    it("list store", async () => {
        const response = await request(app)
            .get("/store")
            .expect(200)
    })

    it("list store by id", async () => {
        const response = await request(app)
            .get("/store/2")
            .expect(200)
    })

    it("failed list store by id", async () => {
        const id = 999
        const response = await request(app)
            .get(`/store/${id}`)
            .expect(404)
    })

    it("delete store", async () => {
        const id = 4
        const response = await request(app)
            .delete(`/store/${id}`)
            .set("access_token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhIiwiZW1haWwiOiJhQGdtYWlsLmNvbSIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTY5MDcyNjEwOH0.ehQlp3TM5zJRokeHaW2VNREkznT989cjhUPCfY3LBmc")
            .expect(200)
        expect(response.body.msg).toBe(`Store with id ${id} is successfully deleted`)
    })

    it("delete store not found", async () => {
        const id = 10
        const response = await request(app)
            .delete(`/store/${id}`)
            .set("access_token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhIiwiZW1haWwiOiJhQGdtYWlsLmNvbSIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTY5MDcyNjEwOH0.ehQlp3TM5zJRokeHaW2VNREkznT989cjhUPCfY3LBmc")
        expect(response.status).toBe(404)
    })

    it("add store", async () => {
        const response = await request(app)
            .post(`/store`)
            .send({
                name: "Store Testing",
                address: "Jalan Hang Tuah 123",
                phoneNumber: "+82743987932",
                lat: -6.2729738,
                long: 106.6330755
            })
            .set("access_token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhIiwiZW1haWwiOiJhQGdtYWlsLmNvbSIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTY5MDcyNjEwOH0.ehQlp3TM5zJRokeHaW2VNREkznT989cjhUPCfY3LBmc")
        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('name', expect.any(String))
        expect(response.body).toHaveProperty('address', expect.any(String))
        expect(response.body).toHaveProperty('phoneNumber', expect.any(String))
    })
    it("add failed store", async () => {
        const response = await request(app)
            .post(`/store`)
            .send({
                name: "",
                address: "",
                phoneNumber: ""
            })
            .set("access_token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhIiwiZW1haWwiOiJhQGdtYWlsLmNvbSIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTY5MDcyNjEwOH0.ehQlp3TM5zJRokeHaW2VNREkznT989cjhUPCfY3LBmc")
        expect(response.status).toBe(400)
        expect(response.body.message).toBe('All input column is required')
    })
})