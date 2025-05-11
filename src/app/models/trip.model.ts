export interface Trip {
  id: number;
  origin: string;
  destination: string;
  date: string;
  time: string;
  availableSeats: number;
  driverId: number;
  price: number;
}
