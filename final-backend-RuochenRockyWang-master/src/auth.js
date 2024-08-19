// const md5 = require('md5');
// const cookieParser = require('cookie-parser');
// const bodyParser = require('body-parser');
// const userSchema = require('./userSchema');
// const profileSchema = require('./profileSchema');
// const mongoose = require('mongoose');
// const Users = mongoose.model("User",userSchema);
// const Profile = mongoose.model('Profile', profileSchema);


// mongoose.connect(connectionString)
// let sessionUser = {};
// let cookieKey = "sid";

// function isLoggedIn(req, res, next) {
//     if (!req.cookies) {
//         return res.status(401).send({result: "require cookies"});
//     }
//     let sid = req.cookies[cookieKey];
//     if (!sid) {
//         return res.status(402).send({result: "require sid"});
//     }
//     let username = sessionUser[sid];
//     if (username) {
//         req.username = username;
//         next();
//     } else {
//         return res.status(403).send({result: "require username"});
//     }
// }

// function login(req,res){
//     const username = req.body.username
//     const password = req.body.password

//     if (!username || !password) {
//         return res.sendStatus(400);
//     }

//     Users.find({ username: username }).exec(function (err, users) {
//         if (users.length == 1) {
//             const userObj = users[0]
//             const salt = userObj.salt
//             const hash = userObj.hash

//             if (md5(password + salt) === hash) {
//                 const sessionKey = md5(hash + new Date().getTime() + userObj.username)
//                 // sessionUser.set(sessionKey, userObj)
//                 sessionUser[sessionKey] = username;
//                 // console.log(sessionUser)
//                 res.cookie(cookieKey, sessionKey, { maxAge: 3600 * 1000, httpOnly: true })
//                 // req.setHeader('Authorization', )
//                 // console.log(req.cookies)
//                 // res.setHeader('Content-Type', 'application/json')
//                 res.status(200).send({ username: username, result: "success" })
//             } else {    
//                 res.status(400).send({result: 'invalid username or password'})
//             }
//     }else{
//         return res.status(200).send({result:"invalid username and password"})
//     }
//     })
// }

// function register(req, res) {
//     let username = req.body.username;
//     let password = req.body.password; 

//     if (!username || !password) {
//         return res.sendStatus(400);
//         // return res.status(400).send({result:"not complete"});
//     }

//     let salt = username + new Date().getTime();
//     let hash = md5(salt + password);

//     Users.find({username: username}).exec(function(err, users) {
    
//         if (users){
//             return res.status(200).send({username: username, result: "user exists"})
//         }else {
//             // return res.status(200).send({result: "in here"});
//             new Users({
//                 username: username,
//                 salt: salt,
//                 hash: hash
//             }).save()
//             new Profile({
//                 username: username,
//                 email: req.body.email,
//                 phoneNum: req.body.phoneNum,
//                 headline: "Free",
//                 birthday: req.body.birthday,
//                 zipcode: req.body.zipcode,
//                 avatar: "https://s1.chu0.com/src/img/png/f5/f585c840fdaf4d47a344df75ee34c14a.png?e=1735488000&token=1srnZGLKZ0Aqlz6dk7yF4SkiYf4eP-YrEOdM1sob:00KSYo4Cz9Msm67tpVJbja5C56k=",
//                 followingList: []
//             }).save()

//             let sessionKey = md5(hash + new Date().getTime + username);
                
//             sessionUser[sessionKey] = username;

//             res.cookie(cookieKey, sessionKey, { maxAge: 3600*1000, httpOnly: true, sameSite: 'None', secure: true});
        
//             return res.status(200).send({username: username, result: "success"})
//         }
//     })
// }

// function logout(req, res) {
//     let sid = req.cookies[cookieKey];
//     delete sessionUser[sid];
//     res.clearCookie(cookieKey);
//     res.status(200).send({result: "Log out successful"});
// }

// module.exports = (app) => {
//     app.use(bodyParser.json());
//     app.use(cookieParser());
//     app.post('/login', login);
//     app.post('/register', register);
//     app.use(isLoggedIn);
//     app.put('/logout', logout);
// }

const md5 = require('md5')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const userSchema = require('./userSchema');
const profileSchema = require('./profileSchema');
const mongoose = require('mongoose');
const Users = mongoose.model('User', userSchema);
const Profile = mongoose.model('Profile', profileSchema);
const connectionString = "mongodb+srv://rockyhw6:jcsywrc991019@clusterinclass.q4yhsub.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(connectionString)

let sessionUser = {};
cookieKey = "sid";

function isLoggedIn(req, res, next) {
    if (!req.cookies) {
        return res.status(401).send({result: "require cookies"});
    }

    let sid = req.cookies[cookieKey];
    if (!sid) {
        return res.status(401).send({result: "require sid"});
    }
    let username = sessionUser[sid];

    if (username) {
        req.username = username;
        next();
    } else {
        return res.status(401).send({result: "require username"});
    }
}

function login(req, res) {
    let username = req.body.username;
    let password = req.body.password;

    if (!username || !password) {
        return res.sendStatus(400);
    }

    Users.find({username: username}).exec(function(err, data) {
        if (data.length == 1) {
            let hash = md5(data[0].salt + password);
            if (hash == data[0].hash) {
                let sessionKey = md5(hash + new Date().getTime + username);
                
                sessionUser[sessionKey] = username;

                cookieKey = "sid";

                res.cookie(cookieKey, sessionKey, { maxAge: 3600*1000, httpOnly: true, sameSite: 'None', secure: true});
            
                return res.status(200).send({username: username, result: "success"});
            } else {
                return res.status(200).send({result: "incorrect username or pwd"});
            }
        } else {
            return res.status(200).send({result: "incorrect username or pwd"});
        }
    })
}

function register(req, res) {
    let username = req.body.username;
    let password = req.body.password; 

    if (!username || !password) {
        return res.sendStatus(400);
    }

    let salt = username + new Date().getTime();
    let hash = md5(salt + password);

    Users.find({username: username}).exec(function(err, data) {
    
        if (data.length > 0)
            return res.status(200).send({username: username, result: "user exists"})
        else {
            new Users({
                username: username,
                salt: salt,
                hash: hash
            }).save()
            new Profile({
                username: username,
                email: req.body.email,
                phoneNum: req.body.phoneNum,
                headline: "You can update your headline",
                birthday: req.body.birthday,
                zipcode: req.body.zipcode,
                avatar: "https://images.unsplash.com/photo-1668457248689-7d52055d6171?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
                followingList: []
            }).save()

            let sessionKey = md5(hash + new Date().getTime + username);
                
            sessionUser[sessionKey] = username;

            res.cookie(cookieKey, sessionKey, { maxAge: 3600*1000, httpOnly: true, sameSite: 'None', secure: true});
        
            return res.status(200).send({username: username, result: "success"})
        }
    })
}

function logout(req, res) {
    let sid = req.cookies[cookieKey];


    delete sessionUser[sid];

    res.cookie(cookieKey, "", { maxAge: 3600*1000, httpOnly: true, sameSite: 'None', secure: true});

    res.clearCookie(cookieKey);
    res.status(200).send({result: "OK"});
}

module.exports = (app) => {
    app.use(bodyParser.json());
    app.use(cookieParser());
    
    app.post('/login', login);
    app.post('/register', register);
    app.use(isLoggedIn);
    app.put('/logout', logout);
}