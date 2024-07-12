const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');
const ProdutoController = require("../controllers/ProdutoController");

//multer middleware
const storage = multer.diskStorage({
    destination:(req,file,cb) =>{
        cb(null, path.resolve(__dirname,'C:/ProgramFiles/pi_2ano/client/public/uploads/produtos/imgs'));
    },
    filename:(req,file,cb)=>{
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({storage: storage});

router.get('/lista-produtos', ProdutoController.getAllProdutos);
router.get('/get/:id', ProdutoController.getProdutoById);
router.post('/criar-produto', upload.single('image'), ProdutoController.createProduto);
router.put('/atualizar-produto/:id', ProdutoController.updateProduto);
router.delete('/apagar-produto/:id', ProdutoController.deleteProduto);

module.exports = router;
