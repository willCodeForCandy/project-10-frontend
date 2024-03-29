export const dateComparator = (event) => {
  const today = new Date();
  const eventDate = new Date(event.date);
  if (eventDate < today) {
    event.isPast = true;
  } else {
    event.isUpcoming = true;
  }
  return event;
};
