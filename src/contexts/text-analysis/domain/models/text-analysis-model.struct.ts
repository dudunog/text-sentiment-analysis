export interface TextAnalysisModel {
  id: string;
  text: string;
  sentiment: string;
  frequent_words: string[];
  created_at?: Date;
}
