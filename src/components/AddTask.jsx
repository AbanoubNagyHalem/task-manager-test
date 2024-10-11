/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";

const AddTask = ({ onAddTask }) => {
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  const handleAddTask = () => {
    if (task && description && status) {
      onAddTask({ task, description, status });
      setTask("");
      setDescription("");
      setStatus("");
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", gap: "15px", my: 5 }}>
      <TextField
        label="Task"
        variant="outlined"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <TextField
        label="Description"
        variant="outlined"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        sx={{ minWidth: 500 }}
      />
      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel>Status</InputLabel>
        <Select value={status} onChange={(e) => setStatus(e.target.value)}>
          <MenuItem value="Not Started">Not Started</MenuItem>
          <MenuItem value="In Progress">In Progress</MenuItem>
          <MenuItem value="Finished">Finished</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" onClick={handleAddTask}>
        Add Task
      </Button>
    </Box>
  );
};

export default AddTask;
