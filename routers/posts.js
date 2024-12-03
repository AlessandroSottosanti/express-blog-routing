import express from 'express';
import { postsList } from '../data/postsData.js';
import chalk from 'chalk';

const router = express.Router();

// index posts
router.get('/', (req, res) => {
    res.json(
        {
            games: postsList,
            count: postsList.length
        }
    );
});

// Api di ricerca che filtra in base al parametro passato per titolo
router.get("/ricerca", (req, res) => {
    const title = req.query.title;
    if(title.length >= 1) {
        const titles = postsList.filter((curPost) => curPost.title.toLowerCase().includes(title.toLocaleLowerCase()));

    const postsData = {
        posts: titles,
        total: titles.length
    };

    if(titles.length >= 1){
        res.json(postsData);
    }
    else{
        res.json({
            message: "Error 404, post not found :("
        });

        console.error(chalk.red.bold("Error 404, post not found :("));
    }
    }
    else{
        res.json({
            message: "Error 404, post not found :("
        });
        console.error(chalk.red.bold("Error 404, post not found :("));
    }
    
});

// create 
router.post('/', (req, res) => {
    res.json('aggiungo un nuovo elemento nei miei dati');
});

// show
router.get('/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const post = postsList.find(p => p.id === postId);

    if (post) {
        res.json(post); // Restituisce il post se trovato
    } 
    else {
        res.json({
            message: "Error 404, post not found :("
        });
        console.error(chalk.red.bold("Error 404, post not found :("));    
    }
});

// update
router.put('/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const post = postsList.find(p => p.id === postId);

    if (post) {
        res.json('modifico un intera risorsa nei miei dati tramite id ' + postId);
    } 
    else {
        res.json({
            message: "Error 404, post not found :("
        });
        console.error(chalk.red.bold("Error 404, post not found :("));
    }

});

// modify
router.patch('/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const post = postsList.find(p => p.id === postId);

    if (post) {
        res.json('modifico uno o più parametri di una risorsa nei miei dati tramite id ' + postId);
    } 
    else {
        res.json({
            message: "Error 404, post not found :("
        });
        console.error(chalk.red.bold("Error 404, post not found :("));
    }
});

// destroy
router.delete('/:id', (req, res) => {
    const postId = parseInt(req.params.id);

    const post = postsList.find(p => p.id === postId);

    if (post) {
        res.json('elimino un elemento nei miei dati tramite id ' + postId);
    } 
    else {
        res.json({
            message: "Error 404, post not found :("
        });
        console.error(chalk.red.bold("Error 404, post not found :("));
    }

});


export default router;

