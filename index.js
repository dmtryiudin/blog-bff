import express from 'express'
import cors from 'cors'
import FormData from 'form-data'
import {auth, getUserByToken} from './auth.js'
import {createUser, deleteUser, getAllUsers, getUserWithPosts, updateUserAvatar, updateUserData} from "./users.js";
import {
    createPost,
    deletePost,
    getAllPosts,
    getPostWithComments,
    setPostLike,
    updatePost,
    updatePostImage
} from "./posts.js";
import upload from 'express-fileupload'
import {addComment, deleteComment, updateComment, setCommentLike} from "./comments.js";
import {getLocation} from "./location.js";
import { cacheAllPosts, cacheAllUsers, cacheLocation, cachePost, cacheUser, clearAllCache } from './cacheing.js';

const PORT = process.env.PORT ?? 3001

const app = express()
app.use(express.json());
app.use(cors())
app.use(upload())

//==============================================================================
app.get('/', (req, res)=>{
    res.send('bff')
})
//===================================AUTH========================================

app.post('/auth', (req, res)=>{
    auth(req.body)
        .then(result=>{
            if(result.error){
                res.status(result.data.status);
                res.send(result.data.data)
            }

            else {
                res.send(result.data)
            }
        })
})

app.get('/auth', (req, res)=>{
    getUserByToken(req.headers)
        .then(result=>{
            if(result.error){
                res.status(result.data.status);
                res.send(result.data.data)
            }

            else {
                res.send(result.data)
            }
        })
})
//===================================USERS========================================

app.post('/users', (req, res)=>{
    createUser(req.body)
        .then(result=>{
            if(result.error){
                res.status(result.data.status);
                res.send(result.data.data)
            }

            else {
                res.send(result.data)
            }
        })
})

app.get('/users', (req, res)=>{
    cacheAllUsers.cache(getAllUsers, req.query?.substr)
        .then(result=>{
            if(result.error){
                res.status(result.data.status);
                res.send(result.data.data)
            }

            else {
                res.send(result.data)
            }
        })
})

app.get('/users/:id', (req, res)=>{
    cacheUser.cache(getUserWithPosts, req.params.id)
        .then(result=>{
            if(result.error){
                res.status(result.data.status);
                res.send(result.data.data)
            }

            else {
                res.send(result.data)
            }
        })
})

app.delete('/users/:id', (req, res)=>{
    deleteUser(req.params.id, req.headers)
        .then(result=>{
            if(result.error){
                res.status(result.data.status);
                res.send(result.data.data)
            }

            else {
                res.send(result.data)
            }
        })
})

app.patch('/users/:id', (req, res)=>{
    updateUserData(req.params.id, req.body, req.headers)
        .then(result=>{
                if(result.error){
                    res.status(result.data.status);
                    res.send(result.data.data)
                }

                else {
                    res.send(result.data)
                }
            })
})

app.patch('/users/avatar/:id', (req, res)=>{
    const form = new FormData()
    form.append('avatar', req.files?.avatar?.data, req.files?.avatar?.name);

    updateUserAvatar(req.params.id, form, req.headers)
        .then(result=>{
            if(result.error){
                res.status(result.data.status);
                res.send(result.data.data)
            }

            else {
                res.send(result.data)
            }
        })
})

//===================================POSTS=======================================

app.post('/posts', (req, res)=>{
    createPost(req.body, req.headers)
        .then(result=>{
            if(result.error){
                res.status(result.data.status);
                res.send(result.data.data)
            }

            else {
                res.send(result.data)
            }
        })
})

app.patch('/posts/image/:id', (req, res)=>{
    const form = new FormData()
    form.append('image', req.files?.image?.data, req.files?.image?.name);

    updatePostImage(req.params.id, form, req.headers)
        .then(result=>{
            if(result.error){
                res.status(result.data.status);
                res.send(result.data.data)
            }

            else {
                res.send(result.data)
            }
        })
})

app.get('/posts', (req, res)=>{
    cacheAllPosts.cache(getAllPosts, req.query)
        .then(result=>{
            if(result.error){
                res.status(result.data.status);
                res.send(result.data.data)
            }

            else {
                res.send(result.data)
            }
        })
})

app.get('/posts/:id', (req, res)=>{
    cachePost.cache(getPostWithComments, req.params.id)
        .then(result=>{
            if(result.error){
                res.status(result.data.status);
                res.send(result.data.data)
            }

            else {
                res.send(result.data)
            }
        })
})

app.delete('/posts/:id', (req, res)=>{
    deletePost(req.params.id, req.headers)
        .then(result=>{
            if(result.error){
                res.status(result.data.status);
                res.send(result.data.data)
            }

            else {
                res.send(result.data)
            }
        })
})

app.patch('/posts/:id', (req, res)=>{
    updatePost(req.params.id, req.body, req.headers)
        .then(result=>{
            if(result.error){
                res.status(result.data.status);
                res.send(result.data.data)
            }

            else {
                res.send(result.data)
            }
        })
})

app.put('/posts/like/:id', (req, res)=>{
    setPostLike(req.params.id, req.headers)
        .then(result=>{
            if(result.error){
                res.status(result.data.status);
                res.send(result.data.data)
            }

            else {
                res.send(result.data)
            }
        })
})

//==================================COMMENTS====================================================

app.post('/comments/:id', (req, res)=>{
    addComment(req.params.id, req.body, req.headers)
        .then(result=>{
            if(result.error){
                res.status(result.data.status);
                res.send(result.data.data)
            }

            else {
                res.send(result.data)
            }
        })
})

app.delete('/comments/:id', (req, res)=>{
    deleteComment(req.params.id, req.headers)
        .then(result=>{
            if(result.error){
                res.status(result.data.status);
                res.send(result.data.data)
            }

            else {
                res.send(result.data)
            }
        })
})

app.patch('/comments/:id', (req, res)=>{
    updateComment(req.params.id, req.body, req.headers)
        .then(result=>{
            if(result.error){
                res.status(result.data.status);
                res.send(result.data.data)
            }

            else {
                res.send(result.data)
            }
        })
})

app.put('/comments/like/:id', (req, res)=>{
    setCommentLike(req.params.id, req.headers)
        .then(result=>{
            if(result.error){
                res.status(result.data.status);
                res.send(result.data.data)
            }

            else {
                res.send(result.data)
            }
        })
})

//=====================================LOCATION========================================

app.get('/location', (req, res)=>{
    cacheLocation.cache(getLocation, req.query?.ip)
        .then(result=>{
            if(result.error){
                res.status(result.data.status);
                res.send(result.data.data)
            }

            else {
                res.send(result.data)
            }
        })
})

//=======================================404==================================================

app.all('*', (req, res) => {
    res.status(404);
    res.send({error: 'route not found'})
})

//============================================================================================

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}...`)
    setInterval(clearAllCache, 8640000)
})