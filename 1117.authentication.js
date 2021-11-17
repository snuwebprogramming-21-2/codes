const express = require('express');
const crypto = require('crypto');
const mongoose = require('mongoose');
const { Schema } = mongoose;
const app = express();
const port = 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());


const mongoURL = 'mongodb+srv://test0:test0@testmongo.kfy77.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(mongoURL);

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    token: String,
});

const taskSchema = new Schema({
    title: String,
    description: String,
});

userSchema.methods.generateToken = async function() {
    this.token = crypto.createHash('sha512').update(crypto.randomBytes(20)).digest('base64');
    await this.save();
    return this.token;
}

const User = mongoose.model('User', userSchema) ;
const Task = mongoose.model(Task, taskSchema);

app.post('/register', async (req, res) => {
    const {name, email, password} = req.body;
    const user = new User({email, password, name});
    await user.save();

    res.sendStatus(200);
});

app.post('/login', async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email, password});

    if (user !== null) {
        const token = await user.generateToken();
        res.send({token});
    } else {
        res.sendStatus(404);
    }
});

app.get('/token', async (req, res) => {
    const loginKeyString = req.headers.authorization;
    const [bearer, token] = loginKeyString.split(' ');
    if (bearer !== 'Bearer') {
        return res.sendStatus(400);
    }

    const user = await User.findOne({ token });

    if (user === null) {
        return res.sendStatus(404);
    }

    res.send({
        name: user.name,
    });
})

app.get('/tasks', async (req, res)=> {

});

app.post('/tasks', async (req, res)=> {

});

app.get('/tasks/:taskId', async (req, res)=> {

});

app.put('/tasks/:taskId', async (req, res)=> {

});

app.delete('/tasks/:taskId', async (req, res)=> {

});

app.listen(port, ()=> {
    console.log(`listening at port: ${port}...`);
})
