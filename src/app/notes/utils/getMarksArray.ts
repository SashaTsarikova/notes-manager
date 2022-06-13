export function getMarksArr(noteText: string): string[] {
  const arr = noteText.split(' ')
    .map((word:string) => {
      if (word.endsWith(',') || word.endsWith('.') || word.endsWith('!')) {
        return word.slice(0, word.length - 1);
      }
      if (word.startsWith(',') || word.startsWith('.') || word.startsWith('!')) {
        return word.slice(1);
      }
      return word;
    })
    .filter((word:string) => word.startsWith('#'));
  const returnArr = arr.map((word:string) => word.slice(1));
  return returnArr;
}
