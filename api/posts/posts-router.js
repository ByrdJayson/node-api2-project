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
    const { title, contents } = req.body
    
    if(!title || !contents){
        res.status(400).json({message: "Please provide title and contents for the post"})
    } else {
        Post.insert({title, contents})
        .then(({id}) => {
            return Post.findById(id)
        })
        .then(post => {
            res.status(201).json(post)
        })
        .catch(err => {
            res.status(500).json({message: "There was an error while saving the post to the database", err: err.message})
        })
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params
    const { title, contents } = req.body
    
    try {
        const updatedPost = await Post.update(id, req.body)
        if(!updatedPost) {
            res.status(404).json({message: "The post with the specified ID does not exist"})
        }else if(!title || !contents) {
            res.status(400).json({message: "Please provide title and contents for the post"})
        } else {
            res.status(200).json(updatedPost)
        }
    } catch(err) {
        res.status(500).json({message:"The post information could not be modified"})
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const post = await Post.findById(id)
        if(!post) {
            res.status(404).json({message: "The post with the specified ID does not exist"})
        } else {
            await Post.remove(id)
            res.status(200).json(post)
        }

    } catch(err) {
        res.status(500).json({message: "The post could not be removed"})
    }
})

router.get('/:id/comments', async (req, res) => {
    const { id } = req.params

    try {
        const comments = await Post.findPostComments(id)
        if(!comments){
            res.status(404).json({
                message: "The post with the specified ID does not exist"
            })
        } else {
            res.json(comments)
        }
    }
    catch (err) {
        res.status(500).json({
            message: "The comments information could not be retrieved" ,
            error: err.message,
        })
    }
})





module.exports = router

