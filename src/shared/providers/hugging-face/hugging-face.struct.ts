export interface ISentimentAnalysisResult {
  sentiment: "positive" | "negative" | "neutral";
  confidence: number;
  score: number;
}

export interface IHuggingFaceProvider {
  analyzeSentiment(text: string): Promise<ISentimentAnalysisResult>;
}
