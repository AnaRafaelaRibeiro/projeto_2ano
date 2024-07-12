import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "../Css/style.css";
import axios from "axios";
import Navbar from "../admin/Navbar";
import Header from "../components/Header";

function DetalhesOrcamentos() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [budget, setBudget] = useState({
    cliente: "",
    numTel: "",
    quantidade: "",
    status: "",
    data: "",
    email: "",
    logo: "/UserDefault.png",
    nota: "",
  });

  useEffect(() => {
    const fetchBudgetDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/orcamento/get/${id}`);
        const data = response.data;
        setBudget(data);
      } catch (error) {
        console.error("Error fetching budget details:", error);
        // Handle error gracefully, e.g., display an error message
      }
    };

    fetchBudgetDetails();
  }, [id]);

  const handleEdit = () => {
    // Construct the edit page URL with the software ID
    const editUrl = `/admin/editar-orcamento/${id}`; // Replace with your actual edit route pattern

    navigate(editUrl);
  };

  return (
    <div>
      <Navbar />
      <Header />
      <div className="detalhes-background">
        <h1 className="titleh1">Detalhes do Orçamento</h1>

        <div className="navigation">
          <Link to="/admin/orcamentos">Orçamentos</Link> {">"} Detalhes do Orçamento
        </div>

        <div className="budget-details">
          <div className="user-info">
            <div className="user-text">
              <div className="detail-item">
                <strong>Nome:</strong> {budget.cliente}
              </div>
              <div className="detail-item">
                <strong>Email:</strong> {budget.email}
              </div>
              <div className="detail-item">
                <strong>Número:</strong> {budget.numTel}
              </div>
            </div>
          </div>
          <div className="details-right">
            <div className="detail-item">
              <strong>Pedido:</strong> {budget.quantidade}
            </div>
            <div className="detail-item">
              <strong>Requisitado em:</strong> {budget.data}
            </div>
          </div>
          <div className="status-section">
            <div className={`detail-item`}>
              <strong>Status:</strong> {budget.status}
            </div>
            <div className="detail-item">
              <button className="btn btn-primary btn-sm mr-2" onClick={handleEdit}>
                Editar
              </button>
            </div>
          </div>
        </div>

        <div className="notes-section">
          <h2>Notas:</h2>
          <textarea
            value={budget.nota}
            placeholder="Adicione notas ou comentários sobre este orçamento..."
            rows={10}
            className="notes-textarea"
            disabled
          />
        </div>
      </div>
    </div>
  );
}

export default DetalhesOrcamentos;
