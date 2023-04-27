const EVENTS = [
  {
    _id: { $oid: "6356c11f5cac4a56ab03d7f6" },
    id: "sparks2201",
    title: "Cody's Corner Halloween Party 2022",
    description: "It's a Halloween Party!",
    location: "Cody's Corner",
    date: "2022-10-22 17:00:00",
    image: "images/halloween-flyer.jpeg",
    flyer: "/images/halloween-flyer.jpeg",
    isFeatured: false,
    isGuestOnly: false,
  },
  {
    _id: { $oid: "63e0a755a0d5af8e23163406" },
    id: "sparks2501",
    title: "Cody's Corner Crawfish Boil 2025",
    description: "It's a crawfish boil!",
    location: "Cody's Corner",
    date: "2025-04-01 14:00:00",
    image: "images/crawfishboil.jpg",
    flyer: "/images/crawfishboil.jpg",
    isFeatured: false,
    isGuestOnly: true,
  },
  {
    _id: { $oid: "64359fa2ecb34b12b4864b2e" },
    id: "sparks2302",
    title: "Cody's (Almost) 4th of July Party",
    description:
      "It's a party with booms and barbecue! Official date still to be determined.",
    location: "Cody's Corner",
    date: "2023-07-01 16:00:00",
    image: "images/fourthofjuly.jpg",
    flyer: "/images/fourthofjuly.jpg",
    isFeatured: true,
    isGuestOnly: false,
  },
];

export function getFeaturedEvents() {
  return EVENTS.filter((event) => event.isFeatured);
}

export function getAllEvents() {
  return EVENTS;
}

export function getFilteredEvents(dateFilter) {
  const { year, month } = dateFilter;

  let filteredEvents = EVENTS.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
}

export function getEventById(id) {
  return EVENTS.find((event) => event.id === id);
}
