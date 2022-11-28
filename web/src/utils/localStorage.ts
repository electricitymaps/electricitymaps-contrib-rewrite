const saveKey = (key: string, value: string) => {
  window.localStorage.setItem(key, value);
};

const getKey = (key: string) => {
  return window.localStorage.getItem(key);
};

export { saveKey, getKey };
