import logger from "@main/adapters/logger-adapter";
import {
  IHuggingFaceProvider,
  ISentimentAnalysisResult,
} from "./hugging-face.struct";
import {
  SentimentScore,
  SentimentPrediction,
  PredictedSentiment,
  ConfidenceScore,
} from "./hugging-face.types";

export class HuggingFaceProvider implements IHuggingFaceProvider {
  private accessToken: string;

  private baseUrl: string;

  private model: string;

  constructor() {
    this.accessToken = process.env.HUGGING_FACE_ACCESS_TOKEN || "";
    this.baseUrl =
      process.env.HUGGING_FACE_BASE_URL ||
      "https://router.huggingface.co/hf-inference/models";
    this.model =
      process.env.HUGGING_FACE_SENTIMENT_ANALYSIS_MODEL_URL ||
      "distilbert/distilbert-base-uncased-finetuned-sst-2-english";
  }

  async analyzeSentiment(text: string): Promise<ISentimentAnalysisResult> {
    try {
      logger.mapperInfo(`Executing Hugging Face: ${text.substring(0, 50)}...`);

      const response = await fetch(`${this.baseUrl}/${this.model}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.accessToken}`,
        },
        body: JSON.stringify({
          inputs: text,
        }),
      });

      if (!response.ok) {
        throw new Error(`Hugging Face API error: ${response.status}`);
      }

      const data = await response.json();

      const predictions = Array.isArray(data) ? data : [data];
      const sentimentScores = predictions[0] as SentimentPrediction;

      let negativeScore = 0;
      let positiveScore = 0;

      sentimentScores.forEach((item: SentimentScore) => {
        if (item.label === "NEGATIVE") {
          negativeScore = item.score;
        } else if (item.label === "POSITIVE") {
          positiveScore = item.score;
        }
      });

      const scoreDifference = Math.abs(positiveScore - negativeScore);
      const threshold = 0.3;

      let predictedSentiment: PredictedSentiment;
      let confidence: ConfidenceScore;

      if (scoreDifference < threshold) {
        predictedSentiment = "neutral";
        confidence = 1 - scoreDifference;
      } else if (positiveScore > negativeScore) {
        predictedSentiment = "positive";
        confidence = positiveScore;
      } else {
        predictedSentiment = "negative";
        confidence = negativeScore;
      }

      let score = 0;
      if (predictedSentiment === "positive") {
        score = confidence;
      } else if (predictedSentiment === "negative") {
        score = -confidence;
      }

      logger.mapperInfo(`Hugging Face result: ${predictedSentiment})`);

      return {
        sentiment: predictedSentiment,
        confidence,
        score,
      };
    } catch (error) {
      logger.mapperError(`Error in Hugging Face: ${error}`);
      throw error;
    }
  }
}
