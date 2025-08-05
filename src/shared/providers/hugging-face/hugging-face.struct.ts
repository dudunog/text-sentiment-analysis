export interface ISentimentAnalysisResult {
  sentiment: "positive" | "negative" | "neutral";
  confidence: number;
  score: number;
}

export interface IToxicityAnalysisResult {
  toxicity:
    | "toxic"
    | "obscene"
    | "insult"
    | "identity_hate"
    | "threat"
    | "non-toxic";
}

export interface IHuggingFaceProvider {
  analyzeSentiment(text: string): Promise<ISentimentAnalysisResult>;
  analyzeToxicity(text: string): Promise<IToxicityAnalysisResult>;
}
