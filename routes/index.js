var express = require("express");
var router = express.Router();
//declare axios in a varibale
const axios = require("axios");
//declare dotenv to config
require("dotenv").config();
//store env file var in const
const EDAMAM_APP_ID = process.env.EDAMAM_APP_ID;
const EDAMAM_APP_KEY = process.env.EDAMAM_APP_KEY;
const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

// create a route to render homepage
router.get("/", function (req, res, next) {
  res.render("index", { title: "Home" });
});
/*
  Route to fetch recipes based on the recipe name provided in the request body.
  Uses the EDAMAM API to search for recipes.
 */
router.post("/recipe", async (req, res) => {
  //fetch passed data from the form with the post method in recipeName
  const recipeName = req.body.recipeName;
  try {
    // fetch all possible result from the search query with use of axios
    const response = await axios.get(
      `https://api.edamam.com/search?q=${recipeName}&app_id=${EDAMAM_APP_ID}&app_key=${EDAMAM_APP_KEY}`
    );
    // convert response into json format in a variable
    const recipeData = response.data;
    // if response is OK then render to recipe page with response data
    res.render("recipe", { recipeData }); // Render the recipe.ejs file and pass recipeData as a variable
  } catch (error) {
    // if error encountered
    res.status(500).send("Error fetching data from EDAMAM API");
  }
});
/*
  Route to fetch recipes based on the recipe name, "from", and "to" parameters provided in the URL.
 */
router.get("/recipe/:recipeName/:from", async (req, res) => {
  //const to create a query string for api.
  // where recipeName is searched query
  // from is lower limit and to is higherlimit
  const recipeName = req.params.recipeName;

  const from = req.params.from;
  const to = parseInt(from) + 1;

  try {
    //create a response with axios package
    const response = await axios.get(
      `https://api.edamam.com/search?q=${recipeName}&app_id=${EDAMAM_APP_ID}&app_key=${EDAMAM_APP_KEY}&from=${from}&to=${to}`
    );
    //convert response in a data format
    const recipeData = response.data;

    // if response is OK then render to recipe-details page with response data
    res.render("recipe-details", { recipeData });
  } catch (error) {
    //if error encountered
    res.status(500).send("Error fetching recipe details from EDAMAM API");
  }
});

/*
  Route to find grocery stores selling a particular ingredient.
  Uses the Google Maps Places API to search for nearby grocery stores for that ingredient.
 */
router.get("/findingredient/:ingredient", async (req, res) => {
  //fetch name of ingredient in a var
  const ingredient = req.params.ingredient;
  console.log(ingredient);
  try {
    //call google map place api to find nearby grocery stores for that ingredient.
    const response =
      await axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=show%20${ingredient}%20grocery%20shop%20near%20me&key=${GOOGLE_MAPS_API_KEY}
    `);
    //convert response into json format
    const ingredientData = response.data;
    // if response is OK then render to ingredient-store page with response data of store and name of ingredient
    res.render("ingredient-store", { data: ingredientData, name: ingredient });
  } catch (error) {
    //if error encountered
    res.status(500).send("Error fetching recipe details from Maps API");
  }
});
module.exports = router;
