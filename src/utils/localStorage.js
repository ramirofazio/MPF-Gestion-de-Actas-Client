export const saveInStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getOfStorage = (key) => {
  if (key?.length) {
    let object = localStorage.getItem(key);
    return object ? JSON.parse(object) : "null";
  }
};

export const deleteOfStorage = (key) => {
  if (key?.length) {
    let object = localStorage.getItem(key);
    if (!object.length) {
      return "no such item in loaclStorage";
    }
    localStorage.removeItem(key);
    return `delete ${key} succesfully`;
  }
};
