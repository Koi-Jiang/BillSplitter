import { ListItem, ListItemText, useTheme } from "@mui/material";
import { FC, useMemo } from "react";

export interface BillListItemArgs {
  payer: string;
  lenders: string[];
  amount: number;
  description: string;
  date: number;
}

const BillListItem: FC<BillListItemArgs> = (args) => {
  const lendToStr = useMemo(
    () =>
      args.lenders.length > 2
        ? `${args.lenders.slice(0, 2).join(", ")} and 
          ${args.lenders.length - 2} more`
        : args.lenders.join(" and "),
    [args.lenders],
  );

  const { palette } = useTheme();

  return (
    <ListItem>
      <ListItemText
        primary={args.description}
        secondary={`${args.payer} paid for ${lendToStr}`}
        primaryTypographyProps={{
          component: "p",
          variant: "h5",
          className: "whitespace-nowrap text-ellipsis overflow-hidden",
        }}
        secondaryTypographyProps={{
          component: "p",
          variant: "h6",
          className:
            "whitespace-nowrap text-ellipsis overflow-hidden font-normal",
        }}
      />
      <ListItemText
        primary={`$${args.amount}`}
        className="flex-none"
        primaryTypographyProps={{
          variant: "h4",
          component: "p",
          color: palette.secondary.main,
          className: "md:text-[34px] text-2xl"
        }}
      />
    </ListItem>
  );
};

export default BillListItem;
