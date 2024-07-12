import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import NavbarComponent from '../admin/Navbar';
import Header from '../components/Header';
import '../Css/style.css'; // Importe seu arquivo de estilo CSS aqui
import { useNavigate } from 'react-router-dom';

const SoftwareList = () => {
  const [softwares, setSoftwares] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/produtos/lista-produtos"
        );
        setSoftwares(response.data); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching products:", error);
        // Handle error gracefully, e.g., display an error message
      }
    };

    fetchData();
  }, []);
  
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/produtos/apagar-produto/${id}`
      );
      if (response.data.success) {
        // Update state immediately to remove the deleted software from UI
        setSoftwares(softwares.filter(software => software.idProduto !== id));
        console.log(`Software with id ${id} deleted successfully!`);
      } else {
        console.error("Error deleting software:", response.data.error);
        // Handle delete error, e.g., display an error message
      }
    } catch (error) {
      console.error("Error deleting software:", error);
      // Handle network or other errors
    }
  };

  const handleEdit = (id) => {
    // Construct the edit page URL with the software ID
    const editUrl = `/admin/softwareEdit/${id}`; // Replace with your actual edit route pattern
  
    // Use useNavigate hook for navigation
    navigate(editUrl);
  };

  const handleLogout = () => {
    // Implement logout functionality
    console.log('Logout clicked');
  };

  return (
    <div> 
      <NavbarComponent />
      <Header onLogout={handleLogout} className="header-navbar" />

      <div className="softwareList"> {/* Utilize uma margem superior menor */}
        <h1 className="mb-4">Lista de Softwares</h1>
        <table className="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th>Softwares</th>
              <th>Versão</th>
              <th>Gestão</th>
              <th>Última Atualização</th>
            </tr>
          </thead>
          <tbody>
            {softwares.map((software) => (
              <tr key={software.idProduto}>
                <td>{software.nameProduto}</td>
                <td>{software.versaoProduto}</td>
                <td className="align-middle">
                  <div className="d-flex align-items-center">
                    <button className="btn btn-primary btn-sm me-2" onClick={() => handleEdit(software.idProduto)}>Editar</button> {/* Utilize `me-2` para margin-right */}
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(software.idProduto)}>Eliminar</button>
                  </div>
                </td>
                <td>{software.lastUpdate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SoftwareList;
