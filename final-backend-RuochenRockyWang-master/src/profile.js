const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const md5 = require('md5');
const fs = require('fs');
// const formidable = require('formidable');
const profileSchema = require('./profileSchema');
const Profile = mongoose.model('Profile', profileSchema);
const userSchema = require('./userSchema');
const Users = mongoose.model('User', userSchema);
const uploadImage = require('./uploadCloudinary');
const connectionString = "mongodb+srv://rockyhw6:jcsywrc991019@clusterinclass.q4yhsub.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(connectionString)

const stubProfile = {
    username: 'Rocky',
    headline: 'stub headline',
    email: '123@123.com',
    zipcode: 77019,
    birthday: '128999122000',
    avatar: 'https://images.unsplash.com/photo-1668457248689-7d52055d6171?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
}

function getHeadline(req, res) {
    let username = req.params.user? req.params.user:req.username;
        Profile.findOne({username: username}).exec(function(err, data) {
            if(data){
                res.status(200).send({username: username, headline: data.headline});
            }else{
                res.status(400).send({result:"invalid username"})
            }
        })

}

function updateHeadline(req, res) {
    Profile.updateOne({username: req.username}, {$set:{headline: req.body.headline}}, function(err, data) {
        res.status(200).send({username: req.username, headline: req.body.headline})
    })
}

function getEmail(req, res) {
    let username = req.params.user? req.params.user:req.username;
    Profile.findOne({username: username}).exec(function(err, data) {
        if(data){
            res.status(200).send({username:username, email: data.email});
        }else{
            res.status(400).send({result:"invalid username"})
        }
        
    })
}

function updateEmail(req, res) {
    Profile.updateOne({username: req.username}, {$set:{email: req.body.email}}, function(err, data) {
        res.status(200).send({username: req.username, email: req.body.email})
    })
}

function getZipcode(req, res) {
    let username = req.params.user? req.params.user:req.username;
    Profile.findOne({username: username}).exec(function(err, data) {
        if(data){
            res.status(200).send({username: username, zipcode: data.zipcode})
        }else{
            res.status(400).send({result:"invalid username"})
        };
    })
}

function updateZipcode(req, res) {
    Profile.updateOne({username: req.username}, {$set:{zipcode: req.body.zipcode}}, function(err, data) {
        res.status(200).send({username: req.username, zipcode: req.body.zipcode})
    })
}

function getBirthday(req, res) {
    let username = req.params.user? req.params.user:req.username;
    Profile.findOne({username: username}).exec(function(err, data) {
        if(data){
            res.status(200).send({username: username, birthday: data.birthday});
        }else{
            res.status(400).send({result:"invalid username"})
        }
        
    })
}

function getAvatar(req, res) {
    let user = req.params.user == null ? req.username : req.params.user;
    Profile.findOne({username: user}).exec(function(err, data) {
        if(data){
            res.status(200).send({username: user, avatar: data.avatar});
        }else{
            res.status(400).send({result:"invalid username"})
        }
    })
}

function updateAvatar(req, res) {
    Profile.updateOne({username: req.username}, {$set:{avatar: req.fileurl}}, function(err, data) {
        Profile.findOne({username: req.username}).exec(function(err, data){
            res.status(200).send({username: data.username, avatar: data.avatar});
        })

    })
}

// function updateAvatar(req, res) {
//     let fileURL = "public/img/avatars";
//     if (!fs.existsSync(fileURL)){
//         fs.mkdirSync(fileURL,  { recursive: true });
//     }

//     let form = new formidable.IncomingForm();
//     form.encoding = 'utf-8';
//     form.keepExtensions = true; 

//     form.parse(req, function(err, fields, files) {

//         let extName = '';
//         switch (files.image.mimetype) {
//             case 'image/pjpeg':
//                 extName = 'jpg';
//                 break;
//             case 'image/jpeg':
//                 extName = 'jpg';
//                 break;
//             case 'image/png':
//                 extName = 'png';
//                 break;
//             case 'image/x-png':
//                 extName = 'png';
//                 break;
//         }
//         if (extName.length == 0) {
//             return res.status(200).send({result: "Only supports PNG and JPG"});
//         } else {
//             let avatarName = '/' + Date.now() + '.' + extName;
//             let newPath = fileURL + avatarName;
//             fs.renameSync(files.image.filepath, newPath); 

//             Profile.updateOne({username: req.username}, {$set:{avatar: newPath}}, function(err, data) {
//                 res.status(200).send({username: req.username, img: newPath});
//             });
//         }

//     })

// }

function updatePassword(req, res) {
    let salt = req.username + new Date().getTime();
    let hash = md5(salt + req.body.password);
    Users.updateOne({username: req.username}, {$set:{salt: salt, hash: hash}}, function(err, data) {
        res.status(200).send({username: req.username, result: "success"})
    })
}

function getUsername(req, res) {
    res.status(200).send({username: req.username});
}

function getPhoneNum(req, res) {
    let username = req.params.user? req.params.user:req.username;
    Profile.findOne({username: username}).exec(function(err, data) {
        if(data){
            res.status(200).send({username: username, phoneNum: data.phoneNum});
        }else{
            res.status(400).send({result:"invalid username"})
        }
        
    })
}

function updatePhoneNum(req, res) {
    Profile.updateOne({username: req.username}, {$set:{phoneNum: req.body.phoneNum}}, function(err, data) {
        res.status(200).send({username: req.username, phoneNum: req.body.phoneNum})
    })
}

module.exports = (app) => {
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.get('/headline/:user?', getHeadline);
    app.put('/headline', updateHeadline);
    app.get('/email/:user?', getEmail);
    app.put('/email', updateEmail);
    app.get('/zipcode/:user?', getZipcode);
    app.put('/zipcode', updateZipcode);
    app.get('/dob/:user?', getBirthday);
    app.get('/avatar/:user?', getAvatar);
    app.put('/avatar', uploadImage('avatar'),updateAvatar);
    app.put('/password', updatePassword);
    app.get('/username', getUsername);
    app.get('/phoneNum/:user?', getPhoneNum);
    app.put('/phoneNum', updatePhoneNum);
}
