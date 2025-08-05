export type CreationModel<T> = Omit<T, "id" | "createdAt" | "updatedAt">;
