export const sanitize = (str: string) => {
  return str.replace(/[^a-z0-9]/gi, "_").toLowerCase();
};
