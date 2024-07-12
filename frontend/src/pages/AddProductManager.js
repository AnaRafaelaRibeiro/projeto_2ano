import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { AiOutlineCheckCircle } from "react-icons/ai";
import NavbarComponent from "../comprador/NavbarComprador"; // Importe o componente Navbar
import Header from "../components/Header"; // Importe o componente Header
import "../Css/style.css";
import axios from "axios";

const AddProductManager = () => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [produtos, setProdutos] = useState([]);
  const [formData, setFormData] = useState({
    pNome: "",
    uNome: "",
    email: "",
    produtos: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/api/gestor/criar", formData, {
        headers: { "Content-Type": "application/json" },
      });
      if (response.data.success) {
        setShowSuccessMessage(true);
        // Handle successful submission (e.g., clear form, show success message)
      } else {
        // Handle errors (e.g., display error message)
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/produtos/lista-produtos");
        setProdutos(response.data); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error gracefully, e.g., display an error message
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    console.log("Logout clicked");
  };

  return (
    <div className="admin-layout">
      <NavbarComponent />
      <Header onLogout={handleLogout} className="header-navbar" />
      <div className="main-content">
        <Container className="mt-5 add-product-manager">
          <h1 className="mb-4 text-center">Adicionar Gestor de Produtos</h1>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="pNome">
                  <Form.Label>Primeiro Nome</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Escreva o seu primeiro nome"
                    value={formData.pNome}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="uNome">
                  <Form.Label>Último Nome</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Escreva o seu último nome"
                    value={formData.uNome}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Escreva o seu email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="position">
                  <Form.Label>Lista Produtos</Form.Label>
                  <Form.Control as="select" className="custom-select">
                    {produtos.map((produto) => (
                      <option key={produto.idProduto}>
                        {produto.nameProduto}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group controlId="produtos" className="mb-3 custom-select-container">
              <Form.Label>Produtos</Form.Label>
              <Form.Control
                type="text"
                value={formData.produtos}
                onChange={handleChange}
              />
            </Form.Group>
            <div className="text-center">
              <Button variant="primary" type="submit" className="mt-3">
                Adicionar
              </Button>
            </div>
            {showSuccessMessage && (
              <Alert variant="success" className="mt-3 text-center">
                <AiOutlineCheckCircle /> Gestor de Produtos adicionado com sucesso!
              </Alert>
            )}
          </Form>
        </Container>
      </div>
    </div>
  );
};

export default AddProductManager;
