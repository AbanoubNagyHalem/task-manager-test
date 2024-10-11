/* eslint-disable react/prop-types */
import { Box } from "@mui/material";
import Header from "../components/Header";
import Task from "../components/Task";

const TaskManagerView = ({ onLogout }) => {
  return (
    <Box
      sx={{
        backgroundColor: "#ebdfd6",
        width: "1580px",
        height: "850px",
        margin: "auto",
        padding: "12px 36px",
        borderRadius: "12px",
      }}
    >
      <Header onLogout={onLogout} />
      <hr />
      <Task />
    </Box>
  );
};

export default TaskManagerView;
