import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Css/style.css";
import axios from "axios"; // Import axios for API calls
import Navbar from "../admin/Navbar";
import Header from "../components/Header";

const EditSoftware = () => {
  const { id } = useParams(); // Assuming you get software ID from route params

  const [formData, setFormData] = useState({
    cliente: "",
    numTel: "",
    quantidade: "",
    status: "",
    data: "",
    action: "",
    email: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/orcamento/get/${id}` // Replace with your API endpoint to fetch software by ID
        );

        const data = response.data;
        setFormData(data); // Set initial state with fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle errors, e.g., display an error message
      }
    };

    fetchData();
  }, [id]); // Run effect only when id changes

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Implement logic to send update request to your backend API
    // You'll likely need to modify the data based on your API requirements
    const updatedData = {
      ...formData, // Use spread operator to include all form data
      id: id, // Include the ID for update
    };

    try {
      const response = await axios.put(
        `http://localhost:3000/api/orcamento/atualizar/${id}`, // Replace with your update API endpoint
        updatedData
      );

      if (response.data.success) {
        console.log("Updated successfully!");
        // Handle successful update, e.g., redirect to software list
      } else {
        console.error("Error updating:", response.data.error);
        // Handle update errors
      }
    } catch (error) {
      console.error("Error updating:", error);
      // Handle network or other errors
    }
  };

  return (
    <div>
      <Navbar />
      <Header />
      <div className="container mt-3 add-software">
        <h1 className="text-center mb-4">Editar Orcamento</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Cliente</label>
            <input
              type="text"
              name="cliente"
              className="form-control"
              value={formData.cliente}
              onChange={handleChange}
              disabled
            />
          </div>
          <div className="form-group">
            <label>Num. Telemóvel</label>
            <input
              type="text"
              name="numTel"
              className="form-control"
              value={formData.numTel}
              onChange={handleChange}
              disabled
            />
          </div>
          <div className="form-group">
            <label>Quantidade</label>
            <input
              type="text"
              name="quantidade"
              className="form-control"
              value={formData.quantidade}
              onChange={handleChange}
              disabled
            />
          </div>
          <div className="form-group">
            <label>Status (Aceite, Pendente, Negado)</label>
            <input
              name="status"
              className="form-control"
              value={formData.status}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Data</label>
            <input
              name="data"
              className="form-control"
              value={formData.data}
              onChange={handleChange}
              disabled
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              disabled
            />
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
