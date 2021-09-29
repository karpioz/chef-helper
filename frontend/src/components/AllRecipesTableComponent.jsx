import React from "react";
import { Table, Button } from "react-bootstrap";

const AllRecipesTableComponent = ({
  recipes,
  handleShowRemoveModal,
  handleClickUpdate,
  handleClickBookmark,
}) => {
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
              <Button
                variant="dartk"
                className="btn-sm mx-2"
                onClick={() => handleClickBookmark(recipe._id)}
              >
                {!recipe.bookmarked ? (
                  <i class="far fa-heart text-info"></i>
                ) : (
                  <i class="fas fa-heart text-danger"></i>
                )}
              </Button>
              <Button
                variant="warning"
                className="btn-sm mx-2"
                onClick={() => handleClickUpdate(recipe._id)}
              >
                <i className="fas fa-edit"></i>
              </Button>
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
