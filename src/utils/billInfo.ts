import { Transform } from "class-transformer";
import dayjs, { Dayjs } from "dayjs";
import { nanoid } from "nanoid";

export class BillInfo {
  id: string = nanoid();

  amount: number = 0;

  description: string = "";

  payer: string = "";

  lenders: string[] = [];

  @Transform(({ value }) => dayjs(value), { toClassOnly: true })
  @Transform(({ value }) => (value as Dayjs).valueOf(), { toPlainOnly: true })
  date: Dayjs = dayjs();
}
