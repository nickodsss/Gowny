const app = require("../app")
const request = require('supertest')
const { CreateCategory } = require('../lib/createCategory')
const DeleteUser = require('../lib/deleteUser')
const { CreateUser } = require('../lib/createUser')
const DeleteCategory = require('../lib/deleteCategory')
const { CreateStore } = require('../lib/createStore')
const DeleteStore = require('../lib/deleteStore')
const { CreateDress } = require('../lib/createDress')
const DeleteDress = require('../lib/deleteDress')

beforeAll(async () => {

    // await CreateUser()
    // await CreateCategory()
    // await CreateStore()
    // await CreateDress()
    await Promise.all(
        [
            CreateUser(),
            CreateCategory(),
            CreateStore(),
            CreateDress()
        ]
    )
    // CreateUser();
    // CreateCategory();
    // CreateStore();
    // CreateDress();
})

afterAll(async () => {
    await Promise.allSettled(
        [
            DeleteDress(),
            DeleteCategory(),
            DeleteStore(),
            DeleteUser()
        ]
    )
});

describe("testDress", () => {

    it("list dress", async () => {
        const response = await request(app)
            .get('/dress')

        expect(response.status).toBe(200);
    })
    it("list dress query name", async () => {
        const response = await request(app)
            .get("/dress?name=a")
            .expect(200)
        expect(response.body.data[0]).toHaveProperty(`name`, expect.any(String))
    })
    it("list dress query category id", async () => {
        const response = await request(app)
            .get("/dress?CategoryId=1")
            .expect(200)
    })
    it("list dress detail", async () => {
        const id = 1
        const response = await request(app)
            .get(`/dress/${id}`)

        expect(response.status).toBe(200);
    })

    it("list dress detail", async () => {
        const id = 999
        const response = await request(app)
            .get(`/dress/${id}`)

        expect(response.status).toBe(404);
    })
    it("delete dress by id", async () => {
        const id = 2
        const response = await request(app)
            .delete(`/dress/${id}`)
            .set("access_token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhIiwiZW1haWwiOiJhQGdtYWlsLmNvbSIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTY5MDcyNjEwOH0.ehQlp3TM5zJRokeHaW2VNREkznT989cjhUPCfY3LBmc")
            .expect(200)
        expect(response.body.message).toBe(`Data with id ${id} has been successfully deleted`)
    })

    it("delete dress by id not found", async () => {
        const id = 999
        const response = await request(app)
            .delete(`/dress/${id}`)
            .set("access_token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhIiwiZW1haWwiOiJhQGdtYWlsLmNvbSIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTY5MDcyNjEwOH0.ehQlp3TM5zJRokeHaW2VNREkznT989cjhUPCfY3LBmc")
            .expect(404)
        expect(response.body.message).toBe(`Error not found`)
    })

    it("add dress", async () => {
        const response = await request(app)
            .post(`/dress`)
            .send({
                name: 'Dress Testing',
                description: "Ini description untuk dress testing",
                grade: "S",
                price: 10000000,
                mainImage: 'http://fotodummy.com',
                CategoryId: 1,
                StoreId: 1,
                imageUrl1: 'http;//fotodummyimgurl1.com',
                imageUrl2: 'http;//fotodummyimgurl2.com',
                imageUrl3: 'http;//fotodummyimgurl3.com'
            })
            .set("access_token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhIiwiZW1haWwiOiJhQGdtYWlsLmNvbSIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTY5MDcyNjEwOH0.ehQlp3TM5zJRokeHaW2VNREkznT989cjhUPCfY3LBmc")
        expect(response.status).toBe(201)
        expect(response.body.result).toHaveProperty('description', expect.any(String))
    })

    it("add dress invalid because user", async () => {
        const response = await request(app)
            .post(`/dress`)
            .send({
                name: 'Dress Testing',
                description: "Ini description untuk dress testing",
                grade: "S",
                price: 10000000,
                mainImage: 'http://fotodummy.com',
                CategoryId: 1,
                StoreId: 1,
                imageUrl1: 'http;//fotodummyimgurl1.com',
                imageUrl2: 'http;//fotodummyimgurl2.com',
                imageUrl3: 'http;//fotodummyimgurl3.com'
            })
            .set("access_token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcm5hbWUiOiJkIiwiZW1haWwiOiJkQGdtYWlsLmNvbSIsInJvbGUiOiJVc2VyIiwiaWF0IjoxNjkwOTQ3NTU5fQ.b1n076HheCtfAB88Km2tObbbEew7850dIAm944esdl0")
        expect(response.status).toBe(403)
    })

    it("add dress no valid token", async () => {
        const response = await request(app)
            .post(`/dress`)
            .send({
                name: 'Dress Testing',
                description: "Ini description untuk dress testing",
                grade: "S",
                price: 10000000,
                mainImage: 'http://fotodummy.com',
                CategoryId: 1,
                StoreId: 1,
                imageUrl1: 'http;//fotodummyimgurl1.com',
                imageUrl2: 'http;//fotodummyimgurl2.com',
                imageUrl3: 'http;//fotodummyimgurl3.com'
            })
        expect(response.status).toBe(403)
    })

    it("add dress additional images fewer than 3 images", async () => {
        const response = await request(app)
            .post(`/dress`)
            .send({
                name: 'Dress Testing',
                description: "Ini description untuk dress testing",
                grade: "S",
                price: 10000000,
                mainImage: 'http://fotodummy.com',
                CategoryId: 1,
                StoreId: 1,
                imageUrl1: 'http;//fotodummyimgurl1.com',
                imageUrl2: 'http;//fotodummyimgurl2.com'
            })
            .set("access_token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhIiwiZW1haWwiOiJhQGdtYWlsLmNvbSIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTY5MDcyNjEwOH0.ehQlp3TM5zJRokeHaW2VNREkznT989cjhUPCfY3LBmc")
        expect(response.status).toBe(401)
    })

    it("edit dress", async () => {
        const id = 1
        const response = await request(app)
            .put(`/dress/${id}`)
            .send({
                name: 'Dress Edit',
                description: "Ini description untuk dress edit",
                grade: "S",
                price: 10000000,
                mainImage: 'http://fotodummy.com',
                CategoryId: 1,
                StoreId: 1,
                imageUrl1: 'http;//fotodummyimgurl1.com',
                imageUrl2: 'http;//fotodummyimgurl2.com',
                imageUrl3: 'http;//fotodummyimgurl3.com'
            })
            .set("access_token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhIiwiZW1haWwiOiJhQGdtYWlsLmNvbSIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTY5MDcyNjEwOH0.ehQlp3TM5zJRokeHaW2VNREkznT989cjhUPCfY3LBmc")
        expect(response.status).toBe(201)
        expect(response.body.message).toBe(`Dress with ${id} has been successfully edited `)
    })
    it("error edit dress", async () => {
        const id = 999
        const response = await request(app)
            .put(`/dress/${id}`)
            .send({
                name: 'Dress Edit',
                description: "Ini description untuk dress edit",
                grade: "S",
                price: 10000000,
                mainImage: 'http://fotodummy.com',
                CategoryId: 1,
                StoreId: 1,
                imageUrl1: 'http;//fotodummyimgurl1.com',
                imageUrl2: 'http;//fotodummyimgurl2.com',
                imageUrl3: 'http;//fotodummyimgurl3.com'
            })
            .set("access_token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhIiwiZW1haWwiOiJhQGdtYWlsLmNvbSIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTY5MDcyNjEwOH0.ehQlp3TM5zJRokeHaW2VNREkznT989cjhUPCfY3LBmc")
        expect(response.status).toBe(404)
    })
})