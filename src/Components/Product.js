import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const Product = ({ imageUrl, name, price, handleDelete, handleEdit }) => {
  return (
    <Card style={{ width: "18rem" }} className="mb-4">
      <Card.Img
        variant="top"
        src={imageUrl}
        alt={name}
        style={{ objectFit: "contain", height: '200px', padding: '5px' }}
      />
      <Card.Body style={{ height: '150px' }}>
        <Card.Title className="mb-0" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {name}
        </Card.Title>
        <Card.Text>${price}</Card.Text>
        <Button variant="primary" onClick={handleEdit}>Edit</Button>
        <Button variant="danger" onClick={handleDelete}>Delete</Button>
      </Card.Body>
    </Card>
  );
};

export default Product;
