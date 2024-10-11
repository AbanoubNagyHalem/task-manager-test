/* eslint-disable react/prop-types */
import { Box, Button, Typography } from "@mui/material";

const Header = ({ onLogout }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        my: 5,
      }}
    >
      <Typography variant="h4">Task Manager</Typography>
      <Button variant="contained" onClick={onLogout}>
        Logout
      </Button>
    </Box>
  );
};

export default Header;
