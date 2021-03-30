// Tasks Form Handling
// Priority Colour Styles
const setPriorityColour = (priority) => {
  let colour;
  switch (priority) {
    case "low":
      colour = "info";
      break;
    case "medium":
      colour = "warning";
      break;
    case "high":
      colour = "danger";
      break;
    default:
      colour = "success";
  }
  return colour;
};

export { setPriorityColour };
