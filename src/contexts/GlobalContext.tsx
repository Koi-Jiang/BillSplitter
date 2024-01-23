import {
  FC,
  PropsWithChildren,
  createContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { BillInfo } from "../utils/billInfo";
import { Map, OrderedMap, OrderedSet } from "immutable";
import { Transaction } from "../utils/transaction";
import _ from "lodash";
import {
  addMemberData,
  deleteMemberData,
  getRoomData,
  updateBillData,
} from "../firebase/database";
import { useNavigate, useParams } from "react-router-dom";

export interface GlobalContextArgs {
  members: string[];
  bills: BillInfo[];
  transactions: Transaction[];
  addMember: (member: string) => boolean;
  deleteMember: (member: string) => boolean;
  updateBill: (billInfo: BillInfo) => void;
  deleteBill: (id: string) => void;
  isEditableLink: boolean;
  roomName: string;
  readonlyId: string;
}

// NOTE: set + immutable.js
export const GlobalContext = createContext<GlobalContextArgs>(null!);

const GlobalContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const roomLink = useParams().roomId!;
  const [isEditableLink, setIsEditableLink] = useState<boolean>(false);
  const [roomName, setRoomName] = useState<string>("Loading...");
  const [readonlyId, setReadonlyId] = useState<string>("");
  const [memberSet, setMemberSet] = useState<OrderedSet<string>>(
    OrderedSet([]),
  );
  const [billMap, setBillMap] = useState<OrderedMap<string, BillInfo>>(
    Map<string, BillInfo>({}),
  );

  const navigate = useNavigate();

  async function loadRoomData() {
    const roomData = await getRoomData(roomLink!);
    if (roomData == null) {
      alert("This room doesn't exist");
      navigate("/");
      return;
    }
    setRoomName(roomData.room.roomName);
    setIsEditableLink(roomData.editable);
    setReadonlyId(roomData.room.readonlyId);
    setMemberSet(OrderedSet(roomData.room.members));
    setBillMap(Map(roomData.room.billInfos.map((v) => [v.id, v])));
  }

  useEffect(() => {
    loadRoomData();
  }, []);

  function addMember(member: string): boolean {
    if (memberSet.has(member)) {
      return false;
    }
    setMemberSet(memberSet.add(member));
    addMemberData(roomLink, member);
    return true;
  }

  const deleteMember = (member: string) => {
    // check if the member is the payer or lender of any bill
    for (const bill of billMap.values()) {
      if (bill.payer === member || bill.lenders.includes(member)) {
        // if so, do not delete the member, return false
        return false;
      }
    }

    // NOTE: parse in a function to make sure v is the newest state and
    //       set the state to the returned value
    setMemberSet((v) => v.delete(member));
    deleteMemberData(roomLink, member);
    return true;
  };

  function updateBill(billInfo: BillInfo) {
    const newBills = billMap.set(billInfo.id, billInfo);
    setBillMap(newBills);
    updateBillData(roomLink, newBills.valueSeq().toArray());
  }

  function deleteBill(id: string) {
    setBillMap((v) => {
      const newMap = v.delete(id);
      updateBillData(roomLink, newMap.valueSeq().toArray());
      return newMap;
    });
  }

  function calcResults(): Transaction[] {
    // skip if bills or members are null
    if (bills.length == 0 || members.length == 0) return [];

    // 1. create a table of member and its cumulative credits, init to 0
    const cumulativeCredits: Record<string, number> = {};
    for (let i = 0; i < members.length; i++) {
      cumulativeCredits[members[i]] = 0;
    }

    // 2. for each bill, add the amount to the payer,
    //    and minus the share from each lender
    for (let i = 0; i < bills.length; i++) {
      const currentBill = bills[i];
      cumulativeCredits[currentBill.payer] += currentBill.amount;
      const share = currentBill.amount / currentBill.lenders.length;

      for (let j = 0; j < currentBill.lenders.length; j++) {
        cumulativeCredits[currentBill.lenders[j]] -= share;
      }
    }

    // 3. group the members by sign
    const group = _.groupBy(Object.entries(cumulativeCredits), ([, v]) =>
      Math.sign(v),
    );

    // 4. sort the positive and negative list so that the first element
    //    is the one with the largest amount
    const posList = group[1].toSorted((a, b) => Math.sign(b[1] - a[1]));
    const negList = group[-1].toSorted((a, b) => Math.sign(a[1] - b[1]));

    // if one of the list is empty, then the other list must be empty too,
    // skip the calculation and return empty array
    if (posList.length === 0) {
      return [];
    }

    const results: Transaction[] = [];

    // Keep track of the amount needed for the current positive member
    let posNeed = posList[0][1];
    // Keep track of the amount left for the current negative member
    let negLeft = negList[0][1];

    // 5. while both list are not empty, keep calculating
    while (posList.length > 0 && negList.length > 0) {
      // the amount to be paid in this transaction is the smalller one of
      // the amount needed for the current positive member and the amount
      // left for the current negative member
      const value = Math.min(posNeed, -negLeft);

      // add the transaction to the result
      results.push({
        from: negList[0][0],
        to: posList[0][0],
        amount: value,
      });

      // update the amount needed for the current positive member and
      // the amount left for the current negative member
      posNeed -= value;
      negLeft += value;

      // if the amount needed for the current positive member is 0,
      // get the next positive member
      if (posNeed <= 0) {
        posList.shift();

        // if there is no more positive member, break the loop
        if (posList.length === 0) break;

        // update the amount needed for the current positive member
        posNeed = posList[0][1];
      }

      // if the amount left for the current negative member is 0,
      // get the next negative member
      if (negLeft >= 0) {
        negList.shift();

        // this is not necessary since the two list should be empty
        // at the same time, but just in case
        if (negList.length === 0) break;

        // update the amount left for the current negative member
        negLeft = negList[0][1];
      }
    }

    return results;
  }

  const members = useMemo(() => memberSet.toArray(), [memberSet]);
  const bills = useMemo(() => billMap.valueSeq().toArray(), [billMap]);
  const transactions = useMemo(calcResults, [members, bills]);

  return (
    <GlobalContext.Provider
      value={{
        members,
        bills,
        transactions,
        addMember,
        deleteMember,
        updateBill,
        deleteBill,
        isEditableLink,
        roomName,
        readonlyId,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
