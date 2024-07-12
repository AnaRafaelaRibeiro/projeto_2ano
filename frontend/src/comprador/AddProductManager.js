import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import "../Css/style.css";
import Sidebar from '../components/Sidebar'; // Importe o componente da Sidebar
import Header from '../components/Header'; // Importe o componente do Header

const AddProductManager = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        position: 'Gestor de Produtos',
        product: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/gestores/adicionar', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = response.data;
            if (data.success) {
                // Handle successful submission (e.g., clear form, show success message)
                alert('Gestor de Produtos adicionado com sucesso!');
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    position: 'Gestor de Produtos',
                    product: ''
                });
            } else {
                // Handle errors (e.g., display error message)
                alert('Erro ao adicionar Gestor de Produtos.');
            }
        } catch (error) {
            console.error('Erro ao enviar o formulário:', error);
            alert('Erro ao enviar o formulário.');
        }
    };

    return (
        <div className="page-layout">
            <div className="sidebar">
                <Sidebar />
            </div>
            <div className="main-content">
                <Header />
                <Container className="mt-5 add-product-manager">
                    <h1 className="mb-4 text-center">Adicionar Gestor de Produtos</h1>
                    <Form onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Group controlId="firstName">
                                    <Form.Label>Primeiro Nome</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Escreva o seu primeiro nome" 
                                        name="firstName" 
                                        value={formData.firstName}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="lastName">
                                    <Form.Label>Último Nome</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Escreva o seu último nome" 
                                        name="lastName"
                                        value={formData.lastName}
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
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="position">
                                    <Form.Label>Posição</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Gestor de Produtos" 
                                        name="position"
                                        value={formData.position}
                                        disabled 
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group controlId="products" className="mb-3 custom-select-container">
                            <Form.Label>Produtos</Form.Label>
                            <Form.Control 
                                as="select" 
                                name="product"
                                value={formData.product}
                                onChange={handleChange}
                                className="custom-select"
                            >
                                <option value="" disabled hidden>Selecione um produto...</option>
                                <option>Windows</option>
                                <option>Office</option>
                                <option>Visual Studio</option>
                                <option>Azure</option>
                                <option>Power BI</option>
                            </Form.Control>
                        </Form.Group>
                        <div className="text-center">
                            <Button variant="primary" type="submit" className="mt-3">
                                Adicionar
                            </Button>
                        </div>
                    </Form>
                </Container>
            </div>
        </div>
    );
};

export default AddProductManager;
