import React from "react";
import { Modal, Button } from "react-bootstrap";

const ModalProductsActions = ({ product, show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update quantity of {product.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form
          action={`"${process.env.REACT_APP_API}/products/update/${product._id}"`}
          method="post"
        ></form>
        Woohoo, you're reading this text in a modal!
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalProductsActions;
