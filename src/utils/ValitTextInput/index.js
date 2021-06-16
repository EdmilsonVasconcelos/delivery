const isValidText = (min, max, text) => {
  if (!text || text.length < min || text.length > max) return false;

  return true;
};

export { isValidText };
