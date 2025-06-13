interface HighlightWordInSentenceProps{
  sentence: string;
  word: string;
}

export default function HighlightWordInSentence({sentence, word}: HighlightWordInSentenceProps){
    const lowerSentence = sentence.toLowerCase();
    const lowerWord = word.toLowerCase();
    const startIndex = lowerSentence.indexOf(lowerWord);

    if (startIndex === -1) {
      return <>{sentence}</>;
    }

    const before = sentence.slice(0, startIndex);
    const match = sentence.slice(startIndex, startIndex + word.length);
    const after = sentence.slice(startIndex + word.length);

    return (
      <p className='font-medium text-base16 dark:text-white'>
        {before}
        <strong>{match}</strong>
        {after}
      </p>
    );
  }