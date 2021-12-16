const router = require('express').Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads' });
const ProductController = require('./controller');

router.post('/product/', upload.single('image'), ProductController.addProduct);
router.get('/product/', ProductController.getProduct);
router.get('/product/:id', ProductController.getById);
router.put('/product/:id', upload.single('image'), ProductController.updateById);
router.delete('/product/:id', ProductController.deleteById);

module.exports = router;