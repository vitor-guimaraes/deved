const express = require ('express');
const router = express.Router ();
const Post = require('../models/Post');


//GET ALL POSTS
/*router.get('/', (req, res) => {
    res.send('ON POSTS PAGE');
});*/ 
//SUBSTITUIDO ABAIXO
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch(err) {
        res.json({ message: err });
    }
});

//SUBMIT A POST
router.post('/', async (req, res) => {
    //console.log(req.body);
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });

    //PROMISSE
    //SUBSTITUIDO PELO CODIGO ABAIXO
    /*post.save()
    .then(data => {
        res.status(200).json(data);
    })
    .catch(err => {
        res.json({ message:err });
    });*/
    try {
        const savedPost = await post.save(); //LEMBRAR DE ADICIONAR O ASYNC LÁ EM CIMA
        res.json(savedPost);
    } catch {
        res.json({ message:err });
    }
});

//GET SPECIFIC POST
router.get ('/:postId', async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        res.json(post);
    } catch (err) {
        res.json({ message: err });
    }
});

//UPDATE POST
router.patch ('/:postId', async (req, res) => {
    try {
        const updatedPost = await Post.updateOne({ _id: req.params.postId }, { $set: { title: req.body.title } });
        res.json(updatedPost);
    } catch (err) {
        res.json( {message: err })
    }
});

//DELET POST
router.delete('/:postId', async (req, res) => {
  try {
    const removedPost = await Post.remove({ _id: req.params.postId });
    res.json(removedPost);
  } catch (err) {
      res.json ( { message: err });
  }
})

module.exports = router;