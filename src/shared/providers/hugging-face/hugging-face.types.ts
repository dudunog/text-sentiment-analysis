export type SentimentLabel = "NEGATIVE" | "POSITIVE";
export type SentimentScore = { label: SentimentLabel; score: number };
export type SentimentPrediction = SentimentScore[];
export type PredictedSentiment = "positive" | "negative" | "neutral";
export type ConfidenceScore = number;
