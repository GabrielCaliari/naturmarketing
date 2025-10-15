export const getInitialNameLetters = (name: string): string => {
  if (!name || name.trim() === '') {
    return 'U';
  }

  const words = name.trim().split(' ');
  
  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase();
  }
  
  // Get first letter of first and last word
  const firstLetter = words[0].charAt(0).toUpperCase();
  const lastLetter = words[words.length - 1].charAt(0).toUpperCase();
  
  return firstLetter + lastLetter;
};
