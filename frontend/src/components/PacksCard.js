import React from 'react';
import { Card } from 'react-bootstrap';
import adobeImage from '../assets/Office.png';
import '../Css/style.css';  // Importa o CSS

function ProductCard() {
  return (
    <Card className="product-card">
      <Card.Img variant="top" src={adobeImage} className="product-image" />  {/* Aplica a classe CSS */}
      <Card.Body>
        <Card.Title>Microsoft Office Essentials</Card.Title>
        <Card.Text>Microsoft Word, Microsoft PowerPoint, Microsoft Outlook e Microsoft Excel</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
