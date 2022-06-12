function getSpanWord(word: string) {
  return `<span class="highlighted">${word}</span>`;
}

export function makeTextWithHighlight(noteText: string) {
  const returnString = noteText.split(' ').map((word:string) => {
    if (word.startsWith('#')) {
      return getSpanWord(word.slice(1));
    }
    return word;
  }).reduce((acc, word) => `${acc} ${word}`, '');
  return returnString;
}
