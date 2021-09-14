import moment from "moment";

export const formatDate = (date, format = 'DD/MM/YYYY') => {
  let momentDate = moment(date);
  if (momentDate.isSame(1970, 'year')) {
    return null;
  }
  if (format  === 'DateObject') return new Date(date);

  return momentDate.format(format);
}