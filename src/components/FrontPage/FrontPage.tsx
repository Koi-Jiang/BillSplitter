import {
  Box,
  Container,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function FrontPage() {
  const [name, setName] = useState<string>("");
  const navigate = useNavigate();

  return (
    <Container
      maxWidth="md"
      className="flex flex-col min-h-screen min-h-[100dvh] 
        items-center justify-center"
    >
      <Typography variant="h5" component="h1" gutterBottom>
        Create a Room
      </Typography>
      <Box className="flex items-center w-full">
        <TextField
          id="outlined-basic"
          fullWidth
          variant="standard"
          margin="none"
          placeholder="What is it called..?"
          inputProps={{ maxLength: 50, style: { fontSize: "xx-large" } }}
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyUp={(e) => e.code === "Enter" && navigate(`/${name}`)}
        />
        <IconButton color="primary" disabled={name === ""} href={`/${name}`}>
          <ArrowForwardIcon fontSize="large" />
        </IconButton>
      </Box>
    </Container>
  );
}

export default FrontPage;
