import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Css/style.css';
import axios from 'axios';
import Navbar from "../admin/Navbar";
import Header from "../components/Header";

const BudgetDetail = () => {
  const [budgetDetails, setBudgetDetails] = useState(null);
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');

  useEffect(() => {
    const fetchBudgetDetails = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/orcamento/1234'); // Ajuste a URL conforme necessário
        setBudgetDetails(response.data);
      } catch (error) {
        console.error('Error fetching budget details:', error);
      }
    };

    fetchBudgetDetails();
  }, []);

  if (!budgetDetails) {
    return <div>Loading...</div>;
  }

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };

  return (
    <div>
      <Navbar />
      <Header />
      <div className="container mt-5">
        <div className="card shadow-sm">
          <div className="card-header">
            <h3>Detalhe do Orçamento</h3>
          </div>
          <div className="card-body">
            <div className="row mb-3">
              <div className="col-md-6">
                <h5>Nome Utilizador:</h5>
                <p>{budgetDetails.userName}</p>
              </div>
              <div className="col-md-6">
                <h5>Contacto:</h5>
                <p>{budgetDetails.contact}</p>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <h5>Status:</h5>
                <p>{budgetDetails.status}</p>
              </div>
              <div className="col-md-6">
                <h5>Orçamento ID:</h5>
                <p>{budgetDetails.id}</p>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <h5>Pedido:</h5>
                <p>{budgetDetails.request}</p>
              </div>
              <div className="col-md-6">
                <h5>Submetido:</h5>
                <p>{budgetDetails.submitted}</p>
              </div>
            </div>
            <div className="mb-3">
              <h5>Email:</h5>
              <p>{budgetDetails.email}</p>
            </div>
            <div className="mb-3">
              <h5>Descrição orçamento:</h5>
              <p>{budgetDetails.description}</p>
            </div>
            <div className="d-flex justify-content-between">
              <button className="btn btn-success">Aceitar</button>
              <button className="btn btn-danger">Recusar</button>
            </div>
          </div>
          <div className="card-footer d-flex justify-content-end">
            <div className="me-3">
              <label className="form-label">Status</label>
              <select className="form-select" value={status} onChange={handleStatusChange}>
                <option>Selecionar Status</option>
                <option value="Em Progresso">Em Progresso</option>
                <option value="Completo">Completo</option>
                <option value="Pendente">Pendente</option>
              </select>
            </div>
            <div>
              <label className="form-label">Prioridade</label>
              <select className="form-select" value={priority} onChange={handlePriorityChange}>
                <option>Selecionar Prioridade</option>
                <option value="Baixa">Baixa</option>
                <option value="Média">Média</option>
                <option value="Alta">Alta</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetDetail;
