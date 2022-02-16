//initialize and define all variables 
var course = "";
var RECIPE_ITEM = ""; //used to add an image of the recipe item.

var RECIPE_1 = ""; 
var RECIPE_2 = "";
var RECIPE_3 = "";
var COOK_TIME_1 = "";
var COOK_TIME_2 = "";
var COOK_TIME_3 = "";
var INGREDIENT_1 = "";
var INGREDIENT_2 = "";
var INGREDIENT_3 = "";
var CHEF_1 = "";
var CHEF_2 = "";
var CHEF_3 = "";


var FILTER_1 = "";//use these to filter the database.
var FILTER_2 = "";
var FILTER_3 = "";
var FILTER_4 = "";
var FILTER = "";

var TOTAL_FILTERS = 1; //used to determine how many different filters we are using at the time.


//create variables for the elements in the html that we will be changing often. 
var recipe_1  = document.getElementById("recipe1");
var recipe_2  = document.getElementById("recipe2");
var recipe_3  = document.getElementById("recipe3");
var cook_time_1  = document.getElementById("cookTime1");
var cook_time_2  = document.getElementById("cookTime2");
var cook_time_3  = document.getElementById("cookTime3");
var ingredient_1  = document.getElementById("ingredient1");
var ingredient_2  = document.getElementById("ingredient2");
var ingredient_3  = document.getElementById("ingredient3");
var chef_1  = document.getElementById("chef1");
var chef_2  = document.getElementById("chef2");
var chef_3  = document.getElementById("chef3");


 

//The following section of code is used to add an event listener to the submit buttons.
//if the submit button is clicked then we prevent default and retrieve the inputs provided by the user. 


//right now I am hardcoding each of the search options to its own filter button. in the future I would like this to be able to add any number of filter buttons
document.querySelector("#search1").addEventListener("click", function(event){
  event.preventDefault();
  FILTER_1 = document.getElementById("ingredient_search").value;
  document.getElementById("filter"+TOTAL_FILTERS).value =  document.getElementById("ingredient_search").value;
  document.getElementById("filter1").style.display = "inline";
  TOTAL_FILTERS += 1;     
});

document.querySelector("#search2").addEventListener("click", function(event){
  event.preventDefault();
  FILTER_2 = document.getElementById("recipe_search").value;
  document.getElementById("filter"+TOTAL_FILTERS).value =  document.getElementById("recipe_search").value;
  document.getElementById("filter2").style.display = "inline";
  TOTAL_FILTERS += 1;     
});

document.querySelector("#search3").addEventListener("click", function(event){
  event.preventDefault();
  FILTER_3 = document.getElementById("author_search").value;
  document.getElementById("filter"+TOTAL_FILTERS).value =  document.getElementById("author_search").value;
  document.getElementById("filter3").style.display = "inline";
  TOTAL_FILTERS += 1;     
});


document.querySelector("#filter1").addEventListener("click", function(event){
  event.preventDefault();
  FILTER_1 = "";
  document.getElementById("filter1").style.display = "none";
  document.getElementById("filter1").value = "";
  TOTAL_FILTERS -= 1;
})








//on page load call this function and populate the recipe card image.
function recipe_image(img){
  //the folowing block of code is used to retrieve an image
  $.ajax({
    url:"https://salty-mountain-68764.herokuapp.com/https://imsea.herokuapp.com/api/1?q="+ img,
    type: "GET",
    dataType: "JSON",
    success: function(result)
      {
      //set the url for the image as the image in the box.
      document.getElementById("").src = result.results[1]; //get the element id for the recipe box.
      },
    error: function(xhr, ajaxOptions, thrownError){ 
      console.log(xhr.status); 
      console.log(thrownError);}
  });
}

