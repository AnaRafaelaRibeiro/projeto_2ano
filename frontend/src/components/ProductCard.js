import React from 'react';
import { Card } from 'react-bootstrap';
import adobeImage from '../assets/VisualStudio.png';
import '../Css/style.css';  // Importa o CSS

function ProductCard() {
  return (
    <Card className="product-card">
      <Card.Img variant="top" src={adobeImage} className="product-image" />  {/* Aplica a classe CSS */}
      <Card.Body>
        <Card.Title>Visual Studio</Card.Title>
        <Card.Text>C++, C#, Visual Basic, J#</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
