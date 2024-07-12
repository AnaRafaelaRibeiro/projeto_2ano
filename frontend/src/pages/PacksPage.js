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
import PacksCard from "../components/PacksCard";
import PacksRelated from "../components/PacksRelated";
import PacksRequirements from "../components/PacksRequirements";
import axios from "axios";
import { useParams } from "react-router-dom";
import Sidebar from "../comprador/NavbarComprador";
import Header from "../components/Header";

const addons = [
  { id: 1, name: "Microsoft Office Publisher", price: 13.60 },
  { id: 2, name: "Microsoft Office Access", price: 17.05 },
  {
    id: 3,
    name: "Microsoft Office Publisher with SQL Server Express",
    price: 25.65,
  },
  { id: 4, name: "Microsoft Office Project Professional", price: 34.26 },
];

function PacksPage() {
  const [show, setShow] = useState(false);
  const [showQuote, setShowQuote] = useState(false);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(2); // Default to 50 Licenças
  const [quoteDetails, setQuoteDetails] = useState({
    name: "",
    email: "",
    contact: "",
    request: "",
    quantity: "",
  });
  const [quoteSent, setQuoteSent] = useState(false);

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
    setQuoteSent(false); // Reset quoteSent state
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

  const handlePlanSelect = (planId) => {
    setSelectedPlan(planId);
  };

  const handleQuoteChange = (e) => {
    const { name, value } = e.target;
    setQuoteDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleQuoteSubmit = () => {
    // Check if all fields are filled
    if (
      quoteDetails.name &&
      quoteDetails.email &&
      quoteDetails.contact &&
      quoteDetails.request &&
      quoteDetails.quantity
    ) {
      // Simulate sending quote request (you can replace with actual API call)
      setTimeout(() => {
        setQuoteSent(true);
      }, 1000); // Simulate 1 second delay
    }
  };

  const [packProdutos, setPackProdutos] = useState([
    {
      nomePackProduto: "",
      versoesPackProduto: "",
      precoPackProduto: "",
    },
  ]);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/packproduto/get/${id}`
        );
        const data = response.data;
        setPackProdutos(data); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error gracefully, e.g., display an error message
      }
    };

    fetchData();
  }, [id]);

  const [formData, setFormData] = useState({
    data: new Date().toISOString().split("T")[0],
    email: "",
    preco_compra: "",
    quantidade: 1,
    software: packProdutos.nomePackProduto,
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
    email: formData.email,
    nota: "",
  });

  const handleChangeOrcamento = (event) => {
    const { name, value } = event.target;
    setOrcamento((prevOrcamento) => ({
      ...prevOrcamento,
      [name]: value,
    }));
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
              <h1>Packs de Software</h1>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <PacksCard />
            </Col>
            <Col md={6}>
              <h2>Informações do Pack</h2>
              <div>
                <p>
                  <strong>Nome Ficheiro:</strong> {packProdutos.nomePackProduto}
                </p>
                <p>
                  <strong>Criado por:</strong> Microsoft
                </p>
                <p>
                  <strong>Versão:</strong> {packProdutos.versoesPackProduto}
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
              <h2>Packs Relacionados</h2>
              <PacksRelated />
            </Col>
          </Row>
          <Row className="mt-4">
            <Col md={12}>
              <h2>Requisitos do Sistema e Detalhes Técnicos</h2>
              <PacksRequirements />
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

          {/* Modal de seleção de planos e addons */}
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
                              type="text"
                              placeholder="0.00€"
                              value={formData.preco_compra = ((packProdutos.precoPackProduto)*(formData.quantidade)+(totalPrice)).toFixed(2) + "€"}
                              onChange={handleChange}
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
                          value={formData.software = packProdutos.nomePackProduto}
                          onChange={handleChange}
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

          {/* Modal de Pedido de Orçamento */}
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

export default PacksPage;
