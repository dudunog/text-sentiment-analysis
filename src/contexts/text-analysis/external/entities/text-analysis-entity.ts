import { TextAnalysisModel } from "@contexts/text-analysis/domain/models/text-analysis-model.struct";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("text_analysis")
export class TextAnalysisEntity implements TextAnalysisModel {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  text: string;

  @Column()
  sentiment: string;

  @Column("text", { array: true })
  frequent_words: string[];

  @CreateDateColumn()
  created_at: Date;
}
