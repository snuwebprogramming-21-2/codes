const express = require('express');
const fs = require('fs');
const app = express();
const Post = require('./Post');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
const port = 3000;

const postsFilePath = './posts.json';
const _posts = JSON.parse(fs.readFileSync(postsFilePath, 'utf-8'));
const posts = _posts.map(_post =>
    new Post(_post.id, _post.title, _post.description, _post.isDeleted)
);

// 글 목록 보여주기 Read
app.get('/posts', (req, res) => {
    const _posts = posts.filter(post => !post.isDeleted).map(post => {
        return {
            id: post.id,
            title: post.title,
        }
    });
    res.send(_posts);
})

// 글 작성. Create
app.post('/posts', (req, res) => {
    const {title, description} = req.body;
    const post = new Post(posts.length + 1, title, description);
    posts.push(post);
    fs.writeFileSync(postsFilePath, JSON.stringify(posts));

    res.send(post);
})

// 작성 글 보기
app.get('/posts/:id', (req, res) => {
    const { id } = req.params;
    const post = posts.find(e => e.id === parseInt(id));
    if (post)
        res.send(post);
    else
        res.sendStatus(404);
})

app.put('/posts/:id', (req, res) => {
    const { id } = req.params;
    const post = posts.find(e => e.id === parseInt(id));

    const { title, description} = req.body;
    post.edit(title, description);

    fs.writeFileSync(postsFilePath, JSON.stringify(posts));
    res.send(post);
})

// 작성 글 삭제
app.delete('/posts/:id', (req, res) => {
    const { id } = req.params;
    const post = posts.find(e => e.id === parseInt(id));
    post.delete();

    fs.writeFileSync(postsFilePath, JSON.stringify(posts));
    res.send(post);
})

app.listen(port, ()=> {
    console.log(`listening at port: ${port}...`);
})





