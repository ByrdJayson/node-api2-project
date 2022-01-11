// implement your server here
const express = require('express')
const postRouter = require('./posts/posts-router')

const server = express()

server.use(express.json())
server.use('/api/posts', postRouter)



module.exports = server
