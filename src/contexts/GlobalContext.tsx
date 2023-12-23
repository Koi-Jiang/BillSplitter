import { Dispatch, FC, PropsWithChildren, SetStateAction, createContext, useState } from "react";
import { BillInfo } from "../utils/BillInfo";

export interface GlobalContextArgs {
  members: string[];
  bills: BillInfo[];
}

export const GlobalContext = createContext<GlobalContextArgs | null>(null);

const GlobalContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [members, setMembers] = useState<string[]>([]);
  const [bills, setBills] = useState<BillInfo[]>([]);
  
  return (
    <GlobalContext.Provider value={{ members, setMembers, bills, setBills }} >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
