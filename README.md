# DishDiscover Project

This project is a web application developed using Node.js, Express.js, and EJS engine. Its purpose is to allow users to search for recipes based on their name, retrieve details about the selected recipe including cautions, health labels, and diet labels, and provide information about the ingredients required for the recipe. Additionally, users can find nearby stores selling the ingredients using the Google Places API and view the exact location of those stores on a map using the Google Maps API.

## Features

- **Recipe Search**: Users can enter the name of a recipe to search for and retrieve a list of matching recipes using the Edamam API.

- **Recipe Details**: Upon selecting a specific recipe, users can view details such as cautions, health labels, and diet labels associated with that recipe.

- **Ingredient Details**: The application provides information about the ingredients required for the selected recipe, including the name and quantity of each ingredient, fetched from the Edamam API.

- **Find Nearby Stores**: Users can find nearby stores selling the ingredients needed for the recipe using the Google Places API.

- **View Store Locations**: The application displays the exact locations of the nearby stores on a map using the Google Maps API.

## Prerequisites

Before running the application, ensure you have the following:

- Node.js installed on your machine.
- Edamam API key for recipe data retrieval.
- Google Places API key for finding nearby stores.
- Google Maps API key for displaying store locations on a map.

## Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/yashmodi9998/DishDiscover.git
2. Navigate to the Project Directory

Navigate to the project directory using the command line or terminal:

```bash
cd DishDiscover
```
3. Create .env

```bash

EDAMAM_APP_ID = your-edamam-api-id
EDAMAM_APP_KEY = your-edamam-api-key
GOOGLE_MAPS_API_KEY = your-google-places-api-key
```

4. Install Dependencies Using npm and start server

Install the required dependencies using npm:

```bash
npm install
npm run dev
```
4. Open the browser

Open your web browser and navigate to http://localhost:8888 to access the application.

## Usage
- 1.Enter the name of the recipe you want to search for in the provided input field.
- 2.Click on the search button to retrieve a list of matching recipes.
- 3.Select a recipe from the list to view its details, including cautions, health labels, and diet labels.
- 4.View the ingredients required for the selected recipe.
- 5.Click on the "View Stores" button to find stores selling the ingredients.
- 6.View the locations of nearby stores by clicking Find Stores.
