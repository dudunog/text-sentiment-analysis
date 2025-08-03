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
  private readonly accessToken: string;

  private readonly baseUrl: string;

  private readonly model: string;

  private readonly confidenceThreshold = 0.3;

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

      const sentimentScores = await this.fetchSentimentScores(text);
      const { predictedSentiment, confidence } =
        this.calculateSentiment(sentimentScores);
      const score = this.calculateScore(predictedSentiment, confidence);

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

  private async fetchSentimentScores(
    text: string,
  ): Promise<SentimentPrediction> {
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
    return predictions[0] as SentimentPrediction;
  }

  private calculateSentiment(sentimentScores: SentimentPrediction): {
    predictedSentiment: PredictedSentiment;
    confidence: ConfidenceScore;
  } {
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

    if (scoreDifference < this.confidenceThreshold) {
      return {
        predictedSentiment: "neutral",
        confidence: 1 - scoreDifference,
      };
    }

    if (positiveScore > negativeScore) {
      return {
        predictedSentiment: "positive",
        confidence: positiveScore,
      };
    }

    return {
      predictedSentiment: "negative",
      confidence: negativeScore,
    };
  }

  private calculateScore(
    predictedSentiment: PredictedSentiment,
    confidence: ConfidenceScore,
  ): number {
    if (predictedSentiment === "positive") {
      return confidence;
    }
    if (predictedSentiment === "negative") {
      return -confidence;
    }
    return 0;
  }
}
