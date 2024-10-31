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

export type ItemDetail = {
  _id: string;
  itemEntry: {
    itemType: string;
    item: string;
    eventId: string;
  };
};
