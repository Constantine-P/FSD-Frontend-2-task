function numToWord(number: number, wordForms: string[]) {
  number = Math.abs(number) % 100;
  const num = number % 10;
  if (number > 10 && number < 20) return wordForms[2];
  if (num > 1 && num < 5) return wordForms[1];
  if (num === 1) return wordForms[0];
  return wordForms[2];
}

export default numToWord;
