import {format, parseISO} from 'date-fns';

export const formatDate = (dateStr: string) => format(parseISO(dateStr), 'yyyy-MM-dd hh-mm-ss a');
