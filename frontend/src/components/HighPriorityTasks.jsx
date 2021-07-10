import React from "react";
import { Alert } from "react-bootstrap";
import { localTime, localDate } from "../utilities/localDateTimeFormatter";

function HighPriorityTasks({ tasks }) {
  return (
    <>
      <h2 className="text-center my-4">
        <span className="text-danger">Urgent</span> jobs to do
      </h2>
      {tasks.map((task) => (
        <Alert variant="danger">
          <Alert.Heading className="d-flex justify-content-between">
            {task.taskName}{" "}
            <i class="fas fa-exclamation-circle text-danger"></i>
          </Alert.Heading>
          <hr />
          <p className="mb-0">
            <strong className="text-info">Assigned to: </strong>
            <strong className="text-dark">{task.assignedTo.name}</strong>
          </p>
          <p>
            <strong className="text-info">Created on: </strong>
            {`${localDate(task.createdAt)} | ${localTime(task.createdAt)}`}
          </p>
        </Alert>
      ))}
    </>
  );
}

export default HighPriorityTasks;
