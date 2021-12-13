require('dotenv').config()

const express = require('express')
const app = express()

const jwt = require ('jsonwebtoken')

app.use(express.json())


const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

const posts = [
    {
        username: 'Paul',
        title: 'Post 1'
    },
    {
        username: 'Flo',
        title: 'Post 2'
    },
    {
        username: 'John',
        title: 'Post 3'
    }
]

app.get('/posts', authenticateToken, (req, res) => {
    res.json(posts.filter(post => post.username === req.user.name))

})


app.listen(3000)