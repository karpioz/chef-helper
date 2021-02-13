import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Table,
  Container,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import axios from "axios";

const PantryScreen = () => {
  const [products, setProducts] = useState([]);

  // Modal handling
  const [modalData, setModalData] = useState([]);
  const [modalDataAdd, setModalDataAdd] = useState(0);
  const [modalDataSubt, setModalDataSubt] = useState(0);
  const [show, setShow] = useState(false);
  const [submit, setSubmit] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    console.log(id);
    setModalData(() => products.find((product) => product._id === id));
    setShow(true);
  };

  const handleModalSubmit = (e) => {
    const { name, countInStock } = modalData;
    e.preventDefault();
    axios({
      method: "PATCH",
      url: `${process.env.REACT_APP_API}/products/${modalData._id}`,
      data: { name, countInStock },
    }).then((response) => {
      console.log("qyantity updated", response);
      toast.success(`Quantity of ${name} updated sucesfully!`);
      setSubmit(true);
    });

    //closing modal
    handleClose();
  };

  const handleAddQuantity = (e) => {
    //
    e.preventDefault();
    setModalData({
      ...modalData,
      countInStock: Number(modalData.countInStock) + Number(modalDataAdd),
    });
    setModalDataAdd(0);
  };
  const handleSubtractQuantity = (e) => {
    //
    e.preventDefault();
    setModalData({
      ...modalData,
      countInStock: Number(modalData.countInStock) - Number(modalDataSubt),
    });
    setModalDataSubt(0);
  };

  // fetching products on load
  const fetchProducts = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_API}/products`);
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [submit]);

  return (
    <Container>
      <Row>
        <Col>
          <ToastContainer />

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
              {products.map((product, index) => (
                <tr key={index}>
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
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>
            Update quantity of{" "}
            <span className="text-danger">{modalData.name}</span>
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleModalSubmit}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Available Quantity (grams)</Form.Label>
              <Form.Control
                type="number"
                placeholder={modalData.countInStock}
                name={modalData.countInStock}
                readOnly
              />
            </Form.Group>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Add (grams)</Form.Label>
                <Form.Control
                  type="number"
                  value={modalDataAdd}
                  name={modalDataAdd}
                  onChange={(e) => setModalDataAdd(e.target.value)}
                />
                <Button
                  variant="warning"
                  className="btn-sm mt-1"
                  onClick={handleAddQuantity}
                >
                  Add
                </Button>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Subtract (grams)</Form.Label>
                <Form.Control
                  type="number"
                  value={modalDataSubt}
                  name={modalDataSubt}
                  onChange={(e) => setModalDataSubt(e.target.value)}
                />
                <Button
                  variant="warning"
                  className="btn-sm mt-1"
                  onClick={handleSubtractQuantity}
                >
                  Subtract
                </Button>
              </Form.Group>
            </Form.Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="success" type="submit">
              Update
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default PantryScreen;
