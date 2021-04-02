import React from "react";
import { Table, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const AllRotasTableComponent = ({ rotas, handleShowRemoveModal }) => {
  return (
    <Table striped bordered hover responsive className="table-sm">
      <thead>
        <tr>
          <th>No</th>
          <th>Rota for week starting</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {rotas.map((rota, i) => (
          <tr key={rota._id}>
            <td>{i + 1}</td>
            <td>{rota.weekStart}</td>
            <td className="text-right">
              <LinkContainer to={`/rota/${rota._id}/edit`}>
                <Button variant="dark" className="btn-sm mx-2">
                  <i className="fas fa-edit"></i>
                </Button>
              </LinkContainer>
              <Button
                variant="danger"
                className="btn-sm"
                onClick={() => handleShowRemoveModal(rota._id)}
              >
                <i className="fas fa-trash"></i>
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default AllRotasTableComponent;
