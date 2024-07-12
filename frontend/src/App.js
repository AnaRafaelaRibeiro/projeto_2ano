// src/App.js
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Registar from "./components/Registar";
import Home from "./pages/Home";
import AdminLayout from "./admin/AdminDashboard";
import CompradorDashboard from "./comprador/DashboardCompra";
import GestorDashboard from "./gestorProdutos/gestordashboard";
import "./App.css";
import HistoricoAdmin from "./admin/HistoricoAdmin";
import AddSoftware from "./admin/AddSoftware";
import SoftwareList from "./pages/SoftwareList";
import EditSoftware from "./pages/EditSoftware";
import AccountType from "./pages/AccountType";
import ProductPage from "./pages/ProductPage";
import AddProductManager from "./pages/AddProductManager";
import ListaProdutos from "./comprador/ListaProdutos";
import GestorListaProdutos from "./gestorProdutos/GestorListaProdutos";
import Produtos from "./pages/Produtos";
import Orcamentos from "./pages/Orcamentos";
import DetalhesOrcamentos from "./pages/DetalhesOrcamentos";
import BoughtProducts from "./pages/ProdutosComprados";
import EditarOrcamento from "./pages/EditOrcamento";
import PackPage from "./pages/PacksPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registar" element={<Registar />} />
        <Route path="/admindashboard" element={<AdminLayout></AdminLayout>} />
        <Route path="/admin/add-software" element={<AddSoftware />} />
        <Route path="/admin/softwareList" element={<SoftwareList />} />
        <Route path="/admin/softwareEdit/:id" element={<EditSoftware />} />
        <Route path="/account-type" element={<AccountType />} />
        <Route path="/softwares/:id" element={<ProductPage />} />
        <Route path="/packprodutos/:id" element={<PackPage />} />
        <Route
          path="/comprador/adicionargestor"
          element={<AddProductManager />}
        />
        <Route path="/comprador/listaprodutos" element={<ListaProdutos />} />
        <Route path="/gestor/listaprodutos" element={<GestorListaProdutos />} />
        <Route
          path="/compradordashboard"
          element={<CompradorDashboard />}
        />{" "}
        {/* Rota para CompradorDashboard */}
        <Route path="/gestordashboard" element={<GestorDashboard />} />{" "}
        {/* Rota para CompradorDashboard */}
        <Route path="/admin/historico" element={<HistoricoAdmin />} />{" "}
        {/* Rota para CompradorDashboard */}
        <Route path="/gestor/produtos" element={<Produtos />} />
        <Route path="/admin/orcamentos" element={<Orcamentos />} />
        <Route path="/admin/detalhes-orcamento/:id" element={<DetalhesOrcamentos />} />
        <Route path="/comprador/produtoscomprados" element={<BoughtProducts />} />
        <Route path="/admin/editar-orcamento/:id" element={<EditarOrcamento/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
