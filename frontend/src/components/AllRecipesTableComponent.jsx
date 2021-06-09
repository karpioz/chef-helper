import React from "react";
import { Table, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const AllRecipesTableComponent = ({ recipes, handleShowRemoveModal }) => {
  return (
    <Table striped bordered hover responsive className="table-sm">
      <thead>
        <tr>
          <th>No</th>
          <th>Recipe</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {recipes.map((recipe, i) => (
          <tr key={recipe._id}>
            <td>{i + 1}</td>
            <td>{recipe.label}</td>
            <td className="text-right">
              <LinkContainer to={`/recipe/${recipe._id}/edit`}>
                <Button variant="dark" className="btn-sm mx-2">
                  <i className="fas fa-edit"></i>
                </Button>
              </LinkContainer>
              <Button
                variant="danger"
                className="btn-sm"
                onClick={() => handleShowRemoveModal(recipe._id)}
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

export default AllRecipesTableComponent;
