import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Sidebar from './Navbar';
import Header from '../components/Header';

const PurchaseHistory = () => {
  const [compras, setCompras] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/compra/lista-compra"
        );
        setCompras(response.data); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching products:", error);
        // Handle error gracefully, e.g., display an error message
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Histórico de Compras</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Email</th>
            <th>Data</th>
            <th>Softwares</th>
          </tr>
        </thead>
        <tbody>
          {compras.map((compra, index) => (
            <tr key={index}>
              <td>{compra.email}</td>
              <td>{compra.data}</td>
              <td>{compra.software}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

const HistoricoAdmin = ({ children }) => {
  return (
    <div className="admin-layout">
      <Header />
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="main-content">
        <div className="content p-4">
          <PurchaseHistory />
          {children}
        </div>
      </div>
    </div>
  );
};

export default HistoricoAdmin;