import { Room } from '../../../../../models/room.model';

export interface Book {
  id: string;
  roomId: string;
  bookFrom: string;
  bookTo: string;
  room: Room;
}
