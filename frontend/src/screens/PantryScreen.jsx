import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Table,
  Container,
  Button,
  Modal,
  Form,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import axios from "axios";
import { isAuth } from "../utilities/authUtilities";

import PaginationComponent from "../components/PaginationComponent";

const PantryScreen = () => {
  const [products, setProducts] = useState([]);

  // Modal handling
  const [modalData, setModalData] = useState([]);
  const [modalDataAdd, setModalDataAdd] = useState(0);
  const [modalDataSubt, setModalDataSubt] = useState(0);
  const [show, setShow] = useState(false);
  const [showRemove, setShowRemove] = useState(false);
  const [submitAdd, setSubmitAdd] = useState(false);
  const [submitRemove, setSubmitRemove] = useState(false);
  const handleClose = () => setShow(false);
  const handleCloseRemove = () => setShowRemove(false);
  const handleShow = (id) => {
    console.log(id);
    setModalData(() => products.find((product) => product._id === id));
    setShow(true);
  };
  const handleShowRemove = (id) => {
    console.log(id);
    setModalData(() => products.find((product) => product._id === id));
    setShowRemove(true);
  };

  const handleModalSubmit = (e) => {
    const { name, countInStock } = modalData;
    e.preventDefault();
    axios({
      method: "PATCH",
      url: `${process.env.REACT_APP_API}/products/${modalData._id}`,
      data: { name, countInStock },
    }).then((response) => {
      toast.success(`Quantity of ${name} updated sucesfully!`);
      setSubmitAdd(true);
    });

    //closing modal
    handleClose();
  };

  const handleModalSubmitRemove = (e) => {
    const { _id, name } = modalData;
    e.preventDefault();
    axios({
      method: "DELETE",
      url: `${process.env.REACT_APP_API}/products/${modalData._id}`,
      data: { _id },
    }).then((response) => {
      console.log("item removed");
      toast.success(`Item ${name} has been deleted`);
      setProducts(products.filter((product) => product._id !== _id));
      setSubmitRemove(true);
    });

    //closing modal
    handleCloseRemove();
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

  // fetching products on load method
  const fetchProducts = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_API}/products`);
    setProducts(data);
    getCurrentProducts();
  };

  // pagination functionality
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);
  const [currentProductsState, setCurrentProductState] = useState([]);

  // Get current products
  const getCurrentProducts = () => {
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    let currentProducts = products.slice(
      indexOfFirstProduct,
      indexOfLastProduct
    );
    setCurrentProductState(currentProducts);
  };

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // search for products functionality
  const [searchInput, setSearchInput] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleSearchInputChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
    let pantryProducts = products.filter((prod) => {
      let productName = prod.name.toLowerCase();
      //return prod.name.match(searchInput);
      return productName.match(searchInput.toLowerCase());
    });
    setFilteredProducts(pantryProducts);
  };

  // Use Effect hooks for fetching all products on page display

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    //
  }, [searchInput, filteredProducts]);

  useEffect(() => {
    if (submitAdd) {
      fetchProducts();
    }
  }, [submitAdd]);

  return (
    <Container>
      <Row className="my-3">
        <Col>
          <ToastContainer />

          <h1>Pantry</h1>
        </Col>
        <Col>
          <InputGroup className="mt-2">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">
                <i className="fas fa-search"></i>
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="Search for product..."
              aria-label="Product name"
              aria-describedby="basic-addon1"
              onChange={handleSearchInputChange}
            />
          </InputGroup>
        </Col>
      </Row>

      <Row>
        <Col>
          <Table striped bordered hover size="sm">
            <thead className="bg-dark text-light">
              <tr>
                <th>Name</th>
                <th>Quantity (grams)</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {searchInput.length > 0
                ? filteredProducts.map((product, index) => (
                    <tr key={index}>
                      <td>{product.name}</td>
                      <td>{product.countInStock}</td>
                      <td>{product.price}</td>
                      {isAuth() ? (
                        <td className="text-right">
                          <Button
                            className="mx-1"
                            variant="warning"
                            size="sm"
                            onClick={() => handleShow(product._id)}
                          >
                            <i className="fas fa-edit"></i>
                          </Button>
                          {isAuth() && isAuth().role === "admin" ? (
                            <Button
                              className="mx-1"
                              variant="danger"
                              size="sm"
                              onClick={() => handleShowRemove(product._id)}
                            >
                              <i className="fas fa-minus"></i>
                            </Button>
                          ) : null}
                        </td>
                      ) : (
                        <td>
                          <p className="text-danger text-small">
                            <small>Please login to see actions</small>
                          </p>
                        </td>
                      )}
                    </tr>
                  ))
                : products.map((product, index) => (
                    <tr key={index}>
                      <td>{product.name}</td>
                      <td>{product.countInStock}</td>
                      <td>{product.price}</td>
                      {isAuth() ? (
                        <td className="text-right">
                          <Button
                            className="mx-1"
                            variant="warning"
                            size="sm"
                            onClick={() => handleShow(product._id)}
                          >
                            <i className="fas fa-edit"></i>
                          </Button>
                          {isAuth() && isAuth().role === "admin" ? (
                            <Button
                              className="mx-1"
                              variant="danger"
                              size="sm"
                              onClick={() => handleShowRemove(product._id)}
                            >
                              <i className="fas fa-minus"></i>
                            </Button>
                          ) : null}
                        </td>
                      ) : (
                        <td>
                          <p className="text-danger text-small">
                            <small>Please login to see actions</small>
                          </p>
                        </td>
                      )}
                    </tr>
                  ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row className="my-4 ">
        <PaginationComponent
          productsPerPage={productsPerPage}
          totalProducts={products.length}
          paginate={paginate}
          className="text-center"
        />
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
      {/* Remove Product Modal */}
      <Modal show={showRemove} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Please Confirm</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleModalSubmitRemove}>
          <Modal.Body>
            <h3>
              Remove of <span className="text-danger">{modalData.name}</span>
            </h3>
            <Form.Group>
              <Form.Label>Available Quantity (grams)</Form.Label>
              <Form.Control
                type="number"
                placeholder={modalData.countInStock}
                name={modalData.countInStock}
                readOnly
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="warning" onClick={handleCloseRemove}>
              Cancel
            </Button>
            <Button variant="danger" type="submit">
              Remove
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default PantryScreen;
