export const getShuffledChoices = ( correct: string, topicQuestion: string[]): string[] => {
    const incorrectChoices = topicQuestion
      .filter(v => v !== correct)       
      .sort(() => 0.5 - Math.random())    
      .slice(0, 3);                      

    const combined = [...incorrectChoices, correct];
    return combined.sort(() => 0.5 - Math.random());
}