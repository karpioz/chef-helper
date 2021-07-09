import React from "react";
import { Alert } from "react-bootstrap";

function HighPriorityTasks({ tasks }) {
  return (
    <>
      <h2 className="text-center my-4">
        <span className="text-danger">Urgent</span> jobs to do
      </h2>
      {tasks.map((task) => (
        <Alert variant="danger">
          <Alert.Heading>{task.taskName}</Alert.Heading>
          <hr />
          <p className="mb-0">
            <strong>Assigned to: </strong>
            {task.assignedTo.name}
          </p>
          <p>
            <strong className="text-info">Created on:</strong>
          </p>
        </Alert>
      ))}
    </>
  );
}

export default HighPriorityTasks;
