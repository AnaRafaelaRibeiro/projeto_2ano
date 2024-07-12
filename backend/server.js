const express = require("express");
const app = express();
const ProdutoRoutes = require("./src/routes/ProdutoRoutes");
const Gestor = require('./src/routes/GestorRoutes');
const Compra = require('./src/routes/CompraRoutes');
const Orcamento = require('./src/routes/OrcamentoRoutes');
const PackProduto = require('./src/routes/PackProdutoRoutes');

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

//Rotas
//Produtos
app.use("/api/produtos/", ProdutoRoutes);

//Gestor
app.use("/api/gestor/", Gestor);

//Compra
app.use("/api/compra/", Compra)

//Orcamento
app.use("/api/orcamento/", Orcamento)

//PackProduto
app.use("/api/packproduto/", PackProduto)

//Porta em que o servidor se vai ligar
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
