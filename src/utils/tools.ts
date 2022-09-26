import { DateType } from 'api/kino';

export const showDate = (date: DateType) => {
  const year = date.year;
  const month = date.m;
  const day = date.d;
  return `${day}/${month}/${year}`;
};
