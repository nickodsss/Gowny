const app = require("../app")
const request = require('supertest')
const { CreateCategory } = require('../lib/createCategory')
const DeleteUser = require('../lib/deleteUser')
const { CreateUser } = require('../lib/createUser')
const DeleteCategory = require('../lib/deleteCategory')

beforeAll(async () => {
    await Promise.allSettled(
        [
            CreateUser(),
            CreateCategory()
        ]
    )
})

afterAll(async () => {
    await Promise.allSettled([
        DeleteUser(),
        DeleteCategory()
    ])

});

describe("testCategory", () => {
    it("list category", async () => {
        const response = await request(app)
            .get("/categories")
            .expect(200)
    })
    it("delete category", async () => {
        const id = 4
        const response = await request(app)
            .delete(`/categories/${id}`)
            .set("access_token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhIiwiZW1haWwiOiJhQGdtYWlsLmNvbSIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTY5MDcyNjEwOH0.ehQlp3TM5zJRokeHaW2VNREkznT989cjhUPCfY3LBmc")
            .expect(200)
        expect(response.body.msg).toBe(`Category with id ${id} is successfully deleted`)
    })

    it("delete category not found", async () => {
        const id = 10
        const response = await request(app)
            .delete(`/categories/${id}`)
            .set("access_token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhIiwiZW1haWwiOiJhQGdtYWlsLmNvbSIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTY5MDcyNjEwOH0.ehQlp3TM5zJRokeHaW2VNREkznT989cjhUPCfY3LBmc")
        expect(response.status).toBe(404)
    })

    it("add category", async () => {
        const response = await request(app)
            .post(`/categories`)
            .send({
                name: "Cat 6"
            })
            .set("access_token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhIiwiZW1haWwiOiJhQGdtYWlsLmNvbSIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTY5MDcyNjEwOH0.ehQlp3TM5zJRokeHaW2VNREkznT989cjhUPCfY3LBmc")
        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('name', expect.any(String))
    })
    it("add failed category", async () => {
        const response = await request(app)
            .post(`/categories`)
            .send({
                name: ""
            })
            .set("access_token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhIiwiZW1haWwiOiJhQGdtYWlsLmNvbSIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTY5MDcyNjEwOH0.ehQlp3TM5zJRokeHaW2VNREkznT989cjhUPCfY3LBmc")
        expect(response.status).toBe(400)
        expect(response.body.message).toBe('All input column is required')
    })
})