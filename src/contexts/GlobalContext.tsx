import { FC, PropsWithChildren, createContext, useMemo, useState } from "react";
import { BillInfo } from "../utils/BillInfo";
import { Map, OrderedMap, OrderedSet } from "immutable";
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
export const GlobalContext = createContext<GlobalContextArgs>(null!);

const GlobalContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [memberSet, setMemberSet] = useState<OrderedSet<string>>(
    OrderedSet([
      "this bill is not that bill",
      "Bill Peng",
      "Emily",
      "Kelly",
      "this bill is notooo that bill",
      "just for test",
      "this's 20 charactors",
    ]),
  );
  const [billMap, setBillMap] = useState<OrderedMap<string, BillInfo>>(
    Map<string, BillInfo>({
      ["2346"]: {
        id: "2346",
        amount: 23460.1,
        date: dayjs("2018-04-04T16:00:00.000Z"),
        payer: "kelly",
        lenders: ["bill", "bill2", "hie", "hihdfg"],
        description: "Lorem ipsum dolor sit aliquam.",
      },
      ["222222"]: {
        id: "222222",
        amount: 222222.535,
        date: dayjs("2018-04-04T16:00:00.000Z"),
        payer: "Kelly",
        lenders: ["bill", "hihdfg"],
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit dui.",
      },
      ["333333"]: {
        id: "333333",
        amount: 333333.78,
        date: dayjs("2018-04-04T16:00:00.000Z"),
        payer: "Kelly",
        lenders: ["bill", "hihdfg"],
        description: "Lorem ipsum",
      },
      ["444444"]: {
        id: "444444",
        amount: 444444,
        date: dayjs("2018-04-04T16:00:00.000Z"),
        payer: "Kelly",
        lenders: ["bill", "hihdfg"],
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit dui.",
      },
    }),
  );

  function addMember(member: string) {
    setMemberSet(memberSet.add(member));
  }

  const deleteMember = (member: string) => {
    // NOTE: parse in a function to make sure v is the newest state and set the state to the returned value
    setMemberSet((v) => v.delete(member));
  };

  function updateBill(billInfo: BillInfo) {
    setBillMap(billMap.set(billInfo.id, billInfo));
  }

  function deleteBill(id: string) {
    setBillMap((v) => v.delete(id));
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
