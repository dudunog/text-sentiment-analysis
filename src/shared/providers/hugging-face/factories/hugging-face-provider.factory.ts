import { IHuggingFaceProvider } from "../hugging-face.struct";
import { HuggingFaceProvider } from "../hugging-face-provider";

export const makeHuggingFaceProvider = (): IHuggingFaceProvider => {
  return new HuggingFaceProvider();
};
