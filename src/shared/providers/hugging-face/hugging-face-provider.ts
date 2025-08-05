import logger from "@main/adapters/logger-adapter";
import {
  IHuggingFaceProvider,
  ISentimentAnalysisResult,
  IToxicityAnalysisResult,
} from "./hugging-face.struct";
import {
  SentimentScore,
  SentimentPrediction,
  PredictedSentiment,
  ConfidenceScore,
  ToxicityScore,
  ToxicityPrediction,
  PredictedToxicity,
} from "./hugging-face.types";

export class HuggingFaceProvider implements IHuggingFaceProvider {
  private readonly accessToken: string;

  private readonly baseUrl: string;

  private readonly sentimentModel: string;

  private readonly toxicityModel: string;

  private readonly confidenceThreshold = 0.3;

  constructor() {
    this.accessToken = process.env.HUGGING_FACE_ACCESS_TOKEN || "";
    this.baseUrl =
      process.env.HUGGING_FACE_BASE_URL ||
      "https://router.huggingface.co/hf-inference/models";
    this.sentimentModel =
      process.env.HUGGING_FACE_SENTIMENT_ANALYSIS_MODEL_URL ||
      "distilbert/distilbert-base-uncased-finetuned-sst-2-english";
    this.toxicityModel =
      process.env.HUGGING_FACE_TOXICITY_MODEL_URL || "unitary/toxic-bert";
  }

  async analyzeSentiment(text: string): Promise<ISentimentAnalysisResult> {
    try {
      logger.mapperInfo(
        `Executing Hugging Face Sentiment: ${text.substring(0, 50)}...`,
      );

      const sentimentScores = await this.fetchSentimentScores(text);
      const { predictedSentiment, confidence } =
        this.calculateSentiment(sentimentScores);
      const score = this.calculateSentimentScore(
        predictedSentiment,
        confidence,
      );

      logger.mapperInfo(
        `Hugging Face Sentiment result: ${predictedSentiment})`,
      );

      return {
        sentiment: predictedSentiment,
        confidence,
        score,
      };
    } catch (error) {
      logger.mapperError(`Error in Hugging Face Sentiment: ${error}`);
      throw error;
    }
  }

  async analyzeToxicity(text: string): Promise<IToxicityAnalysisResult> {
    try {
      logger.mapperInfo(
        `Executing Hugging Face Toxicity: ${text.substring(0, 50)}...`,
      );

      const toxicityScores = await this.fetchToxicityScores(text);
      const { predictedToxicity } = this.calculateToxicity(toxicityScores);

      logger.mapperInfo(`Hugging Face Toxicity result: ${predictedToxicity})`);

      return {
        toxicity: predictedToxicity,
      };
    } catch (error) {
      logger.mapperError(`Error in Hugging Face Toxicity: ${error}`);
      throw error;
    }
  }

  private async fetchSentimentScores(
    text: string,
  ): Promise<SentimentPrediction> {
    const response = await fetch(`${this.baseUrl}/${this.sentimentModel}`, {
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
      throw new Error(`Hugging Face Sentiment API error: ${response.status}`);
    }

    const data = await response.json();
    const predictions = Array.isArray(data) ? data : [data];
    return predictions[0] as SentimentPrediction;
  }

  private async fetchToxicityScores(text: string): Promise<ToxicityPrediction> {
    const response = await fetch(`${this.baseUrl}/${this.toxicityModel}`, {
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
      throw new Error(`Hugging Face Toxicity API error: ${response.status}`);
    }

    const data = await response.json();
    const predictions = Array.isArray(data) ? data : [data];
    return predictions[0] as ToxicityPrediction;
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

  private calculateToxicity(toxicityScores: ToxicityPrediction): {
    predictedToxicity: PredictedToxicity;
    confidence: ConfidenceScore;
  } {
    // Encontra a categoria com maior score
    let maxScore = 0;
    let predictedToxicity: PredictedToxicity = "non-toxic";

    toxicityScores.forEach((item: ToxicityScore) => {
      if (item.score > maxScore) {
        maxScore = item.score;
        predictedToxicity = item.label as PredictedToxicity;
      }
    });

    // Se o maior score for muito baixo, considera como não tóxico
    if (maxScore < 0.1) {
      return {
        predictedToxicity: "non-toxic",
        confidence: 1 - maxScore,
      };
    }

    return {
      predictedToxicity,
      confidence: maxScore,
    };
  }

  private calculateSentimentScore(
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
