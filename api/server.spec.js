const { expectCt } = require('helmet');
const supertest = require('supertest');
const server = require('./server');
const db = require('../database/dbConfig');

describe('auth-router.js', () => {
    describe('POST /register', () => {
        beforeEach( async () => {
            await db('users').truncate();
        });
    it('should create a user', async () => {
        const rick = await supertest(server)
        .post('/api/auth/register')
        .send({
            username: 'Rick',
            password: 'password'
        });
        expect(rick.body.data.username).toBe("Rick")
        });

        it('should return 201 status', async () => {
            const glen = await supertest(server)
            .post('/api/auth/register')
            .send({
                username: 'Glen',
                password: 'password'
            })
            .then(res => {
                expect(res.status).toBe(201)
            })
        });
    });

    describe('POST /login', () => {
        it('should login a user', async () => {
           await supertest(server)
            .post('/api/auth/login')
            .send({
                username: 'Glen',
                password: 'password'
            })
            .then(res => {
                expect(res.body.message).toBe("You are now logged in.");
                expect(res.status).toBe(200);
            });
        });
    })

});