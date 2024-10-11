import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, Typography, Button } from "@mui/material";
import { useState, useEffect } from "react";

const TaskDetailsView = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const foundTask = storedTasks.find((t) => t.id.toString() === taskId);
    setTask(foundTask);
  }, [taskId]);

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <Card sx={{ maxWidth: 1200, margin: "auto", mt: 25 }}>
      <CardContent>
        <Button variant="outlined" onClick={handleBackClick} sx={{ mb: 2 }}>
          Back
        </Button>
        {task ? (
          <>
            <Typography gutterBottom variant="h5">
              {task.task}
            </Typography>
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
          </>
        ) : (
          <Typography>Task not found</Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default TaskDetailsView;
