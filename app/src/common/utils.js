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

export const formatDate = (dateTimetring, format) => {
  const parsedDate = parseDateTimeString(dateTimetring)
  let output = "";
  let regex = /(HH)|(MM)|(dd)|(mm)|(ss)|(yyyy)|(zzzz)|([^HMdmsyz']+)/g;
  let match;

  // eslint-disable-next-line
  while (match = regex.exec(format)) {
    output += parsedDate[match[0]] || match[0]
  }
  return output
}
