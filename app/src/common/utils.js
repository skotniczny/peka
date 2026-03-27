export const handleResponse = (response) => {
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
};

export const HHmm = new Intl.DateTimeFormat("pl", {
  hour: "2-digit",
  minute: "2-digit",
});

export const HHmmss = new Intl.DateTimeFormat("pl", {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});

export const ddMMyyyy = new Intl.DateTimeFormat("pl", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

export const formatDate = (dateTime, formatter) => {
  if (typeof dateTime === "string") {
    // API returns local time with Z suffix — strip it so Date parses as local
    dateTime = dateTime.replace(/Z$/, "");
  } else if (!(dateTime instanceof Date)) {
    throw new TypeError(`Expected Date or ISO string, got: ${dateTime}`);
  }

  const date = new Date(dateTime);

  if (isNaN(date)) {
    throw new TypeError(`Invalid date: ${dateTime}`);
  }

  return formatter.format(date);
};
