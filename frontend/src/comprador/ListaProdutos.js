import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from './NavbarComprador';
import Header from '../components/Header';
import axios from 'axios';

const CompradorDashboard = ({ children }) => {
  const [softwares, setSoftwares] = useState([]);
  const [packprodutos, setPackProdutos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSoftwares = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/produtos/lista-produtos');
        setSoftwares(response.data);
      } catch (error) {
        console.error('Error fetching softwares:', error);
      }
    };

    fetchSoftwares();
  }, []);

  useEffect(() => {
    const fetchPackProdutos = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/packproduto/lista');
        setPackProdutos(response.data);
      } catch (error) {
        console.error('Error fetching packprodutos:', error);
      }
    };

    fetchPackProdutos();
  }, []);

  const handleBuySoftware = (id) => {
    const buyUrl = `/softwares/${id}`;
    navigate(buyUrl);
  };

  const handleBuyPackProduto = (id) => {
    const buyUrl = `/packprodutos/${id}`;
    navigate(buyUrl);
  };

  const handleLogout = async () => {
    console.log('Logout realizado');
  };

  return (
    <div className="admin-layout">
      <Header onLogout={handleLogout} className="header-navbar" />
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="main-content">
        <div className="container mt-5">
          <h1 className="mb-4">Lista de Softwares</h1>
          <table className="table table-striped">
            <thead className="thead-dark">
              <tr>
                <th>Nome</th>
                <th>Versão</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {softwares.map((software) => (
                <tr key={software.idProduto}>
                  <td>{software.nameProduto}</td>
                  <td>{software.versaoProduto}</td>
                  <td className="align-middle">
                    <div className="d-flex align-items-center">
                      <button className="btn btn-primary btn-sm mr-2" onClick={() => handleBuySoftware(software.idProduto)}>comprar</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="container mt-5">
          <h1 className="mb-4">Lista de Packs</h1>
          <table className="table table-striped">
            <thead className="thead-dark">
              <tr>
                <th>Nome</th>
                <th>Versão</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {packprodutos.map((packproduto) => (
                <tr key={packproduto.idPackProduto}>
                  <td>{packproduto.nomePackProduto}</td>
                  <td>{packproduto.versoesPackProduto}</td>
                  <td className="align-middle">
                    <div className="d-flex align-items-center">
                      <button className="btn btn-primary btn-sm mr-2" onClick={() => handleBuyPackProduto(packproduto.idPackProduto)}>comprar</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CompradorDashboard;
