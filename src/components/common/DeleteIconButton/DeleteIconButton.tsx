/// <reference types="vite-plugin-svgr/client" />

import { IconButton } from "@mui/material";
import "./deleteIconButton.scss";
import DeleteIcon from "./deleteIcon.svg?react";
import { FC, useCallback, useRef, useState } from "react";
import classNames from "classnames";
import _ from "lodash";

export interface DeleteIconButtonArgs {
  onDelete: () => void;
}

const DeleteIconButton: FC<DeleteIconButtonArgs> = ({ onDelete }) => {
  const [isConfirm, setIsConfirm] = useState<boolean>(false);
  const timeoutId = useRef<number>();

  const handleClick = useCallback(_.debounce(() => {
    setIsConfirm((v) => {
      if(v) {
        if (timeoutId.current != null) {
          clearTimeout(timeoutId.current);
        }
        onDelete();
        return false;
      }
      else {
        timeoutId.current = setTimeout(() => setIsConfirm(false), 3500);
        return true;
      }
    });
  }, 500, { leading: true, trailing: false }), []);

  return (
    <IconButton
      id="delete-btn"
      className={classNames("icon-btn p-[7px]", { confirm: isConfirm })}
      onClick={handleClick}
    >
      <DeleteIcon />
    </IconButton>
  );
};

export default DeleteIconButton;
