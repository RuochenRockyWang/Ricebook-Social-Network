const mongoose = require('mongoose');
const url = 'mongodb+srv://RuochenRockyWang:<password>@clusterinclass.q4yhsub.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(url);

const profileSchema = new mongoose.Schema({
    username: String,
    headline: String,
    phone: String,
    displayName: String,
    followers: [],
    email: String,
    zipcode: String,
    dob: String,
    avatar: String
})

const articleSchema = new mongoose.Schema({
    author: {
        type: String,
        required: [true, 'author is required']
    },
    text: {
        type: String,
        required: [true, 'text is required']
    },
    date: {
        type: Date,
        required: [true, 'date is required']
    },
    url: {
        type: String,
        required: [false, 'date is not required']
    },
    comments: []
})

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required']
    },
    created: {
        type: Date,
        required: [true, 'Created date is required']
    }
})

exports.Profiles = mongoose.model('profiles',profileSchema)
exports.Articles = mongoose.model('articles',articleSchema)
exports.Users = mongoose.model('users',userSchema)