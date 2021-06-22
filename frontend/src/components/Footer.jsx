import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <>
      <footer className="bg-light">
        <Container>
          <Row>
            <Col className="text-center py-3">
              <strong>
                &copy; Chef Helper <span className="text-warning">|</span> Pawel
                Karpinski {new Date().getFullYear()}
              </strong>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default Footer;
