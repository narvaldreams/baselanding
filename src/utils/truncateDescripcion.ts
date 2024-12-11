export const truncateDescription = (text: string, maxLength: number = 100) => {
  if (!text) return '';
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};