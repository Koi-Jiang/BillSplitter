import { ListItem, ListItemText, useTheme } from "@mui/material";
import { FC, useMemo } from "react";
import { numberFormatter } from "../../utils/numberFormatter";
import { BillInfo } from "../../utils/BillInfo";

export interface BillListItemArgs {
  billInfo: BillInfo;
  onClick: (billInfo: BillInfo) => void;
}

const BillListItem: FC<BillListItemArgs> = ({
  billInfo,
  onClick
}) => {
  const lendToStr = useMemo(
    () =>
      billInfo.lenders.length > 2
        ? `${billInfo.lenders.slice(0, 2).join(", ")} and 
          ${billInfo.lenders.length - 2} more`
        : billInfo.lenders.join(" and "),
    [billInfo.lenders],
  );

  const { palette } = useTheme();

  return (
    <ListItem onClick={() => onClick(billInfo)}>
      <ListItemText
        primary={billInfo.description}
        secondary={`${billInfo.payer} paid for ${lendToStr}`}
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
        primary={numberFormatter(billInfo.amount)}
        className="flex-none"
        primaryTypographyProps={{
          variant: "h4",
          component: "p",
          color: palette.secondary.main,
          className: "md:text-[34px] text-2xl",
        }}
      />
    </ListItem>
  );
};

export default BillListItem;
