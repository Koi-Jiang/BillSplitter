import { AppBar, List, Toolbar, Typography } from "@mui/material";
import ResultListItem from "./ResultListItem";

function ResultPanel() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography component="h2" variant="h6" className="flex-auto">
            Results
          </Typography>
        </Toolbar>
      </AppBar>
      <List>
        <ResultListItem payee="god" payer="static" amount={6666}/>
        <ResultListItem payee="godasdfs" payer="xxtatic" amount={66660}/>
        <ResultListItem payee="godasd" payer="static" amount={64666}/>
        <ResultListItem payee="god236" payer="static" amount={6666}/>
        <ResultListItem payee="god" payer="static" amount={66666}/>
      </List>
    </>
  );
}

export default ResultPanel;
