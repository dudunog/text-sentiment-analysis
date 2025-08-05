export interface TextAnalysisModel {
  id: string;
  text: string;
  sentiment: string;
  toxicity: string;
  frequent_words: string[];
  created_at?: Date;
}
