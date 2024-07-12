import React from 'react';
import { Sidebar } from './NavbarGestor';
import Header from '../components/Header';
import LineChart from '../components/LineChart';
import { Card, Col, Row, Table } from 'react-bootstrap';

const GestorDashboard = ({ children }) => {
  // Dados fictícios ou estáticos para simular o comportamento
  const comprador = {
    nome: 'Pedro Rodrigues',
  };

  const produtosComprados = [
    {
      imagem: '/Microsoft.jpg',
      nome: 'Microsoft 365',
    },

  ];

  const handleLogout = async () => {
    // Simule a função de logout
    console.log('Logout realizado');
  };

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
      <Header onLogout={handleLogout} />
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="main-content">
        <div className="content p-4">
          <div className="background-image-container">
            <div className="name-container">
              <div className="rounded-rectangle">
                <h1>Dashboard Gestor</h1>
              </div>
            </div>
          </div>
          <Row>
            <Col md={4}>
              <Card className="card-custom" style={{ height: '300px' }}>
                <Card.Body className="d-flex flex-column">
                  <Card.Title>Informações</Card.Title>
                  <Table striped bordered hover className="mt-3">
                    <tbody>
                      {/* Exibir as informações do comprador */}
                      <tr>
                        <td><strong>ID:</strong> XXX</td>
                      </tr>
                      <tr>
                        <td><strong>Nome:</strong> {comprador.nome}</td>
                      </tr>
                      <tr>
                        <td><strong>Email:</strong> pedro.rodrigues@example.com</td>
                      </tr>
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
            <Col md={8}>
              <div className="card-custom">
                <LineChart />
              </div>
            </Col>
          </Row>

          {/* Lista de Mais Produtos */}
          <Row className="mt-4">
            <Col>
              <h2>Mais Softwares</h2>
              <Row className="mt-4">
                {maisProdutos.map((produto, index) => (
                  <Col key={index} md={3} className="mb-2">
                    <Card>
                      <Card.Img
                        variant="top"
                        src={produto.imagem}
                        alt={produto.nome}
                        className="img-fluid produto-image"
                        style={{ height: '150px', objectFit: '' }}
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

export default GestorDashboard;
