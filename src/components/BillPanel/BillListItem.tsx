import { IconButton, ListItem, ListItemText, useTheme } from "@mui/material";
import { FC, useMemo } from "react";
import { numberFormatter } from "../../utils/numberFormatter";
import { BillInfo } from "../../utils/BillInfo";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIconButton from "../common/DeleteIconButton/DeleteIconButton";

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
    <ListItem>
      <ListItemText
        className="cursor-pointer"
        onClick={() => onClick(billInfo)}
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
        className="flex-none mr-2"
        primaryTypographyProps={{
          variant: "h4",
          component: "p",
          color: palette.secondary.main,
          className: "md:text-[34px] text-2xl",
        }}
      />
      <IconButton>
        <EditIcon />
      </IconButton>
      <DeleteIconButton onDelete={() => console.log("delete")}/>
    </ListItem>
  );
};

export default BillListItem;
