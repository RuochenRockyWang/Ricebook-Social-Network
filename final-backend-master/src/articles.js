const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const articleSchema = require('./articleSchema');
const Article = mongoose.model('Article', articleSchema);
const profileSchema = require('./profileSchema');
const Profile = mongoose.model('Profile', profileSchema);
const connectionString = "mongodb+srv://rockyhw6:jcsywrc991019@clusterinclass.q4yhsub.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(connectionString)

const stubArticle = {
    pid: 30000,
    author: 'Bret',
    text: "one article stub",
    date: new Date(),
    comments: [],
}

function getArticle(req, res) {
    let id = req.params.id;
    if (id) {
        Article.find({author: id, disabled: false}).exec(function(err, data) {
            if (data.length > 0) {
                return res.status(200).send({articles: data});
            } else if (!isNaN(Number(id))) {
                Article.find({pid: id}).exec(function(err, data) {
                   
                    return res.status(200).send({articles: data});
                })
            }
            else {
                return res.status(200).send({articles: []});
            }
        })
    } else {
        // Article.find({author: req.username, disabled: false}).exec(function(err, data) {
        //     return res.status(200).send({articles: data});
        // })
        Profile.findOne({username: req.username}).exec(function(err, data) {
            let followingList = [req.username, ... data.followingList]
            Article.find({author:{$in: followingList}}).sort('-date').exec(function(err, data) {
                return res.status(200).send({articles: data});
            })
           
        })
    }
}

function putArticle(req, res) {
    let id = req.params.id;
    let commentId = req.body.commentId;
    let username = req.username;
    let text = req.body.text;
    if (!commentId) {
        Article.updateOne({pid: id}, {$set: {text: text}}, function(err, data) {
            if (data.matchedCount > 0) {
                Article.find({pid: id}).exec(function(err, data) {
                    return res.status(200).send({articles: data});
                })
            } else {
                return res.status(200).send({result: "article"});
            }
        })
    } else if (commentId == -1) {
        Article.updateOne({pid: id}, {$push: {comments: {author: username, text: text, date: new Date()}}}, function(err, data) {
            Article.find({pid: id}).exec(function(err, data) {
                return res.status(200).send({articles: data});
            })
        })
    } else {
        Article.find({pid: id}).exec(function(err, data) {
            if (data[0].author != username) {
                return res.status(200).send({result: "no permission"});
            } else {
                let newComment = {
                    author: username,
                    text: text,
                    date: new Date()
                }
                data[0].comments[commentId] = newComment;
                Article.updateOne({pid:id}, {$set: {comments: data[0].comments}}, function(err, data) {
                    Article.find({pid: id}).exec(function(err, data) {
                        return res.status(200).send({articles: data});
                    })
                })
            }
        })
    }
  
}

function addArticle(req, res) {
    Article.find().exec(function(err, articles) {
        var ID = 1;
        if(articles){
            ID = articles.length+1
        }
        var nowDate = new Date();
        new Article({
            // pid: articles[articles.length - 1].pid + 1,
            pid: ID,
            author: req.username,
            text: req.body.text,
            date: nowDate.toLocaleString(),
            comments: [],
            imgUrl: "https://images.unsplash.com/photo-1668457248689-7d52055d6171?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
        }).save(function(err, data) {
            Article.find({author: req.username}).exec(function (err, data) {
                return res.status(200).send({articles: data});
            })
        })
    })
}



module.exports = (app) => {
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.get('/articles/:id?', getArticle);
    app.put('/articles/:id', putArticle);
    app.post('/article', addArticle);
    
}