import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Css/style.css';
import axios from 'axios'; // Import axios for API calls
import Navbar from "../admin/Navbar";
import Header from "../components/Header";

const EditSoftware = () => {
  const { id } = useParams(); // Assuming you get software ID from route params

  const [formData, setFormData] = useState({
    nameProduto: '',
    versaoProduto: '',
    precoProduto: '',
    descricaoProduto: '',
  });

  useEffect(() => {
    const fetchSoftwareData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/produtos/get/${id}` // Replace with your API endpoint to fetch software by ID
        );

        const softwareData = response.data;
        setFormData(softwareData); // Set initial state with fetched data
      } catch (error) {
        console.error('Error fetching software data:', error);
        // Handle errors, e.g., display an error message
      }
    };

    fetchSoftwareData();
  }, [id]); // Run effect only when id changes

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Implement logic to send update request to your backend API
    // You'll likely need to modify the data based on your API requirements
    const updatedSoftwareData = {
      ...formData, // Use spread operator to include all form data
      id: id, // Include the ID for update
    };

    try {
      const response = await axios.put(
        `http://localhost:3000/api/produtos/atualizar-produto/${id}`, // Replace with your update API endpoint
        updatedSoftwareData
      );

      if (response.data.success) {
        console.log('Software updated successfully!');
        // Handle successful update, e.g., redirect to software list
      } else {
        console.error('Error updating software:', response.data.error);
        // Handle update errors
      }
    } catch (error) {
      console.error('Error updating software:', error);
      // Handle network or other errors
    }
  };

  return (
    <div>
      <Navbar />
      <Header />
      <div className="container mt-3 add-software">
        <h1 className="text-center mb-4">Editar Software</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nome</label>
            <input
              type="text"
              name="nameProduto"
              className="form-control"
              value={formData.nameProduto}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Versão do Software</label>
            <input
              type="text"
              name="versaoProduto"
              className="form-control"
              value={formData.versaoProduto}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Preço</label>
            <input
              type="text"
              name="precoProduto"
              className="form-control"
              value={formData.precoProduto}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Descrição</label>
            <textarea
              name="descricaoProduto"
              className="form-control"
              value={formData.descricaoProduto}
              onChange={handleChange}
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary btn-block">
            Guardar Alterações
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditSoftware;