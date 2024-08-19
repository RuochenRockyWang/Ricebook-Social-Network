require('es6-promise').polyfill();
require('isomorphic-fetch');

const url = path => `http://localhost:3000${path}`;
describe('Validate get and update headline functionality', () => {
    let cookie;
    beforeEach((done) => {
        let user = {username: "testUser", password:'123'}
        fetch(url('/login'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        }).then(res => {
            cookie = res.headers.get('set-cookie');
            return res.json();
        }).then(res => {
            done();
        })
    })

    it('should get the user`s headline', (done) => {
        fetch(url('/headline/testUser'), {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', cookie: cookie},
        }).then(res => res.json()).then(res => {
            expect(res.username).toEqual('testUser');
            expect(res.headline).toEqual('this is a test');
            done();
        });
    });

    it('should update the test user`s headline', (done) => {
        let headline = {headline: "updated let's go"}
        fetch(url('/headline'), {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'cookie': cookie },
            body: JSON.stringify(headline)
        }).then(res => 
            {
                cookie = res.headers.get('set-cookie');
                return res.json();
            })
            .then(res => {
            expect(res.headline).toEqual("updated let's go");
            done();
        })
    });

});

describe('Validate get and update articles functionality', () => {
    let cookie;

    beforeEach((done) => {
        let user = {username: "testUser", password:'123'}
        fetch(url('/login'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        }).then(res => {
            cookie = res.headers.get('set-cookie');
            return res.json();
        }).then(res => {
            done();
        })
    });

    it('should add an article', (done) => {
        let post = {text: "This is a test article for testuser"}
        fetch(url('/article'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',  cookie: cookie },
            body: JSON.stringify(post)
        }).then(res => {
            expect(res.status).toEqual(200);
            return res.json()
        }).then (res => {
            done();
        })
    });

    it('should get current user articles', (done) => {
        fetch(url('/articles'), {
            method: 'GET',
            headers: {'Content-Type': 'application/json', cookie: cookie },
        })
            .then(res => {
                expect(res.status).toEqual(200)
                return res.json()
            })
            .then(res => {
                done();
            })
    });
    it('should get an article with specified id', (done) => {
        fetch(url('/articles/1'), {
            method: 'GET',
            headers: {'Content-Type': 'application/json', cookie: cookie },
        })
            .then(res => {
                expect(res.status).toEqual(200)
                return res.json()
            })
            .then(res => {
                done();
            })
    });


    // it('should update an article to the test user', (done) => {
    //     let post = {text: "newly added article"}
    //     fetch(url('/articles/7'), {
    //         method: 'PUT',
    //         headers: { 'Content-Type': 'application/json',  cookie: cookie },
    //         body: JSON.stringify(post)
    //     }).then(res => {
    //         expect(res.status).toEqual(200);
    //         done();
    //     })
    // });

});

