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
        beforeEach( async () => {
            await db('users').truncate();
        });
    })

});