import express from 'express';
import postController from '../controllers/postController.js';

const router = express.Router();

// index posts
router.get('/', postController.index);

// show
router.get('/:id', postController.show);

// store 
router.post('/', postController.create);

// update
router.put('/:id', postController.update);

// modify
router.patch('/:id', postController.modify);

// destroy
router.delete('/:id', postController.destroy);


export default router;

