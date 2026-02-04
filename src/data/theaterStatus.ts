export type status = "available" | "occupied" | "selected";
export type seat = { seat: string; status: status };
export type TheaterRowType = { id: number; row: string; seats: seat[] };
export const seatData: TheaterRowType[] = [
  {
    id: 1,
    row: "A",
    seats: [
      { seat: "A1", status: "available" },
      { seat: "A2", status: "available" },
      { seat: "A3", status: "available" },
      { seat: "A4", status: "available" },
      { seat: "A5", status: "available" },
      { seat: "A6", status: "available" },
      { seat: "A7", status: "available" },
      { seat: "A8", status: "available" },
    ],
  },
  {
    id: 2,
    row: "B",
    seats: [
      { seat: "B1", status: "available" },
      { seat: "B2", status: "available" },
      { seat: "B3", status: "available" },
      { seat: "B4", status: "available" },
      { seat: "B5", status: "available" },
      { seat: "B6", status: "available" },
      { seat: "B7", status: "available" },
      { seat: "B8", status: "available" },
    ],
  },
  {
    id: 3,
    row: "C",
    seats: [
      { seat: "C1", status: "available" },
      { seat: "C2", status: "available" },
      { seat: "C3", status: "available" },
      { seat: "C4", status: "available" },
      { seat: "C5", status: "available" },
      { seat: "C6", status: "available" },
      { seat: "C7", status: "available" },
      { seat: "C8", status: "available" },
    ],
  },
  {
    id: 4,
    row: "D",
    seats: [
      { seat: "D1", status: "available" },
      { seat: "D2", status: "available" },
      { seat: "D3", status: "available" },
      { seat: "D4", status: "available" },
      { seat: "D5", status: "available" },
      { seat: "D6", status: "available" },
      { seat: "D7", status: "available" },
      { seat: "D8", status: "available" },
    ],
  },
  {
    id: 5,
    row: "E",
    seats: [
      { seat: "E1", status: "available" },
      { seat: "E2", status: "available" },
      { seat: "E3", status: "available" },
      { seat: "E4", status: "available" },
      { seat: "E5", status: "available" },
      { seat: "E6", status: "available" },
      { seat: "E7", status: "available" },
      { seat: "E8", status: "available" },
    ],
  },

  {
    id: 6,
    row: "F",
    seats: [
      { seat: "F1", status: "available" },
      { seat: "F2", status: "available" },
      { seat: "F3", status: "available" },
      { seat: "F4", status: "available" },
      { seat: "F5", status: "available" },
      { seat: "F6", status: "available" },
      { seat: "F7", status: "available" },
      { seat: "F8", status: "available" },
    ],
  },
];
