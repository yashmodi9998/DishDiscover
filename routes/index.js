var express = require("express");
var router = express.Router();
const axios = require("axios");
require("dotenv").config();
const EDAMAM_APP_ID = process.env.EDAMAM_APP_ID;
const EDAMAM_APP_KEY = process.env.EDAMAM_APP_KEY;
const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
/*
  Route to fetch recipes based on the recipe name provided in the request body.
  Uses the EDAMAM API to search for recipes.
 */
router.post("/recipe", async (req, res) => {
  const recipeName = req.body.recipeName;
  try {
    const response = await axios.get(
      `https://api.edamam.com/search?q=${recipeName}&app_id=${EDAMAM_APP_ID}&app_key=${EDAMAM_APP_KEY}`
    );

    const recipeData = response.data;
    res.render("recipe", { recipeData }); // Render the result.ejs file and pass recipeData as a variable
  } catch (error) {
    res.status(500).send("Error fetching data from EDAMAM API");
  }
});
/*
  Route to fetch recipes based on the recipe name, "from", and "to" parameters provided in the URL.
 */
router.get("/recipe/:recipeName", async (req, res) => {
  const { recipeName } = req.params;
  const from = req.query.from || "0"; // Default value for from
  const to = req.query.to || "1"; // Default value for to

  try {
    const response = await axios.get(
      `https://api.edamam.com/search?q=${recipeName}&app_id=${EDAMAM_APP_ID}&app_key=${EDAMAM_APP_KEY}&from=${from}&to=${to}`
    );
    const recipeData = response.data;
    res.render("recipe-details", { recipeData });
  } catch (error) {
    res.status(500).send("Error fetching recipe details from EDAMAM API");
  }
});

/*
  Route to find grocery stores selling a particular ingredient.
  Uses the Google Maps Places API to search for nearby grocery stores for that ingredient.
 */
router.get("/findingredient/:ingredient", async (req, res) => {
  const ingredient = req.params.ingredient;
  console.log(ingredient);
  try {
    const response =
      await axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=show%20${ingredient}%20grocery%20shop%20near%20me&key=${GOOGLE_MAPS_API_KEY}
    `);
    const ingredientData = response.data;

    res.render("ingredient-store", { data: ingredientData, name: ingredient });
  } catch (error) {
    res.status(500).send("Error fetching recipe details from Maps API");
  }
});
module.exports = router;
