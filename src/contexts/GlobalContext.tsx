import { FC, PropsWithChildren, createContext, useMemo, useState } from "react";
import { BillInfo } from "../utils/BillInfo";
import { Map, Set } from "immutable";
import { nanoid } from "nanoid";
import dayjs from "dayjs";

export interface GlobalContextArgs {
  members: string[];
  bills: BillInfo[];
  addMember: (member: string) => void;
  deleteMember: (member: string) => void;
  updateBill: (billInfo: BillInfo) => void;
  deleteBill: (id: string) => void;
}

// NOTE: set + immutable.js
export const GlobalContext = createContext<GlobalContextArgs | null>(null);

const GlobalContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [memberSet, setMemberSet] = useState<Set<string>>(
    Set(["san si wu liu cheng", "tao san jai xo"]),
  );
  const [billMap, setBillMap] = useState<Map<string, BillInfo>>(Map<string, BillInfo>({
    [nanoid()]:
    {
      id: "111111",
      amount: 2335,
      date: dayjs("2018-04-04T16:00:00.000Z"),
      payer: "Kelly",
      lenders: ["bill", "hihdfg"],
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit dui.",
    },
    [nanoid()]:
    {
      id: "222222",
      amount: 2335,
      date: dayjs("2018-04-04T16:00:00.000Z"),
      payer: "Kelly",
      lenders: ["bill", "hihdfg"],
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit dui.",
    }
  }));

  function addMember (member: string) {
    setMemberSet(memberSet.add(member));
  }
  function deleteMember (member: string) {
    setMemberSet(memberSet.delete(member));
  }
  function updateBill (billInfo: BillInfo) {
    setBillMap(billMap.set(billInfo.id, billInfo));
  }
  function deleteBill (id: string) {
    setBillMap(billMap.delete(id));
  }

  const members = useMemo(() => memberSet.toArray(), [memberSet]);
  const bills = useMemo(() => billMap.valueSeq().toArray(), [billMap]);

  return (
    <GlobalContext.Provider
      value={{
        members,
        bills,
        addMember,
        deleteMember,
        updateBill,
        deleteBill,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
