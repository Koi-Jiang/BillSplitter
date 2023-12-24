import { AppBar, List, Toolbar, Typography } from "@mui/material";
import { useContext } from "react";
import ResultListItem from "./ResultListItem";
import { GlobalContext } from "../../contexts/GlobalContext";

function ResultPanel() {

  const { transactions } = useContext(GlobalContext)!;

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
        {
          transactions.map((transaction, index) => (
            <ResultListItem
              key={index}
              from={transaction.from}
              to={transaction.to}
              amount={transaction.amount}
            />
          ))
        }
      </List>
    </>
  );
}

export default ResultPanel;
