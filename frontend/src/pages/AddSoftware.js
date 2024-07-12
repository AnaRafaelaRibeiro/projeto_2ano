import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Css/style.css';
import NavbarComponent from '../admin/Navbar'; // Importe o componente Navbar
import Header from '../components/Header'; // Importe o componente Header
import axios from 'axios';

const AddSoftware = () => {
  const [formData, setFormData] = useState({
    nome: '',
    programador: '',
    categoria: '',
    versao: '',
    preco: '',
    descricao: '',
    logotipo: null,
    software: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.keys(formData).forEach(key => {
      formDataToSend.append(key, formData[key]);
    });

    try {
      const response = await axios.post('http://localhost:3000/api/software/adicionar', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data.success) {
        // Handle successful submission (e.g., clear form, show success message)
        console.log("Software adicionado com sucesso!");
      } else {
        // Handle errors (e.g., display error message)
        console.error("Erro ao adicionar software:", response.data.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleLogout = () => {
    // Implementar funcionalidade de logout
    console.log('Logout clicked');
  };

  return (
    <div className="admin-layout">
      <NavbarComponent />
      <Header onLogout={handleLogout} className="header-navbar" />
      <div className="container mt-3 add-software">
        <h1 className="text-center mb-4">Adicionar Software</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nome</label>
            <input type="text" name="nome" className="form-control" value={formData.nome} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Categoria</label>
            <input type="text" name="categoria" className="form-control" value={formData.categoria} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Versão do Software</label>
            <input type="text" name="versao" className="form-control" value={formData.versao} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Preço</label>
            <input type="text" name="preco" className="form-control" value={formData.preco} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Descrição</label>
            <textarea name="descricao" className="form-control" value={formData.descricao} onChange={handleChange}></textarea>
          </div>
          <div className="form-group">
            <label>Logotipo</label>
            <input type="file" name="logotipo" className="form-control-file" onChange={handleFileChange} />
          </div>
          <div className="form-group">
            <label>Software</label>
            <input type="file" name="software" className="form-control-file" onChange={handleFileChange} />
          </div>
          <button type="submit" className="btn btn-primary btn-block">Guardar</button>
        </form>
      </div>
    </div>
  );
};

export default AddSoftware;
