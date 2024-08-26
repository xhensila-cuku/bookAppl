export interface Rooms {
  id: string;
  name: string;
  description: string;
  image: string | ArrayBuffer;
  price: number;
  numberOfBeds: number;
  guestHouseId: string;
  amenities: string[];
}
export type Room= {
  id: string;
  name: string;
  description: string;
  image: string | ArrayBuffer;
  price: number;
  numberOfBeds: number;
  guestHouseId: string;
  amenities: string[];
}