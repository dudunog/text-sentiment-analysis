export type SentimentLabel = "NEGATIVE" | "POSITIVE";
export type SentimentScore = { label: SentimentLabel; score: number };
export type SentimentPrediction = SentimentScore[];
export type PredictedSentiment = "positive" | "negative" | "neutral";
export type ConfidenceScore = number;

export type ToxicityLabel =
  | "toxic"
  | "obscene"
  | "insult"
  | "identity_hate"
  | "threat";
export type ToxicityScore = { label: ToxicityLabel; score: number };
export type ToxicityPrediction = ToxicityScore[];
export type PredictedToxicity =
  | "toxic"
  | "obscene"
  | "insult"
  | "identity_hate"
  | "threat"
  | "non-toxic";
export type ToxicityCategory =
  | "violence"
  | "fake_news"
  | "terrorism"
  | "hate"
  | "sexual"
  | "other";
export type ToxicityCategoryScore = {
  category: ToxicityCategory;
  score: number;
};
