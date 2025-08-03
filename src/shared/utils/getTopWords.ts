import * as sw from "stopword";

export function getTopWords(
  text: string,
  topN = 5,
): { word: string; count: number }[] {
  const cleanedText = text
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .split(/\s+/);

  const filteredWords = sw.removeStopwords(cleanedText, sw.pt);

  const wordCounts: Record<string, number> = {};
  filteredWords.forEach((word) => {
    if (!word) return;
    wordCounts[word] = (wordCounts[word] || 0) + 1;
  });

  return Object.entries(wordCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, topN)
    .map(([word, count]) => ({ word, count }));
}
