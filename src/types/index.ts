export interface EVENT_DATA_TYPE {
  _id: string;
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

export interface ITEM_ENTRY_TYPE {
  _id: string;
  itemEntry: object;
  itemType: string;
  item: string;
  eventId: string;
}
