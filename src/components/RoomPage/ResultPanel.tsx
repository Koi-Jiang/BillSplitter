import { AppBar, Toolbar, Typography } from "@mui/material";

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
      <div className="px-2">
        <div>
          <p>Lorem, ipsum.</p>
        </div>
        <div>
          <p>Magnam, dolorem.</p>
        </div>
        <div>
          <p>Laborum, dolorum.</p>
        </div>
      </div>
    </>
  );
}

export default ResultPanel;
