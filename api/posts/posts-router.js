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

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { title, contents } = req.body
        const updatedPost = await Post.update(id, {title, contents})
        if(!updatedPost) {
            return res.status(404).json({message: "The post with the specified ID does not exist"})
        }else if(!title || !contents) {
            return res.status(400).json({message: "Please provide title and contents for the post"})
        } else {
            res.status(200).json(updatedPost)
        }
    } catch(err) {
        return res.status(500).json({message:"The post information could not be modified"})
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const deletedPost = await Post.remove(id)
        if(!deletedPost) {
            return res.status(404).json({message: "The post could not be removed"})
        } else {
            res.status(200).json(deletedPost)
        }

    } catch(err) {
        res.status(500).json({message: "The comments information could not be retrieved"})
    }
})





module.exports = router

