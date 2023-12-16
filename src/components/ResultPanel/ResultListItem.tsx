import { ListItem, Typography, useTheme } from "@mui/material";
import { FC } from "react";
import EastIcon from "@mui/icons-material/East";
import { numberFormatter } from "../../utils/numberFormatter";

export interface ResultListItemArgs {
  payer: string;
  payee: string;
  amount: number;
}

const ResultListItem: FC<ResultListItemArgs> = ({ payer, payee, amount }) => {
  const { palette } = useTheme();

  return (
    <ListItem className="grid grid-cols-[2fr_1fr_2fr_2fr] grid-rows-1">
      <Typography
        className="row-auto col-auto"
        variant="h6"
        component="p"
        fontWeight="normal"
      >
        {payer}
      </Typography>
      <EastIcon className="row-auto col-auto" />
      <Typography
        className="row-auto col-auto"
        variant="h6"
        component="p"
        fontWeight="normal"
      >
        {payee}
      </Typography>

      <Typography
        className="row-auto col-span-1"
        variant="h5"
        component="p"
        fontWeight="normal"
        color={palette.secondary.main}
      >
        {numberFormatter(amount)}
      </Typography>
    </ListItem>
  );
};

export default ResultListItem;
