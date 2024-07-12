import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Css/style.css";
import Navbar from "./Navbar";
import Header from "../components/Header";

const AddSoftware = () => {
  const [formData, setFormData] = useState({
    nameProduto: "",
    programador: "",
    versaoProduto: "",
    precoProduto: "",
    descricaoProduto: "",
    // imagePath: null,
    // software: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // const handleFileChange = (e) => {
  //   const { name, files } = e.target;
  //   setFormData({ ...formData, [name]: files[0] });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/produtos/criar-produto",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data;
      if (data.success) {
        // Handle successful submission (e.g., clear form, show success message)
      } else {
        // Handle errors (e.g., display error message)
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <Header />
      <div className="container mt-5 add-software">
        <h1 className="text-center mb-4">Adicionar Software</h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
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
          {/* <div className="form-group">
            <label>Image</label>
            <input
              accept="image/*"
              type="file"
              name="imagePath"
              className="form-control-file"
              onChange={handleFileChange}
            />
          </div> */}
          {/* <div className="form-group">
            <label>Software</label>
            <input
              type="file"
              name="software"
              className="form-control-file"
              onChange={handleFileChange}
            />
          </div> */}
          <button type="submit" className="btn btn-primary btn-block">
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSoftware;
