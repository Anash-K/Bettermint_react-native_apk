export const formatCase = ({
  str,
  type,
}: {
  str: string;
  type: "lower" | "capitalize";
}): string => {
  if (!str) return "";
  return type === "lower"
    ? str.toLowerCase()
    : str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
