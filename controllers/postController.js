import { postsList } from '../data/postsData.js';
import { send404Error } from '../helpers/errorsApi.js';

const index = (req, res) => {

    const tag = req.query.tag;
    let filteredPosts = postsList;

    if(tag) {
        filteredPosts = [];
        postsList.forEach(curPost => {
            curPost.tags.forEach(curTag => {
                if (curTag.toLowerCase() === tag.toLowerCase()) {
                    filteredPosts.push(curPost);
                }
            });
        });
    }

    res.json(
        {
            postsArray: filteredPosts,
            count: filteredPosts.length
        }
    );
}

const show = (req, res) => {
    const postId = parseInt(req.params.id);
    const post = postsList.find(curPost => curPost.id === postId);

    if (post) {
        res.json(post); // Restituisce il post se trovato
    } 
    else {
        send404Error(res, "Error 404, post not found :(");
    }
}

// store
const create = (req, res) => {

    const newId = postsList[postsList.length - 1].id + 1;

    const newPost = {
        id: newId,
        ...req.body
    }

    console.log(newPost);

    postsList.push(newPost);

    console.log(postsList);
    
    res.status(201).json(newPost);
}

const update = (req, res) => {
    const postId = parseInt(req.params.id);
    const postIndex = postsList.findIndex(curPost => curPost.id === postId);

    if (postIndex !== -1) {
        const updatedPost = {
            id: postId,
            ...req.body
        };

        postsList[postIndex] = updatedPost;
        res.json(updatedPost);
    } else {
        send404Error(res, "Error 404, post not found :(");
    }

}

const modify = (req, res) => {
    const postId = parseInt(req.params.id);
    const post = postsList.find(curPost => curPost.id === postId);

    if (post) {
        Object.keys(req.body).forEach(key => {
            if (key !== 'id') {
                post[key] = req.body[key];
            }
        });

        res.json(post);
    } 
    else {
        send404Error(res, "Error 404, post not found :(");
    }
};


const destroy = (req, res) => {
    const postId = parseInt(req.params.id);

    const postIndex = postsList.findIndex(curPost => curPost.id === postId);

    if (postIndex === -1) {
        send404Error(res, "Error 404, post not found :(");
    } 
    else {
        postsList.splice(postIndex, 1)
        res.sendStatus(204);
    }

}

export default {index, show, create, update, modify, destroy};