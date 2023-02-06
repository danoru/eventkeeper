const EVENTS = [
  {
    _id: { $oid: "6356c11f5cac4a56ab03d7f6" },
    id: "sparks2201",
    title: "Cody's Corner Halloween Party 2022",
    description: "It's a Halloween Party!",
    location: "Cody's Corner",
    date: "2022-10-22",
    image: "images/halloween-flyer.jpeg",
    flyer: "/images/halloween-flyer.jpeg",
    isFeatured: false,
  },
  {
    _id: { $oid: "6356c27c5cac4a56ab03d7f8" },
    id: "sparks2202",
    title: "Cody's Corner Friendsgiving 2022",
    description: "It's a Friendsgiving Party!",
    location: "Cody's Corner",
    date: "2022-11-26",
    image: "images/halloween-flyer.jpeg",
    flyer: "/images/halloween-flyer.jpeg",
    isFeatured: false,
  },
  {
    id: "sparks2301",
    title: "Cody's Corner Crawfish Boil 2023",
    description: "It's a crawfish boil!",
    location: "Cody's Corner",
    date: "2023-4-1",
    image: "images/crawfishboil.jpg",
    flyer: "/images/crawfishboil.jpg",
    isFeatured: true,
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
