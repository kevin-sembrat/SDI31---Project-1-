function openExploreWindow() {
      // window.open('explore-artwork.html', '_blank');
      console.log("RUNNING")
      window.location.href = 'explore-artwork.html';
      console.log("REFRESH")


    }

document.addEventListener("DOMContentLoaded", function() {
    // Your function code here
    console.log("The webpage has loaded!");
    getListofArtObjectIds(attributeDict1, 1, "feature-piece-container");
    getListofArtObjectIds(attributeDict1, 12, "lower-portion");
    initializeEventListeners(relatedPhotosArray);
});

// document.addEventListener("click", function() {
//     console.log("new listner")
// });

function openHomeWindow() {
      // window.open('explore-artwork.html', '_blank');
      window.location.href = 'index.html';
    }

var relatedPhotosArray = [];

function refreshExplorePage() {
  // relatedPhotosArray = [];
  getListofArtObjectIds(attributeDict1, 1, "feature-piece-container");
  getListofArtObjectIds(attributeDict1, 10, "lower-portion");


}

function getAllPosts(path, numberOfPieces, updateBlock) {
// Write a function that uses fetch to return a Promise that resolves to the _JavaScript_ array of *all posts*.
  // const response = fetch(path)

  fetch(path)
    .then(responsePromise => responsePromise.json()) //convert sto Json
    .then(jsonResponse => {
      if(numberOfPieces == null){
        updateExplorePage(jsonResponse.objectIDs, updateBlock)
      } else {
        updateExplorePage(Object.entries(jsonResponse.objectIDs).slice(0, numberOfPieces), updateBlock);
      }
      return jsonResponse;
    })
  // return response;
}
//pull an array of art objects from the MET API

                //{metadataDate: YYYY-MM-DD, departmentIds: [1,2,3]}
attributeDict1 = {};
attributeDict2 = {};

//dictofAttributes:   object with values mapped to keys based on what the user wants to recieve back
//numberOfPieces:     intiger value, if null function returns all
async function getListofArtObjectIds(dictOfAttributes, numberOfPieces, updateBlock) {
  //Open-ended request
  let path = 'https://collectionapi.metmuseum.org/public/collection/v1/objects'
  path += '?metadataDate=2018-10-22&departmentIds=3|9|12'

  if(Object.keys(dictOfAttributes).length === 0){
    //NO LIMIT
    if(numberOfPieces == null){

      return getAllPosts(path, null, updateBlock);

    } else {
      //LIMIT REQUESTS
      // console.log("LIMIT RESPONSES")
      return getAllPosts(path, numberOfPieces, updateBlock) //JSON response

      return Object.entries(objOfPieces).slice(0, numberOfPieces);
    }
  //FILTER RESPONSES
  } else {

  }

  // console.log(dictOfAttributes.length)

  //Specoified requests...

}

class Picture {
  constructor(title, primaryImage, objectID, geographyType){
    this.title = title;
    this.primaryImage = primaryImage;
    this.objectID = objectID;
    this.geographyType = geographyType;
  }

}

function updateExplorePage(objIdArray, updateBlock){
  if(updateBlock == "feature-piece-container"){
    const oldElement = document.getElementsByClassName('feature-piece-window')[0];
    oldElement.remove();

    const featurePieceContainer = document.getElementsByClassName(updateBlock)[0];
      fetch('https://collectionapi.metmuseum.org/public/collection/v1/objects/' + objIdArray[0][1])
        .then((response) => {
          // console.log(response.status)
          // console.log(!response.ok)
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(responseJson => {
          const addPicture = new Picture(responseJson.title, responseJson.primaryImage, responseJson.objectID, responseJson.geographyType)


          const featurePieceWindow = document.createElement('div');
          featurePieceWindow.className = "feature-piece-window";

          var divElementL = document.createElement('div');
          divElementL.className = 'dataplate';
          divElementL.innerHTML = `${addPicture.title}`;
          featurePieceWindow.appendChild(divElementL);

          var imgElement = document.createElement('img');
          imgElement.className = "feature-art-piece";
          imgElement.src =`${addPicture.primaryImage}`;
          imgElement.alt = "Description...";
          imgElement.onclick = "refreshExplorePage()";
          featurePieceWindow.appendChild(imgElement)

          var divElementR = document.createElement('div');
          divElementR.className = 'dataplate';
          divElementR.innerHTML = `${addPicture.geographyType}`;
          featurePieceWindow.appendChild(divElementR);

          featurePieceContainer.appendChild(featurePieceWindow);
        })
        .catch((error) => {
          console.error('Fetch error:', error);
        });

  }else {

    console.log("____________LOWER______________")
    const oldElement = document.getElementsByClassName('related-images-container')[0];
    oldElement.remove();

    const lowerPortion = document.getElementsByClassName(updateBlock)[0];
    lowerPortion.innerHTML = `<section class = "related-images-container"></section>`;
    // populate new values
    for(let item of objIdArray){
      fetch('https://collectionapi.metmuseum.org/public/collection/v1/objects/' + item[1])
        .then((response) => {

          // console.log(!response.ok)
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(responseJson => {
          const addPicture = new Picture(responseJson.title, responseJson.primaryImage, responseJson.objectID, responseJson.geographyType)
          relatedPhotosArray.push(addPicture);


          var divElement = document.createElement('div');
          divElement.className = 'image-box'
          divElement.innerHTML = `<img id=${addPicture.objectID} src=${addPicture.primaryImage} alt="Description..."></img>`
          // divElement.className = "related-image"

          const parent = document.getElementsByClassName('related-images-container')[0];
          parent.appendChild(divElement);
        })
        .catch((error) => {
          console.error('Fetch error:', error);
        });
      }
    }
}




//event listener for all picture images
function initializeEventListeners(array){
  console.log("Initializing Event listneres with ", array)
  for(var i = 0; i < array.length; i++){
    console.log("asdf")
    let pictureId = array[i].objectID;
    document.addEventListener("click", ()=>{
      alert("Related Image Clicked");
    })

  }
}




