import { TextAnalysisModel } from "@contexts/text-analysis/domain/models/text-analysis-model.struct";
import { CreationModel } from "@shared/protocols/creation-model";

export interface ITextAnalysisRepository {
  create(data: CreationModel<TextAnalysisModel>): Promise<TextAnalysisModel>;
  list(): Promise<TextAnalysisModel[]>;
  delete(data: TextAnalysisModel): Promise<void>;
}
