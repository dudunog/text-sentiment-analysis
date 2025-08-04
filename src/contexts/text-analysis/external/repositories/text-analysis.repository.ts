import { AppDataSource } from "@main/config/database/data-source";
import { ITextAnalysisRepository } from "@contexts/text-analysis/usecases/_ports/repositories/text-analysis-repository.struct";
import { CreationModel } from "@shared/protocols/creation-model";
import { TextAnalysisModel } from "@contexts/text-analysis/domain/models/text-analysis-model.struct";
import { TextAnalysisEntity } from "../entities/text-analysis-entity";

export class TextAnalysisRepository implements ITextAnalysisRepository {
  constructor(
    private textAnalysisCollection = AppDataSource.getRepository(
      TextAnalysisEntity,
    ),
  ) {}

  async create(
    data: CreationModel<TextAnalysisModel>,
  ): Promise<TextAnalysisModel> {
    const insertedInvoice = this.textAnalysisCollection.create(data);
    return await this.textAnalysisCollection.save(insertedInvoice);
  }

  async list(): Promise<TextAnalysisModel[]> {
    return this.textAnalysisCollection.find();
  }

  async delete(data: TextAnalysisModel): Promise<void> {
    await this.textAnalysisCollection.delete(data.id);
  }
}
