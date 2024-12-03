import express from 'express';
import { postsList } from '../data/postsData.js';

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

// show
router.get('/:id', (req, res) => {
    const postId = req.params.id;
    res.json('leggiamo un dato specifico tramite id ' + postId);
});

// create 
router.post('/', (req, res) => {
    res.json('aggiungo un nuovo elemento nei miei dati');
});

// update
router.put('/:id', (req, res) => {
    const postId = req.params.id;
    res.json('modifico un intero elemento nei miei dati tramite id ' + postId);
});

// modify
router.patch('/:id', (req, res) => {
    const postId = req.params.id;
    res.json('modifico uno o più parametri di un elemento nei miei dati tramite id ' + postId);
});

// destroy
router.delete('/:id', (req, res) => {
    const postId = req.params.id;
    res.json('elimino un elemento nei miei dati tramite id ' + postId);
});

// Api di ricerca che filtra in base al parametro passato per titolo
router.get("/ricerca", (req, res) => {
    const title = req.query.title;
    const titles = postsList.filter((curPost) => curPost.title.toLowerCase().includes(title.toLocaleLowerCase()));

    const postsData = {
        posts: titles,
        total: titles.length
    };
    res.json(postsData);
});



export default router;

