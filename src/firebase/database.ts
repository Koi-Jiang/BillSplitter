import {
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  documentId,
  getCountFromServer,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
  updateDoc,
} from "firebase/firestore";
import { app } from ".";
import { BillInfo } from "../utils/billInfo";
import { nanoid } from "nanoid";
import { instanceToPlain, plainToInstance } from "class-transformer";
import { EDITABLE_ID_LENGTH, READONLY_ID_LENGTH } from "../utils/constants";

const firestore = getFirestore(app);
const roomsCollection = collection(firestore, "rooms");

export interface RoomDocument {
  readonlyId: string;
  billInfos: BillDocument[];
  members: string[];
  roomName: string;
}

export interface BillDocument {
  id: string;
  amount: number;
  description: string;
  payer: string;
  lenders: string[];
  date: string;
}

// create room -> editable nanoid for the new room
export async function createRoomData(name: string): Promise<string> {
  // generate an editable room id
  let editableId: string;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    editableId = nanoid(EDITABLE_ID_LENGTH);
    // check for collision
    const q = query(roomsCollection, where(documentId(), "==", editableId));
    const snapshot = await getCountFromServer(q);
    if (snapshot.data().count == 0) break;
  }

  // generate a readonly room id
  let readonlyId: string;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    readonlyId = nanoid(READONLY_ID_LENGTH);
    const q = query(roomsCollection, where("readonlyId", "==", readonlyId));
    const snapshot = await getCountFromServer(q);
    if (snapshot.data().count == 0) {
      break;
    }
  }
  // create a room document in database, leave bills and members empty
  await setDoc(doc(roomsCollection, editableId), {
    readonlyId: readonlyId,
    billInfos: [],
    members: [],
    roomName: name,
  });

  // return editable room id
  return editableId;
}

// get room by room id / editable id -> all info + isEditable
export async function getRoomData(id: string): Promise<{
  room: Omit<RoomDocument, "billInfos"> & { billInfos: BillInfo[] };
  editable: boolean;
} | null> {
  // check if id is editableId
  let roomData: RoomDocument;
  const editable = id.length === EDITABLE_ID_LENGTH;

  if (id.length === EDITABLE_ID_LENGTH) {
    // editable id
    const d = doc(roomsCollection, id);
    const snapshot = await getDoc(d);
    if (!snapshot.exists()) return null;
    roomData = snapshot.data() as RoomDocument;
  } else if (id.length === READONLY_ID_LENGTH) {
    //readonly id
    const q = query(roomsCollection, where("readonlyId", "==", id));
    const snapshot = await getDocs(q);
    if (snapshot.empty) return null;
    roomData = snapshot.docs[0].data() as RoomDocument;
  } else {
    throw new Error("Invalid ID");
  }

  const room = {
    ...roomData,
    billInfos: plainToInstance(BillInfo, roomData.billInfos),
  };

  return {
    editable,
    room,
  };
}

// delete room by editable id
export async function deleteRoomData(id: string): Promise<boolean> {
  if (id.length === READONLY_ID_LENGTH) return false;
  const d = doc(roomsCollection, id);
  await deleteDoc(d);
  return true;
}

// rename room
export async function renameRoomData(id: string, newName: string): Promise<boolean> {
  if (id.length === READONLY_ID_LENGTH) return false;
  const d = doc(roomsCollection, id);
  await updateDoc(d, { roomName: newName });
  return true;
}

// add member
export async function addMemberData(id: string, name: string): Promise<boolean> {
  if (id.length === READONLY_ID_LENGTH) return false;
  const d = doc(roomsCollection, id);
  await updateDoc(d, { members: arrayUnion(name) });
  return true;
}

// delete member
export async function deleteMemberData(id: string, name: string): Promise<boolean> {
  if (id.length === READONLY_ID_LENGTH) return false;
  const d = doc(roomsCollection, id);
  await updateDoc(d, { members: arrayRemove(name) });
  return true;
}

// delete all members (can only be called when bill list is empty)
export async function deleteAllMemberData(id: string): Promise<boolean> {
  if (id.length === READONLY_ID_LENGTH) return false;
  const d = doc(roomsCollection, id);
  await updateDoc(d, { members: [] });
  return true;
}

// add bill
export async function updateBillData(id: string, b: BillInfo[]): Promise<boolean> {
  if (id.length === READONLY_ID_LENGTH) return false;
  const d = doc(roomsCollection, id);
  await updateDoc(d, { billInfos: instanceToPlain(b) });
  return true;
}

// delete all bills
export async function deleteAllBillData(id: string): Promise<boolean> {
  if (id.length === READONLY_ID_LENGTH) return false;
  const d = doc(roomsCollection, id);
  await updateDoc(d, { billInfos: [] });
  return true;
}
