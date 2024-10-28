import { ObjectId } from "mongodb";

export type EventInformation = {
  _id: ObjectId;
  id: string;
  title: string;
  description: string;
  location: string;
  date: Date;
  image: string;
  flyer: string;
  isFeatured: boolean;
  isGuestOnly: boolean;
}

export type ItemEntry = {
  _id: ObjectId;
  itemEntry: object;
  itemType: string;
  item: string;
  eventId: string;
}
