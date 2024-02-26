const defaultData = {
  "version": .01, 
  "favorites": [{
    fid: "1234",
    text: "CIA", 
    url: "https://cia.gov", 
    comments: "The Agency."
  }]
},
storeName = "jcs6016-list-data";

//reads values from local storage 
const readLocalStorage = () => {
  let allValues = null;
  try{
    allValues = JSON.parse(localStorage.getItem(storeName)) || defaultData;
  }catch(err){
    console.log(`Problem with JSON.parse() and ${storeName} !`);
    throw err;
  }
  return allValues;
};

//writes values to local storage
const writeLocalStorage = (allValues) => {
  localStorage.setItem(storeName, JSON.stringify(allValues));
};

//  Public Methods

export const getFavorites = () => readLocalStorage().favorites;

export const setFavorites = (favoritesArray) => {
  const allValues = readLocalStorage();
  allValues.favorites = favoritesArray;
  writeLocalStorage(allValues);
};

