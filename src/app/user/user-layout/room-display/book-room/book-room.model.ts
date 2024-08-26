import { Room } from '../../../../admin/components/modal/guest-houses/room/room/room.model';

export interface Book {
  id: string;
  roomId: string;
  bookFrom: string;
  bookTo: string;
  room: Room;
}
