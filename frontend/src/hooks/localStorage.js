export const getLocalObjects = (nameKey) => {
  const data = localStorage.getItem(nameKey);
  return data ? JSON.parse(data) : [];
};

export const saveLocalObjects = (nameKey, data) => {
  localStorage.setItem(nameKey, JSON.stringify(data));
};

export const removeLastObjectId = (nameKey) => {
  localStorage.removeItem(nameKey);
};
