import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import "../Css/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import Navbar from "../admin/Navbar";
import Header from "../components/Header";

function Budget() {
  const productLogo = "/After Effects.png"; // Using the logo from the first product as an example
  const [orcamentos, setOrcamentos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/orcamento/lista"
        );
        setOrcamentos(response.data); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching budgets:", error);
        // Handle error gracefully, e.g., display an error message
      }
    };

    fetchData();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [budgetsPerPage] = useState(8); // Maximum budgets per page
  const [totalBudgets, setTotalBudgets] = useState(0);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc"); // "asc" or "desc"

  useEffect(() => {
    // Calculate total number of budgets
    setTotalBudgets(orcamentos.length);
  }, [orcamentos]);

  // Pagination logic
  const indexOfLastBudget = currentPage * budgetsPerPage;
  const indexOfFirstBudget = indexOfLastBudget - budgetsPerPage;
  const currentBudgets = orcamentos.slice(indexOfFirstBudget, indexOfLastBudget);

  // Handle sorting
  const handleSort = (columnName) => {
    if (sortColumn === columnName) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(columnName);
      setSortOrder("asc");
    }
  };

  // Sort budgets based on current sort column and order
  let sortedBudgets = [...currentBudgets];
  if (sortColumn) {
    sortedBudgets.sort((a, b) => {
      const columnA = a[sortColumn];
      const columnB = b[sortColumn];
      if (columnA < columnB) {
        return sortOrder === "asc" ? -1 : 1;
      }
      if (columnA > columnB) {
        return sortOrder === "asc" ? 1 : -1;
      }
      return 0;
    });
  }

  const handleEdit = (id) => {
    // Construct the edit page URL with the software ID
    const editUrl = `/admin/editar-orcamento/${id}`; // Replace with your actual edit route pattern
  
    // Use useNavigate hook for navigation
    navigate(editUrl);
  };

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Navbar />
      <Header />
      <div className="orcamentos-background">
        <h1 className="titleh1">Orçamentos ({orcamentos.length})</h1>
        <table className="table">
          <thead>
            <tr className="subtitles">
              <th onClick={() => handleSort("client")}>
                CLIENTE{" "}
                {sortColumn === "client" && (
                  <i
                    className={`bi bi-caret-${
                      sortOrder === "asc" ? "up" : "down"
                    }-fill`}
                  ></i>
                )}
              </th>
              <th onClick={() => handleSort("phoneNumber")}>
                NUM. TELEMÓVEL{" "}
                {sortColumn === "phoneNumber" && (
                  <i
                    className={`bi bi-caret-${
                      sortOrder === "asc" ? "up" : "down"
                    }-fill`}
                  ></i>
                )}
              </th>
              <th onClick={() => handleSort("order")}>
                PEDIDO{" "}
                {sortColumn === "order" && (
                  <i
                    className={`bi bi-caret-${
                      sortOrder === "asc" ? "up" : "down"
                    }-fill`}
                  ></i>
                )}
              </th>
              <th onClick={() => handleSort("status")}>
                STATUS{" "}
                {sortColumn === "status" && (
                  <i
                    className={`bi bi-caret-${
                      sortOrder === "asc" ? "up" : "down"
                    }-fill`}
                  ></i>
                )}
              </th>
              <th onClick={() => handleSort("requestedAt")}>
                REQUISITADO A{" "}
                {sortColumn === "requestedAt" && (
                  <i
                    className={`bi bi-caret-${
                      sortOrder === "asc" ? "up" : "down"
                    }-fill`}
                  ></i>
                )}
              </th>
              <th>AÇÃO</th>
            </tr>
          </thead>
          <tbody>
            {orcamentos.map((orcamento) => (
              <tr
                key={orcamento.idOrcamento}
                className={`orcamento-row`}
              >
                <td className="orcamento-name" value={orcamento.cliente}>
                  <div className="orcamento-details">
                    <div className="orcamento-text">
                      {orcamento.idOrcamento != 0 ? (
                        <Link
                          to={`/admin/detalhes-orcamento/${orcamento.idOrcamento}`}
                        >
                          {orcamento.cliente}
                        </Link>
                      ) : (
                        orcamento.cliente
                      )}
                    </div>
                    <div className="company-text">{orcamento.email}</div>
                  </div>
                </td>
                <td className="orcamento-phoneNumber">{orcamento.numTel}</td>
                <td className="orcamento-order">{orcamento.quantidade}</td>
                <td className="orcamento-status">{orcamento.status}</td>
                <td className="orcamento-requestedAt">{orcamento.data}</td>
                <td className="orcamento-action">
                  <button className="btn btn-primary btn-sm mr-2" onClick={() => handleEdit(orcamento.idOrcamento)}>Editar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="pagination">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Anterior
          </button>
          <span>Página {currentPage}</span>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentBudgets.length < budgetsPerPage}
          >
            Próxima
          </button>
        </div>

        {/* Budget counter at bottom right */}
        <div className="orcamento-counter">
          Total de Orçamentos: {orcamentos.length}
        </div>
      </div>
    </div>
  );
}

export default Budget;
