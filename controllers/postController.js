import { postsList } from '../data/postsData.js';
import chalk from 'chalk';


const newPost = {
    id: postsList.length + 1,
    title: "New Hardcoded Post",
    content: "This is a hardcoded post content.",
    image: "https://via.placeholder.com/150",
    tags: ["hardcoded", "example"]
};

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
        res.statusCode = 404;
        res.json({
            error: true,
            message: "Error 404, post not found :("
        });
        console.error(chalk.red.bold("Error 404, post not found :("));    
    }
}

const create = (req, res) => {
    postsList.push(newPost);
    res.status(201).json(newPost);
}

const update = (req, res) => {
    const postId = parseInt(req.params.id);
    const postIndex = postsList.findIndex(curPost => curPost.id === postId);

    if (postIndex !== -1) {
        const updatedPost = {
            id: postId,
            title: newPost.title,
            content: newPost.content,
            image: newPost.image,
            tags: newPost.tags
        };

        postsList[postIndex] = updatedPost;
        res.json(updatedPost);
    } else {
        res.status(404).json({
            error: true,
            message: "Error 404, post not found :("
        });
        console.error(chalk.red.bold("Error 404, post not found :("));
    }

}

const modify = (req, res) => {
    const postId = parseInt(req.params.id);
    const post = postsList.find(curPost => curPost.id === postId);

    if (post) {
        post.title = newPost.title;
        post.tags.push(newPost.tags[0]);

        res.json(post);
        } 
    else {
        res.statusCode = 404;
        res.json({
            error: true,
            message: "Error 404, post not found :("
        });
        console.error(chalk.red.bold("Error 404, post not found :("));
    }
}

const destroy = (req, res) => {
    const postId = parseInt(req.params.id);

    const postIndex = postsList.findIndex(curPost => curPost.id === postId);

    if (postIndex === -1) {
        res.statusCode = 404;
        res.json({
            error: true,
            message: "Error 404, post not found :("
        });
        console.error(chalk.red.bold("Error 404, post not found :("));
    } 
    else {
        postsList.splice(postIndex, 1)
        res.sendStatus(204);
    }

}

export default {index, show, create, update, modify, destroy};