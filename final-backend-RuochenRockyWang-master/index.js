const express = require('express');
const cookieParser = require('cookie-parser');
const auth = require("./src/auth")
const mongoose = require('mongoose');
const userSchema = require('./src/userSchema');
const User = mongoose.model('User', userSchema);
const bodyParser = require('body-parser');
const articles = require("./src/articles");
const profile = require("./src/profile");
const following = require("./src/following");
const cors = require('cors')
const corsOptions = {
    // origin: "http://127.0.0.1:4200",
    // origin: "https://localhost:3001",
    origin: "https://rockybookfinal.surge.sh",
    credentials: true
};
const connectionString = 'mongodb+srv://rockyhw6:jcsywrc991019@clusterinclass.q4yhsub.mongodb.net/?retryWrites=true&w=majority';
// lets' go
const addUser = (req, res) => {
     (async () => {
         const connector = mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
         // TODO: add a user to the database
         let newUser = await (connector.then(()=> {
             return new User({username: req.params.uname, created:Date.now()}).save();
         }));
         res.send({name: newUser.username}.save());
     })();
 
 };
const app = express();

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());

app.get('', (req, res) =>{
     res.send("inhere");
});

app.post('/users/:uname', addUser);

auth(app);
articles(app);
profile(app);
following(app);

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
     const addr = server.address();
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
});