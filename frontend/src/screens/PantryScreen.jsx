import React, { useState, useEffect } from "react";
import { Row, Col, Table, Container, Button, Modal } from "react-bootstrap";
import axios from "axios";

const PantryScreen = () => {
  const [products, setProducts] = useState([]);

  // Modal handling
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/products`);
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          <h1>Pantry</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr>
                  <td>{product.name}</td>
                  <td>{product.countInStock}</td>
                  <td>{product.price}</td>
                  <td>
                    <Button onClick={() => handleShow(product._id)}>
                      <i className="fas fa-edit"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update quantity of ...</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default PantryScreen;
