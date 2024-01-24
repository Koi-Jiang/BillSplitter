import { IconButton, ListItem, ListItemText, useTheme } from "@mui/material";
import { FC, useContext, useMemo } from "react";
import { numberFormatter } from "../../utils/numberFormatter";
import { BillInfo } from "../../utils/billInfo";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIconButton from "../common/DeleteIconButton/DeleteIconButton";
import { GlobalContext } from "../../contexts/GlobalContext";
import { SnackbarContext } from "../../contexts/SnackbarContextProvider";

export interface BillListItemArgs {
  billInfo: BillInfo;
  onDetailOpen: (billInfo: BillInfo) => void;
  onEditOpen: (billInfo: BillInfo) => void;
}

const BillListItem: FC<BillListItemArgs> = ({
  billInfo,
  onDetailOpen,
  onEditOpen,
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
  const { deleteBill, isEditableLink } = useContext(GlobalContext)!;
  const { openSnackbar } = useContext(SnackbarContext);

  return (
    <ListItem className="hover:opacity-70">
      <ListItemText
        className="cursor-pointer"
        onClick={() => onDetailOpen(billInfo)}
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
      {isEditableLink && 
        <>
          <IconButton onClick={() => onEditOpen(billInfo)}>
            <EditIcon />
          </IconButton>
          <DeleteIconButton
            onDelete={async () => {
              const success = await deleteBill(billInfo.id);
              if (success) {
                openSnackbar("Successfully deleted this bill");
              } else {
                openSnackbar("Failed to delete this bill", "error");
              }
            }}
          />
        </>
      }
    </ListItem>
  );
};

export default BillListItem;
