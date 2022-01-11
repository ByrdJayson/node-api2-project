/* eslint-disable no-unused-vars */
// implement your posts router here
const express = require('express')
const router = express.Router()

const Post = require('./posts-model.js')


router.get('/', (req, res) => {
    Post.find()
    .then(post => {
        res.status(200).json(post)
    })
    .catch(err => {
        res.status(500).json({message: "The posts information could not be retrieved"})
    })
})

router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
    .then(post => {
        if(!post){
            res.status(404).json({message: "The post with the specified ID does not exist"})
        } else {
            res.status(200).json(post)
        }
    })
})

router.post('/', async (req, res) => {
    try {
        const { title, contents } = req.body
        const newPost = await Post.insert({title, contents})

        if(!title || !contents) {
            return res.status(400).json({message: "Please provide title and contents for the post"})
        }
        return res.status(201).json(newPost)
    } catch(err) {
        return res.status(500).json({message: "There was an error while saving the post to the database"})
    }
})





module.exports = router

