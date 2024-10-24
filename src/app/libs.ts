export const formatDate = (date: Date, format: 'dd-mm-yyyy' | 'mm/dd/yyyy' | 'yyyy.mm.dd' | 'dd.mm.yyyy', addTime?: boolean): string => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()

  let result = ''
  switch (format) {
    case 'dd-mm-yyyy':
      result = `${day}-${month}-${year}`;
      break;
    case 'mm/dd/yyyy':
      result = `${month}/${day}/${year}`;
      break;
    case 'yyyy.mm.dd':
      result = `${year}.${month}.${day}`;
      break;
    case 'dd.mm.yyyy':
      result = `${day}.${month}.${year}`;
      break;
    default:
      throw new Error('Invalid date format');
  }
  return addTime ? `${result} ${hours < 10 ? '0'+hours : hours}:${minutes < 10 ? '0'+minutes : minutes}:${seconds < 10 ? '0'+seconds : seconds}` : result
}
