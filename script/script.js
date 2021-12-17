const main = document.getElementById("main"); 
let output="";

let divElem;
var likedList= []
let id; 
let imagPoster; 
let overview;
let voteAverage; 
let releaseDate;
let homePage; 


const images = "https://image.tmdb.org/t/p/w1280"; 
const movieList = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=ef62c27fec2fa10364988fd14233e656&page=1"; 

const search  = "https://api.themoviedb.org/3/search/movie?api_key=ef62c27fec2fa10364988fd14233e656&query="


// lists the popular movies from API 
listMovie(movieList);
function listMovie(url){
  fetchApi(url).then((data)=>{
    let output="";
    data.results.forEach(function(elment){
      output+=`<div class="output">
       <img src= ${images + elment.poster_path} class="img_list"/>
       <h5>${elment.original_title}</h5>
       <a onclick="movieSelected(${elment.id})" class= "abtn" href="#">Movie Details</a>
     </div>`
    
     
   }
   )
   main.innerHTML=output;
  })
.catch((err)=>{
  console.log(err)
})

} 

let form = document.getElementById("form_search"); 
form.addEventListener("submit", getSearch); 
function getSearch(e){
  e.preventDefault();
  main.innerHTML=""; 
  if(divElem!=null){
    divElem.remove();
  }

  let searchText = document.getElementById("input_search").value
  const searchAPI = search+searchText
  console.log(searchAPI)
  listMovie(searchAPI)
}
// get the selected item from the API 
function movieSelected(id){
  console.log("id", id)
  main.innerHTML= ""; 
  const movieData = "https://api.themoviedb.org/3/movie/"+id+"?api_key=ef62c27fec2fa10364988fd14233e656&language=en-US"
  fetchApi(movieData)
  .then((data)=>{
    console.log(data)
    //const imgCopy= images + data.poster_path
    output= creatElment(data)
     divElem = document.createElement("div"); 
    divElem.className="div_title"
    divElem.innerHTML= `
    <h2> ${data.title}</h2>
    `

    main.innerHTML= output
    main.before(divElem)
    
  })
 
}
// function that toggles the heart to add to the localStroage
function heart(){
const divId = document.getElementsByClassName("div_container")[0].id; 
   console.log(id)
  const iHeart = document.getElementById("iHeart")
  console.log("heart", iHeart)
  iHeart.classList.toggle('red')
  console.log(id, divId, "ourid")
  checkLiked(iHeart, divId)
  
    console.log( likedList, "whoo")
  }
 
 


// function that creats the elemnts for the list movie data 
 function creatElment (data){
id= data.id; 
imagPoster= images + data.poster_path;
overview= data.overview; 
voteAverage= data.vote_average;
releaseDate= data.release_date; 
homePage= data.homepage
const elment =`<div class= "div_container"id=${id}>
 <div class= "div_img" >
 <img src= ${images + data.poster_path} class="img_detail"/>
 </div>
 <div class= "div_detail">
 <p class= "overview">Overview:${overview}</p>
 </div>
 <div class= "rating">
 <h4 class = "rating">Rating:${voteAverage}</h3>
 <h4 class = "date_relesed">Release Date:${releaseDate}</h3>
 </div>
 <div id="dv_heart">
 <i class="fa fa-heart" id="iHeart" onclick="heart()"></i>
 </div>
 <div class="home">
 <a href="${homePage}" target="_blank">HomePage</a>
 </div>
 </div>`
 
 
divElem = document.createElement("div"); 
divElem.className="div_title"
 divElem.innerHTML= `
 <h2> ${data.title}</h2>
 `
return elment
 }


  // function to get the api  
  async function fetchApi(url){
    const apiUrl= await fetch(url); 
    const jsonData = await apiUrl.json(); 
    return jsonData; 
  }
  
  function hasID (array, id){
    for (let i = 0; i < array.length; i++) {
     if(array[i].id==id){
       console.log("matchFound")
       return true; 
     }
      return false
      
    }
  }
  function creatArra(array){
     array.push({
      id:id,  
     imagPoster:imagPoster, 
     overview:overview, 
     voteAverage:voteAverage, 
     releaseDate:releaseDate, 
     homePage:homePage
      
     
         })
         return array;

  }
  
function checkLiked (elemnt,divId ){
  if(elemnt.classList.contains('red'))
  console.log(id, divId, "ourid")

  console.log("yahoo")
  {
    if(likedList.length>0){
      console.log(id, divId, "ourid")
      const result = likedList.every(e=>e.id==divId)
      console.log(id, divId, "ourid")
      //hasID(likedList,divId )
      console.log(result, "this"); 
        if(result !=true){
          likedList = creatArra(likedList)
              console.log( likedList, "pppp")
               window.localStorage.setItem("arryList", JSON.stringify(likedList))

         }
        
      }
      else{
        likedList = creatArra(likedList)
             console.log(likedList, "pushed2")
             window.localStorage.setItem("arryList", JSON.stringify(likedList))
      }

    }
}

function likedItmes(){
  main.innerHTML="";
           const likelemnt = document.getElementById("alike"); 
           likelemnt.addEventListener("click",displayData)
           
  
}
function displayData(){
  console.log("Hello")
  
  var retriveData = localStorage.getItem("arryList");
  var movies = JSON.parse(retriveData); 
  console.log(retriveData)
  let elment=""
  console.log(movies);
  if(movies.length>0){
  for (let i = 0; i < movies.length; i++) {
    
  elment +=`<div class= "div_container"id=${id}>
 <div class= "div_img" >
 <img src= ${images + movies[i].imagPoster} class="img_detail"/>
 </div>
 <div class= "div_detail">
 <p class= "overview">Overview:${movies[i].overview}</p>
 </div>
 <div class= "rating">
 <h4 class = "rating">Rating:${movies[i].voteAverage}</h3>
 <h4 class = "date_relesed">Release Date:${movies[i].releaseDate}</h3>
 </div>
 <div id="dv_heart">
 <i class="fa fa-heart" id="iHeart" onclick="heart()"></i>
 </div>
 <div class="home">
 <a href="${movies[i].homePage}" target="_blank">HomePage</a>
 </div>
 </div>`
    
  }
 
  main.innerHTML= elment
  
  }
  else{
    main.innerHTML= `<div><h1>
    NO ITEM TO DISPLAY</h1>
    </div>`

  }
}
  
  
  

likedItmes()







