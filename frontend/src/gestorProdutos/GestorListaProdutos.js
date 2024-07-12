import React, { useEffect, useState } from 'react';
import { Sidebar } from './NavbarGestor';
import Header from '../components/Header';
import axios from 'axios';

const CompradorDashboard = ({ children }) => {
  const [softwares, setSoftwares] = useState([]);
  const [packprodutos, setPackProdutos] = useState([]);

  useEffect(() => {
    const fetchSoftwares = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/produtos/lista-produtos');
        setSoftwares(response.data); // Atualiza o estado com os dados obtidos
      } catch (error) {
        console.error('Erro ao buscar softwares:', error);
        // Tratar o erro de forma adequada, ex: exibir uma mensagem de erro
      }
    };

    fetchSoftwares();
  }, []);

  useEffect(() => {
    const fetchPackProdutos = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/packproduto/lista');
        setPackProdutos(response.data); // Atualiza o estado com os dados obtidos
      } catch (error) {
        console.error('Erro ao buscar packs de produtos:', error);
        // Tratar o erro de forma adequada, ex: exibir uma mensagem de erro
      }
    };

    fetchPackProdutos();
  }, []);

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
