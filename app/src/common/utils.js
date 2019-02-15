const parseDateTimeString = (dateTimeString) => {
  const [date, timeAndZone] = dateTimeString.split("T");
  const [year, month, day] = date.split("-");
  const [time, zone] = timeAndZone.split(".");
  const [hours, minutes, seconds] = time.split(":");
  return {
    "yyyy": year,
    "MM": month,
    "dd": day,
    "HH": hours,
    "mm": minutes,
    "ss": seconds,
    "zzzz": zone
  }
}

export const getTime = (dateTimetring) => {
  const { HH, mm } = parseDateTimeString(dateTimetring)
  return HH + ":" + mm;
}
