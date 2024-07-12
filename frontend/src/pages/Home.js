import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Navbar,
  Nav,
  Container,
  Form,
  Button,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import "../App.css"; // Arquivo de estilo personalizado
import "bootstrap/dist/css/bootstrap.min.css"; // Importação do Bootstrap CSS

const HomePage = () => {
  const [validated, setValidated] = useState(false);
  const [budget, setBudget] = useState("");
  const [produtos, setProdutos] = useState([]);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  const handleBudgetChange = (event) => {
    const value = event.target.value;
    // Permitir apenas números, vírgulas e pontos
    const formattedValue = value.replace(/[^0-9,.]/g, "");
    setBudget(formattedValue);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/produtos/lista-produtos"
        );
        setProdutos(response.data); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching products:", error);
        // Handle error gracefully, e.g., display an error message
      }
    };

    fetchData();
  }, []);

  return (
    <div className="home-page d-flex flex-column min-vh-100">
      <Navbar className="navbar-custom" expand="lg">
        <Container>
          <Navbar.Brand href="#home">
            <img
              src="https://c.animaapp.com/WYNSEKrf/img/logo.svg"
              alt="Logo da Empresa"
              className="d-inline-block align-top"
              height="40"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#about-us">SOBRE NÓS</Nav.Link>
              <Nav.Link href="#software">SOFTWARE</Nav.Link>
              <Nav.Link href="#contact">CONTACTO</Nav.Link>
              <Nav.Link href="login">LOGIN</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="header-image">
        <img
          src="https://s3-alpha-sig.figma.com/img/7da0/5f49/655d7ddd2965ac418f26892f6e84ba8a?Expires=1719792000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=GWdXaxxEhgsmZmxPkiKQK1bD2lWOm1WBsssgUwryjGElyk0t5wlqpJF5cDp7IeqSGgX6E0o4-tjKPoeP3VOa1u5mRF~l35iUU~Dylnla~p81XpxXPKESwstsJ4UQyjuXQlbzLIv2uYp3Dkbc7oqqzNN5DpyuVZRY6jcASOOIGocXhXPfeYa6jlB9jCfTRoUHjqSHM6WA37Af67uLCybpWqX8~IpGewrydeXmhgPZYHvo~5eo8k0VX2e5fXrVx3~t67n6mQAtcykp6LdqUrgh8bKnCgUoTpqP7T~CbFoNu3dzEo2f41LnSVtzHKi6w1olTr1Hjt~D3B3p3cppb~SLWg__"
          alt="Background"
        />
        <div className="header-content">
          <h1>WAREHOUSE</h1>
          <p className="textoheader">
            Somos uma empresa de compra e vende de softwares
          </p>
        </div>
      </div>

      <section className="about-us-section text-start" id="about-us">
        <Container>
          <h2>SOBRE NÓS</h2>
          <p>
            Bem-vindo ao nosso portal, onde a inovação e a tecnologia se
            encontram para transformar suas necessidades digitais em soluções
            eficientes. Somos especialistas na compra e venda de produtos de
            software, oferecendo uma plataforma de e-commerce dedicada a
            fornecer as melhores ferramentas para o sucesso do seu negócio.
          </p>
        </Container>
      </section>

      <section className="software-section" id="software">
        <Container>
          <h2>SOFTWARE</h2>
          <Row className="justify-content-center">
            {produtos.map((produto) => (
              <Col key={produto.id} md={3} className="mb-4">
                <Card className="mb-2">
                  <Card.Img
                    variant="top"
                    src="https://www.i-tecnico.pt/wp-content/uploads/2022/10/Microsoft-Office-Microsoft-365.jpg"
                  />
                  <Card.Body>
                    <Card.Title>{produto.nameProduto}</Card.Title>
                    <Card.Text>{produto.descricaoProduto}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className="contact-section" id="contact">
        <Container>
          <Row>
            <Col md={6}>
              <div className="contact-info">
                <h3>CONTACTO</h3>
                <p>
                  Tem alguma grande ideia ou marca para desenvolver e precisa de
                  ajuda? Então entre em contato, adoraríamos saber mais sobre
                  seu projeto e fornecer ajuda
                </p>
                <br></br>
                <br></br>
                <p>Endereço: Rua Exemplo, 123</p>
                <p>Telefone: (11) 1234-5678</p>
                <p>Email: contato@exemplo.com</p>
              </div>
            </Col>
            <Col md={6}>
              <Form
                noValidate
                validated={validated}
                onSubmit={handleSubmit}
                className="p-4"
              >
                <Form.Group controlId="formName">
                  <Form.Label>Nome</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Seu nome"
                    className="rounded"
                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor, insira seu nome.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formEmail" className="mt-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    required
                    type="email"
                    placeholder="Seu email"
                    className="rounded"
                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor, insira um email válido.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formProduct" className="mt-3">
                  <Form.Label>Qual produto está interessado</Form.Label>
                  <Form.Select required className="rounded" id="produtos">
                    {produtos.map((produto) => (
                      <option key={produto.id} value={produto.id}>
                        {produto.nameProduto}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    Por favor, selecione um produto.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formBudget" className="mt-3">
                  <Form.Label>Orçamento (€)</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    value={budget}
                    onChange={handleBudgetChange}
                    placeholder="Seu orçamento em moeda"
                    className="rounded"
                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor, insira um orçamento válido.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formMessage" className="mt-3">
                  <Form.Label>Mensagem</Form.Label>
                  <Form.Control
                    required
                    as="textarea"
                    rows={3}
                    placeholder="Sua mensagem"
                    className="rounded"
                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor, insira uma mensagem.
                  </Form.Control.Feedback>
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="mt-3 custom-btn rounded"
                >
                  Enviar
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>

      <footer className="py-2 ">
        <Container>
          <Row className="align-items-center">
            <Col md={4} className="text-start">
              <Nav className="flex-column">
                <Nav.Link href="#contact" className="text-white">
                  Contact Us
                </Nav.Link>
                <p className="text-white">Terms and Conditions</p>
              </Nav>
            </Col>
            <Col md={4} className="text-center">
              <img
                src="https://c.animaapp.com/WYNSEKrf/img/logo.svg"
                alt="Logo da Empresa"
                className="footer-logo"
                height="60"
              />
            </Col>
            <Col md={4} className="text-end">
              <Nav className="flex-column">
                <Nav.Link
                  href="https://www.facebook.com"
                  target="_blank"
                  className="text-white"
                >
                  <i className="fab fa-facebook-f"></i> Facebook
                </Nav.Link>
              </Nav>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
};

export default HomePage;