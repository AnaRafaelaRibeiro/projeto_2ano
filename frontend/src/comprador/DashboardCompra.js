import React from 'react';
import { Sidebar } from './NavbarComprador';
import Header from '../components/Header';
import '../Css/style.css';
import { Card, Col, Row, Table } from 'react-bootstrap';

const CompradorDashboard = ({ children }) => {
  const comprador = {
    nome: 'João Silva',
  };

  const produtosComprados = [
    {
      imagem: '/Microsoft.jpg',
      nome: 'Microsoft 365',
    },
    {
      imagem: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Microsoft_Azure_Logo.svg/2560px-Microsoft_Azure_Logo.svg.png',
      nome: 'Microsoft Azure',
    },
    {
      imagem: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Visual_Studio_Icon_2022.svg/1200px-Visual_Studio_Icon_2022.svg.png',
      nome: 'Visual Studio',
    },
  ];

  const maisProdutos = [
    {
      imagem: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Microsoft_Azure_Logo.svg/2560px-Microsoft_Azure_Logo.svg.png',
      nome: 'Microsoft Azure',
    },
    {
      imagem: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Visual_Studio_Icon_2022.svg/1200px-Visual_Studio_Icon_2022.svg.png',
      nome: 'Visual Studio',
    },
    {
      imagem: '/Microsoft.jpg',
      nome: 'Microsoft 365',
    },
    {
      imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYp0n2NpMJzQF9fmqwX5HvfB8myDb_HdPZeg&s',
      nome: 'Microsoft Teams',
    },
  ];

  return (
    <div className="admin-layout">
      <Header />
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="main-content">
        <div className="content p-4">
          <div className="background-image-container">
            <div className="name-container">
              <div className="rounded-rectangle">
                <h1>Dashboard Comprador</h1>
              </div>
            </div>
          </div>
          <Row>
            <Col md={4}>
              <Card className="card-custom" style={{ minHeight: '350px' }}>
                <Card.Body className="d-flex flex-column">
                  <Card.Title>Informações</Card.Title>
                  <Table striped bordered hover className="mt-3">
                    <tbody>
                      <tr>
                        <td><strong>ID:</strong> XXX</td>
                      </tr>
                      <tr>
                        <td><strong>Nome:</strong> {comprador.nome}</td>
                      </tr>
                      <tr>
                        <td><strong>Email:</strong> joao.silva@example.com</td>
                      </tr>
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
            <Col md={8}>
              <Card className="card-custom softwares-comprados" style={{ minHeight: '350px' }}>
                <Card.Body>
                  <Card.Title>Softwares Comprados</Card.Title>
                  <Row className="mt-4">
                    {produtosComprados.map((produto, index) => (
                      <Col key={index} md={4} className="mb-3">
                        <Card className="custom-card">
                          <Card.Img
                            variant="top"
                            src={produto.imagem}
                            alt={produto.nome}
                            className="img-fluid custom-produto-image"
                          />
                          <Card.Body>
                            <Card.Title>{produto.nome}</Card.Title>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row className="mt-4">
            <Col>
              <h2>Mais Softwares</h2>
              <Row className="mt-4">
                {maisProdutos.map((produto, index) => (
                  <Col key={index} md={3} className="mb-2">
                    <Card className="custom-card">
                      <Card.Img
                        variant="top"
                        src={produto.imagem}
                        alt={produto.nome}
                        className="img-fluid custom-produto-image"
                      />
                      <Card.Body>
                        <Card.Title>{produto.nome}</Card.Title>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
          {children}
        </div>
      </div>
    </div>
  );
};

export default CompradorDashboard;
