export const getInitials = (value: string): string | null => {
  const strArray = value.split(' ');
  if (strArray.length === 1) return strArray[0].split('').slice(0, 2).join();
  if (strArray.length > 1) return `${strArray[0]}${strArray[1]}`;
  return null;
};
