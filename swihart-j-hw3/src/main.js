import { MyBookmark } from "./myBookmark.js";
import { Favorite } from "./favorite.js";
import {getFavorites, setFavorites} from "./storage.js";
import {MyHeader} from "./myHeader.js";

//finds relevant elements in the document
const textField = document.querySelector("#favorite-text");
const urlField = document.querySelector("#favorite-url");
const commentsField = document.querySelector("#favorite-comments");
const numFavorites = document.querySelector("#num-favorites");
const bookmarks = document.querySelector("#bookmarks");
//sets up the favorites array
let favorites = [];

//adds a new favorite to the array and a new bookmark element to the page
const submitClicked = (e) =>{
  //console.log("submit clicked");
  if(textField.value.trim() && urlField.value.trim() && commentsField.value.trim()){
    let favorite = new Favorite(textField.value, urlField.value, commentsField.value);
    favorites.push(favorite);
    createBookmarkComponent(favorite.fid, favorite.text, favorite.url, favorite.comments);
    setFavorites(favorites);
    error.innerHTML = "";
    numFavorites.innerHTML = `Number of Favorites: ${favorites.length}`;
    clearFormFields(e);
  }
  //needs all fields to be filled out
  else{
    error.innerHTML = "Missing required fields";
    //console.log("Fill out all required fields!")
  }
  e.preventDefault();
  return false;
}
document.querySelector("#favorite-submit-button").onclick = submitClicked;

//clears the text values of all the input fields
const clearFormFields = (e) =>{
  textField.value = "";
  urlField.value = "";
  commentsField.value = "";
  e.preventDefault();
  return false;
}
document.querySelector("#favorite-cancel-button").onclick = clearFormFields;

//deletes a favorite off of the page, from the array and from local storage
const deleteFavorite = (fid) =>{
  //removes from array
  for(let i = 0; i < favorites.length; i++){
    if(favorites[i].fid == fid){
      favorites.splice(i,1);
    }
  }
  //removes from page
  let favorite = document.querySelector(`[data-fid = "${fid}"]`);
  favorite.parentElement.remove();
  numFavorites.innerHTML = `Number of Favorites: ${favorites.length}`;
  //updates local storage
  setFavorites(favorites);
}

//adds a new bookmark to the page
const createBookmarkComponent = (fid, text, url, comments) =>{
  const el = document.createElement("my-bookmark");
  el.dataset.fid = fid;
  el.dataset.text = text;
  el.dataset.url = url;
  el.dataset.comments = comments;
  el.callback = deleteFavorite;
  const newLI = document.createElement("li");
  newLI.appendChild(el)
  bookmarks.appendChild(newLI);
}

//loads the saved array of favorites from local storage
const loadFavoritesFromStorage = () =>{
  favorites = getFavorites();
  for(let favorite of favorites){
    createBookmarkComponent(favorite.fid, favorite.text, favorite.url, favorite.comments);
  }
  numFavorites.innerHTML = `Number of Favorites: ${favorites.length}`;
}
loadFavoritesFromStorage();