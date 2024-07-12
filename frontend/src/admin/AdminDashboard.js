import React, { useEffect, useState } from 'react';
import Sidebar from './Navbar';
import Header from '../components/Header';
import '../Css/style.css';
import { useNavigate } from 'react-router-dom';
import LineChart from '../components/LineChart';
import { Card, Row, Col, Table } from 'react-bootstrap';
import axios from "axios";

const AdminDashboard = ({ children }) => {
  const navigate = useNavigate();
  const [budgetRequests, setBudgetRequests] = useState([]);
  const [orcamentos, setOrcamentos] = useState([]);

  const displayedOrcamentos = orcamentos.slice(-3);

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include'
      });

      if (response.ok) {
        navigate('/login');
      } else {
        console.error('Failed to logout');
      }
    } catch (error) {
      console.error('Failed to logout', error);
    }
  };

  useEffect(() => {
    const fetchBudgetRequests = async () => {
      try {
        const response = await fetch('/api/budget-requests', {
          credentials: 'include'
        });

        if (response.ok) {
          const data = await response.json();
          setBudgetRequests(data);
        } else {
          console.error('Failed to fetch budget requests');
        }
      } catch (error) {
        console.error('Failed to fetch budget requests', error);
      }
    };

    fetchBudgetRequests();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/orcamento/lista"
        );
        setOrcamentos(response.data); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching products:", error);
        // Handle error gracefully, e.g., display an error message
      }
    };

    fetchData();
  }, []);

  return (
    <div className="admin-layout">
      <Header onLogout={handleLogout} />
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="main-content">
        <div className="content p-4">
          <h1 className="my-3">Dashboard Admin</h1>
          <Row className="mb-4">
            <Col md={4}>
              <Card className="card-custom">
                <Card.Body>
                  <div className="d-flex justify-content-between">
                    <div>
                      <Card.Title>Total User</Card.Title>
                      <div className="value-text">
                        <strong>4,700</strong>
                      </div>
                      <div className="mt-2">
                        <img src="/Images/ic-trending-up-24px.SVG" alt="A" className="img-fluid" />
                        <span className="ms-2">8.5% Up from yesterday</span>
                      </div>
                    </div>
                    <img src="/Images/Icon.svg" alt="A" className="img-fluid align-self-start" />
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="card-custom">
                <Card.Body>
                  <div className="d-flex justify-content-between">
                    <div>
                      <Card.Title>Total Order</Card.Title>
                      <div className="value-text">
                        <strong>10,293</strong>
                      </div>
                      <div className="mt-2">
                        <img src="/Images/ic-trending-up-24px.SVG" alt="A" className="img-fluid" />
                        <span className="ms-2">1.3% Up from past week</span>
                      </div>
                    </div>
                    <img src="/Images/Icon2.svg" alt="A" className="img-fluid align-self-start" />
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="card-custom">
                <Card.Body>
                  <div className="d-flex justify-content-between">
                    <div>
                      <Card.Title>Total Sales</Card.Title>
                      <div className="value-text">
                        <strong>89,000 €</strong>
                      </div>
                      <div className="mt-2">
                        <img src="/Images/ic-trending-up-24px.SVG" alt="A" className="img-fluid" />
                        <span className="ms-2">1.8% Up from yesterday</span>
                      </div>
                    </div>
                    <img src="/Images/Icon3.svg" alt="A" className="img-fluid align-self-start" />
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <Card className="card-custom" style={{ height: '300px' }}>
                <Card.Body className="d-flex flex-column">
                  <Card.Title>Pedidos de Orçamentos</Card.Title>
                  <Table striped bordered hover className="mt-3">
                    <thead>
                      <tr>
                        <th>Email</th>
                        <th>Data do Pedido</th>
                      </tr>
                    </thead>
                    <tbody>
                      {displayedOrcamentos.map((orcamento, index) => (
                        <tr key={index}>
                          <td>{orcamento.email}</td>
                          <td>{orcamento.data}</td>
                        </tr>
                      ))}
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
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
