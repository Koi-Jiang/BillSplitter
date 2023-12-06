import { Container, TextField, Typography } from "@mui/material";

function FrontPage() {
  return (
    <Container maxWidth="sm" className="flex flex-col min-h-screen items-center justify-center">
      <Typography variant="h4" component="h1">
        Create a Room to Split Your Bill
      </Typography>
      <TextField id="outlined-basic" label="Group Name" variant="standard" margin="normal" />
    </Container>
  );
}

export default FrontPage;
