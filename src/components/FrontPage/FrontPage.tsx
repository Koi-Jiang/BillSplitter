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
import { createRoomData } from "../../firebase/database";
import { ROOM_NAME_MAX_LENGTH } from "../../utils/constants";

function FrontPage() {
  const [name, setName] = useState<string>("");
  const navigate = useNavigate();

  async function handleCreateRoom() {
    const editableId = await createRoomData(name);
    navigate(`/${editableId}`);
  }

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
          inputProps={{
            maxLength: ROOM_NAME_MAX_LENGTH,
            style: { fontSize: "xx-large" },
          }}
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyUp={async (e) =>
            e.code === "Enter" && (await handleCreateRoom())
          }
        />
        <IconButton
          color="primary"
          disabled={name.trim() === ""}
          onClick={handleCreateRoom}
        >
          <ArrowForwardIcon fontSize="large" />
        </IconButton>
      </Box>
    </Container>
  );
}

export default FrontPage;
