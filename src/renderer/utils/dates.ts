import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';

export const formatDate = (dateStr: string) =>
  dateStr.length ? format(parseISO(dateStr), 'yyyy-MM-dd hh:mm:ss a') : '';

export const parseDate = (dateStr: string): Date => parseISO(dateStr);
