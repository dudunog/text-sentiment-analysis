export const getDeepValue = (data: object, field: string) => {
  const splittedField = field.split(".");
  if (splittedField.length === 1) {
    return data?.[field];
  }

  const fields = splittedField.splice(1).join(".");
  const nextField = splittedField[0];
  return getDeepValue(data?.[nextField] as Record<string, unknown>, fields);
};
