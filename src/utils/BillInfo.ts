import { Dayjs } from "dayjs";

export interface BillInfo {
  payer: string;
  lenders: string[];
  amount: number;
  description: string;
  date: Dayjs;
}
