import React from "react";
import {  Table, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";


const AllRotasTableComponent = ({rotas, handleDeleteRota}) => {

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
                  <td>
                    <LinkContainer to={`/rota/${rota._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => handleDeleteRota(rota._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
  )}

export default AllRotasTableComponent;
