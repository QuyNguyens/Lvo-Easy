export const getShuffledChoices = ( correct: string, topicQuestion: string[]): string[] => {
    const incorrectChoices = topicQuestion
      .filter(v => v !== correct)       
      .sort(() => 0.5 - Math.random())    
      .slice(0, 3);                      

    const combined = [...incorrectChoices, correct];
    return combined.sort(() => 0.5 - Math.random());
}

export function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}