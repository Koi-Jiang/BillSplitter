import { Dayjs } from "dayjs";

export interface BillInfo {
  id: string;
  payer: string;
  lenders: string[];
  amount: number;
  description: string;
  date: Dayjs;
}
