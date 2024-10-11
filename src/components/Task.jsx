import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  TextField,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Pagination,
  InputLabel,
} from "@mui/material";
import AddTask from "./AddTask";
import { Link } from "react-router-dom";

const Task = () => {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
      return storedTasks;
    } else {
      localStorage.setItem("tasks", JSON.stringify([]));
      return [];
    }
  });

  const [status, setStatus] = useState("");
  const [sortOrder, setSortOrder] = useState(""); 
  const [editTaskData, setEditTaskData] = useState({
    id: null,
    task: "",
    description: "",
    status: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 4;

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (task) => {
    const newTasks = [...tasks, { ...task, id: Date.now(), isEditing: false }];
    setTasks(newTasks);
  };

  const handleEditToggle = (id) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    setEditTaskData({ ...taskToEdit });

    setTasks((prev) => {
      return prev.map((task) =>
        task.id === id ? { ...task, isEditing: !task.isEditing } : task
      );
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditTaskData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveTask = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, ...editTaskData, isEditing: false } : task
    );
    setTasks(updatedTasks);
    setEditTaskData({ id: null, task: "", description: "", status: "" });
  };

  const handleDeleteTask = (id) => {
    const filteredTasks = tasks.filter((task) => task.id !== id);
    setTasks(filteredTasks);
  };

  const filteredTasks = status
    ? tasks.filter((task) => task.status === status)
    : tasks;

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortOrder === "dateOldest") {
      return a.id - b.id;
    } else if (sortOrder === "dateNewest") {
      return b.id - a.id;
    }
    return 0; 
  });

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = sortedTasks.slice(indexOfFirstTask, indexOfLastTask);

  return (
    <>
      <AddTask onAddTask={handleAddTask} />
      <hr />
      <FormControl sx={{ minWidth: 120, mb: 1, mr: 2 }}>
        <InputLabel>Sort</InputLabel>
        <Select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <MenuItem value="">None</MenuItem>
          <MenuItem value="dateOldest">Date (Oldest First)</MenuItem>
          <MenuItem value="dateNewest">Date (Newest First)</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ minWidth: 120, mb: 1 }}>
        <InputLabel>Status</InputLabel>
        <Select value={status} onChange={(e) => setStatus(e.target.value)}>
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Not Started">Not Started</MenuItem>
          <MenuItem value="In Progress">In Progress</MenuItem>
          <MenuItem value="Finished">Finished</MenuItem>
        </Select>
      </FormControl>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        {currentTasks.map((task) => (
          <Card key={task.id} sx={{ width: "45%", p: 3, mb: 3 }}>
            {task.isEditing ? (
              <>
                <TextField
                  label="Task"
                  name="task"
                  value={editTaskData.task}
                  onChange={handleInputChange}
                  fullWidth
                  margin="dense"
                />
                <TextField
                  label="Description"
                  name="description"
                  value={editTaskData.description}
                  onChange={handleInputChange}
                  fullWidth
                  margin="dense"
                />
                <FormControl fullWidth margin="dense">
                  <Select
                    name="status"
                    value={editTaskData.status}
                    onChange={handleInputChange}
                  >
                    <MenuItem value="Not Started">Not Started</MenuItem>
                    <MenuItem value="In Progress">In Progress</MenuItem>
                    <MenuItem value="Finished">Finished</MenuItem>
                  </Select>
                </FormControl>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 2,
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={() => handleSaveTask(task.id)}
                  >
                    Save
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => handleEditToggle(task.id)}
                  >
                    Cancel
                  </Button>
                </Box>
              </>
            ) : (
              <>
                <Typography variant="h5">{task.task}</Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  {task.description}
                </Typography>
                <Typography
                  sx={{
                    backgroundColor:
                      task.status === "Not Started"
                        ? "#f1c6c1"
                        : task.status === "In Progress"
                        ? "#ffd966"
                        : "#b6d7a8",
                    padding: 1,
                    fontWeight: 700,
                    textAlign: "center",
                  }}
                >
                  {task.status}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 2,
                  }}
                >
                  <Button
                    variant="outlined"
                    onClick={() => handleEditToggle(task.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    component={Link}
                    to={`/task/${task.id}`}
                  >
                    View
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => handleDeleteTask(task.id)}
                  >
                    Delete
                  </Button>
                </Box>
              </>
            )}
          </Card>
        ))}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        {filteredTasks.length > tasksPerPage && (
          <Pagination
            count={Math.ceil(filteredTasks.length / tasksPerPage)}
            page={currentPage}
            onChange={(e, page) => setCurrentPage(page)}
            variant="outlined"
          />
        )}
      </Box>
    </>
  );
};

export default Task;
