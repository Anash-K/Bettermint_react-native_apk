export const isFormValid = (formData: Record<string, any>): boolean => {
  for (const key in formData) {
    const value = formData[key];

    if (
      value === "0" ||
      value === "" ||
      (Array.isArray(value) && value.length === 0) // Check if array is empty
    ) {
      return false;
    }
  }
  return true;
};
