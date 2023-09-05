const app = require("../app")
const request = require('supertest')
const DeleteUser = require('../lib/deleteUser')
const { CreateUser } = require('../lib/createUser')

beforeAll(async () => {
    await Promise.allSettled(
        [
            CreateUser()
        ]
    )
})

afterAll(async () => {
    await Promise.allSettled(
        [
            DeleteUser()
        ]
    )
});


describe("testRegisterLogin", () => {
    describe("testRegisUser", () => {
        it("check register user 201", async () => {
            const response = await request(app)
                .post("/register")
                .send({
                    username: 'testingjest',
                    email: 'testingjest@gmail.com',
                    password: '12345',
                    phoneNumber: '0129832474',
                    address: 'Jalan Hang Tuah 123'
                })
                .expect(201)
            expect(response.body.username).toBe('testingjest')
            expect(response.body.email).toBe('testingjest@gmail.com')
        })
        it("check Register User tanpa email 400", async () => {
            const response = await request(app)
                .post("/register")
                .send({
                    username: 'testingjest',
                    email: '',
                    password: '12345',
                    phoneNumber: '0129832474',
                    address: 'Jalan Hang Tuah 123'
                })
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .expect(400)
        })
        it("check Register User Email String Kosong 400", async () => {
            const response = await request(app)
                .post("/register")
                .send({
                    username: 'testingjest',
                    email: '',
                    password: '12345',
                    phoneNumber: '0129832474',
                    address: 'Jalan Hang Tuah 123'
                })
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .expect(400)
        })
        it("check register User 400 email terdaftar", async () => {
            const response = await request(app)
                .post("/register")
                .send({
                    username: 'a',
                    email: 'a@gmail.com',
                    password: '12345',
                    phoneNumber: '0129832474',
                    address: 'Jalan Hang Tuah 123'
                })
                .expect(400)
                .set('Content-Type', 'application/x-www-form-urlencoded')
        })
        it("check register User format email salah", async () => {
            const response = await request(app)
                .post("/register")
                .send({
                    username: 'a',
                    email: 'agmail.com',
                    password: '12345',
                    phoneNumber: '0129832474',
                    address: 'Jalan Hang Tuah 123'
                })
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .expect(400)
        })
    })
    describe("testLoginUser", () => {
        it("testLoginUser berhasil 200", async () => {
            const response = await request(app)
                .post("/login")
                .send({
                    email: 'a@gmail.com',
                    password: "12345"
                })
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .expect(200)
            expect(response.body.email).toBe('a@gmail.com')

        })
        it("testLoginUser email kosong 200", async () => {
            const response = await request(app)
                .post("/login")
                .send({
                    email: '',
                    password: "12345"
                })
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .expect(401)
        })
        it("testLoginUser email salah 200", async () => {
            const response = await request(app)
                .post("/login")
                .send({
                    email: 'djshfjdsk@gmail.com',
                    password: "12345"
                })
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .expect(401)
        })
    })
})


