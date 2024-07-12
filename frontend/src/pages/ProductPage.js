import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  Form,
  Alert,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import ProductCard from "../components/ProductCard";
import ProductRelated from "../components/ProductRelated";
import ProductRequirements from "../components/ProductRequirements";
import "../Css/style.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import Sidebar from "../comprador/NavbarComprador";
import Header from "../components/Header";

const addons = [
  { id: 1, name: "Visual Studio Extension: CodeRush", price: 25.65 },
  { id: 2, name: "Visual Studio Extension: Telerik Fiddler", price: 42.87 },
  { id: 3, name: "Visual Studio Extension: Pluralsight", price: 60.09 },
  {
    id: 4,
    name: "Visual Studio Extension: Resharper Ultimate",
    price: 85.92,
  },
];

function ProductPage() {
  const [show, setShow] = useState(false);
  const [showQuote, setShowQuote] = useState(false);
  const [quoteDetails, setQuoteDetails] = useState({
    name: "",
    email: "",
    contact: "",
    request: "",
    quantity: "",
  });
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(2); // Default to 50 Licenças
  const [formResetKey, setFormResetKey] = useState(0);
  const [quoteSent, setQuoteSent] = useState(false); // Estado para controlar se o pedido de orçamento foi enviado

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setSelectedAddons([]);
    setSelectedPlan(2); // Reset to default 50 Licenças
  };

  const handleQuoteShow = () => setShowQuote(true);
  const handleQuoteClose = () => {
    setShowQuote(false);
    setQuoteDetails({
      name: "",
      email: "",
      contact: "",
      request: "",
      quantity: "",
    });
    setFormResetKey((prevKey) => prevKey + 1); // Increment key to reset form fields
    setQuoteSent(false); // Reset the quoteSent state
  };

  const handleAddonChange = (addonId) => {
    setSelectedAddons((prevSelectedAddons) => {
      if (prevSelectedAddons.includes(addonId)) {
        return prevSelectedAddons.filter((id) => id !== addonId);
      } else {
        return [...prevSelectedAddons, addonId];
      }
    });
  };

  const [uniqueProdutos, setUniqueProdutos] = useState([
    {
      nameProduto: "",
      versaoProduto: "",
      precoProduto: "",
    },
  ]);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/produtos/get/${id}`
        );
        const data = response.data;
        setUniqueProdutos(data); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error gracefully, e.g., display an error message
      }
    };

    fetchData();
  }, []); // Adicionando 'id' como dependência para refetch quando o 'id' muda

  const [formData, setFormData] = useState({
    data: new Date().toISOString().split("T")[0],
    email: "",
    preco_compra: "",
    quantidade: 1,
    software: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/compra/criar-compra",
        formData
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

  const [orcamento, setOrcamento] = useState({
    data: new Date().toISOString().split("T")[0],
    cliente: "",
    status: "Pendente",
    quantidade: "",
    numTel: "",
    email: "",
    nota: "",
  });

  const handleChangeOrcamento = (event) => {
    const { name, value } = event.target;
    setOrcamento((prevOrcamento) => ({ ...prevOrcamento, [name]: value }));
  };

  const handleSubmitOrcamento = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/orcamento/criar",
        orcamento
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

  const totalPrice = selectedAddons.reduce(
    (acc, addonId) => acc + addons.find((addon) => addon.id === addonId).price,
    0
  );

  return (
    <div className="page-layout">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="main-content">
        <Header />
        <Container>
          <Row className="my-3 title-margin">
            <Col md={12} className="text-center">
              <h1>Software</h1>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <ProductCard />
            </Col>
            <Col md={6}>
              <h2>Informações do Software</h2>
              <div>
                <p>
                  <strong>Nome Ficheiro:</strong> {uniqueProdutos.nameProduto}
                </p>
                <p>
                  <strong>Criado por:</strong> Microsoft
                </p>
                <p>
                  <strong>Versão:</strong> {uniqueProdutos.versaoProduto}
                </p>
                <p>
                  <strong>Tipo Licença:</strong> full_version
                </p>
                <p>
                  <strong>Data lançamento:</strong> May 16, 2023
                </p>
                <p>
                  <strong>Línguas:</strong> Multilingual
                </p>
                <p>
                  <strong>Total Downloads:</strong> 45728
                </p>
              </div>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col md={12}>
              <h2>Produtos Relacionados</h2>
              <ProductRelated />
            </Col>
          </Row>
          <Row className="mt-4">
            <Col md={12}>
              <h2>Requisitos do Sistema e Detalhes Técnicos</h2>
              <ProductRequirements />
            </Col>
          </Row>
          <Row className="mt-4">
            <Col md={12} className="text-center">
              <div className="button-container">
                <Button
                  variant="primary"
                  size="lg"
                  className="equal-button"
                  onClick={handleShow}
                >
                  Comprar agora
                </Button>
              </div>
            </Col>
          </Row>

          <Modal show={show} onHide={handleClose} size="lg" centered>
            <Modal.Header closeButton>
              <Modal.Title>Escolha um plano de pagamento e addons</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Container>
                <Row>
                  <Col md={6}>
                    <h5>Adicione addons à sua compra</h5>
                    <Form>
                      {addons.map((addon) => (
                        <Form.Check
                          key={addon.id}
                          type="checkbox"
                          label={`${addon.name} - ${addon.price}€`}
                          checked={selectedAddons.includes(addon.id)}
                          onChange={() => handleAddonChange(addon.id)}
                        />
                      ))}
                    </Form>
                  </Col>
                  <Container className="mt-5 add-product-manager">
                    <h1 className="mb-4 text-center">Fazer compra</h1>
                    <Form onSubmit={handleSubmit}>
                      <Row className="mb-3">
                        <Col md={6}>
                          <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="jonhdoe@gmail.com"
                              value={formData.email}
                              onChange={handleChange}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group controlId="data">
                            <Form.Label>Data</Form.Label>
                            <Form.Control
                              type="Date"
                              placeholder="yyyy/mm/dd"
                              value={formData.data}
                              onChange={handleChange}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row className="mb-3">
                        <Col>
                          <Form.Group controlId="quantidade">
                            <Form.Label>Quantidade</Form.Label>
                            <Form.Control
                              type="number"
                              placeholder="0"
                              value={formData.quantidade}
                              onChange={handleChange}
                            />
                          </Form.Group>
                          <Form.Group controlId="preco_compra">
                            <Form.Label>Preço</Form.Label>
                            <Form.Control
                              type="currency"
                              placeholder="0.00€"
                              value={
                                (formData.preco_compra =
                                  (
                                    uniqueProdutos.precoProduto *
                                      formData.quantidade +
                                    totalPrice
                                  ).toFixed(2) + "€")
                              }
                              onChange={handleChange}
                              readOnly
                              disabled
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Form.Group
                        controlId="software"
                        className="mb-3 custom-select-container"
                      >
                        <Form.Label>Software</Form.Label>
                        <Form.Control
                          type="text"
                          value={
                            (formData.software = uniqueProdutos.nameProduto)
                          }
                          readOnly
                          disabled
                        />
                      </Form.Group>
                      <div className="text-center">
                        <Button
                          variant="primary"
                          type="submit"
                          className="mt-3"
                        >
                          Comprar
                        </Button>
                      </div>
                    </Form>
                  </Container>
                </Row>
              </Container>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={handleQuoteShow}>
                Pedir Orçamento
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal show={showQuote} onHide={handleQuoteClose} size="lg" centered>
            <Modal.Header closeButton>
              <Modal.Title>Pedir Orçamento</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Container>
                <Form>
                  <Row>
                    <Col md={12}>
                      <Form.Group controlId="cliente">
                        <Form.Label>Nome:</Form.Label>
                        <Form.Control
                          type="text"
                          name="cliente"
                          value={orcamento.cliente}
                          onChange={handleChangeOrcamento}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12}>
                      <Form.Group controlId="email">
                        <Form.Label>E-Mail:</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={orcamento.email}
                          onChange={handleChangeOrcamento}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12}>
                      <Form.Group controlId="numTel">
                        <Form.Label>Contacto:</Form.Label>
                        <Form.Control
                          type="number"
                          name="numTel"
                          value={orcamento.numTel}
                          onChange={handleChangeOrcamento}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12}>
                      <Form.Group controlId="nota">
                        <Form.Label>Pedido:</Form.Label>
                        <Form.Control
                          as="textarea"
                          name="nota"
                          rows={3}
                          value={orcamento.nota}
                          onChange={handleChangeOrcamento}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12}>
                      <Form.Group controlId="quantidade">
                        <Form.Label>Quantidade:</Form.Label>
                        <Form.Control
                          type="number"
                          name="quantidade"
                          value={orcamento.quantidade}
                          onChange={handleChangeOrcamento}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      <Form.Group controlId="status">
                        <Form.Label>Status:</Form.Label>
                        <Form.Control
                          type="text"
                          name="status"
                          value={orcamento.status}
                          onChange={handleChangeOrcamento}
                          disabled
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Form>
              </Container>
            </Modal.Body>
            <Modal.Footer>
              {!quoteSent ? (
                <Button variant="primary" onClick={handleSubmitOrcamento}>
                  Enviar
                </Button>
              ) : (
                <Alert variant="success" className="d-flex align-items-center">
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    size="2x"
                    className="mr-3"
                  />
                  <span className="mr-auto">
                    <strong>Pedido de orçamento enviado!</strong>
                  </span>
                </Alert>
              )}
            </Modal.Footer>
          </Modal>
        </Container>
      </div>
    </div>
  );
}

export default ProductPage;
