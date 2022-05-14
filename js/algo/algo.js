import { recipes } from "../../data/recipes.js";
import { Recipes } from "../utils/recipe.js"
import { ingredienTag } from "../utils/add-newtag.js";
import { ustensilTag } from "../utils/add-newtag.js";
import { applianceTag } from "../utils/add-newtag.js";
import { Filters } from "../template/render-list.js";
// /**
//  * SECOND ALGO
//  */


let newTagTabRecipes = recipes;
let recipeSearch = recipes;
let filter = recipes;

function findTheTitle(recipes, data) {
    return recipes.name.toLowerCase().includes(data);
}

function findTheDesc(recipes, data) {
    return recipes.description.toLowerCase().includes(data)
}

function findTheAppliance(recipes, data) {
    return recipes.appliance.toLowerCase().includes(data)
}

function findTheIng(recipes, data) {
    const ingredient = recipes.ingredients;
    for (const element of ingredient) {
        if (element.ingredient.toLowerCase().includes(data)) {
            return true
        }
    }
}

function findTheUstensil(recipes, data) {
    const ustensil = recipes.ustensils;
    for (const element of ustensil) {
        if (element.toLowerCase().includes(data)) {
            return true
        }
    }
}

function matchTagAlgo(newfilterTag) {
    const filterTag = newfilterTag.getAttribute("data-tag");
    newfilterTag = newfilterTag.innerText.toLowerCase();
    if (filterTag === "ingredients") {
        let result = [];
        for (const recipes of newTagTabRecipes) {
            const match = findTheIng(recipes, newfilterTag);
            if (match === true) {
                result.push(recipes)
            }
        }
        newTagTabRecipes = result;
    }
    else if (filterTag === "ustensil") {
        let result = [];
        for (const recipes of newTagTabRecipes) {
            const match = findTheUstensil(recipes, newfilterTag);
            if (match === true) {
                result.push(recipes)
            }
        }
        newTagTabRecipes = result;
    }
    else if (filterTag === "appliance") {
        let result = [];
        for (const recipes of newTagTabRecipes) {
            const match = findTheAppliance(recipes, newfilterTag);
            if (match === true) {
                result.push(recipes)
            }
        }
        newTagTabRecipes = result;
    }
}

function searchBarMatch(inputSearch, recipes) {
    /**
     * test de toutes mes fonction de recherche findThe... mais ne garder que celle qui gere les titres, la desc, et les ingrédients
     */
    const foundTitle = findTheTitle(recipes, inputSearch);
    const foundDesc = findTheDesc(recipes, inputSearch);
    const foundIng = findTheIng(recipes, inputSearch)
    // const foundAppliance = findTheAppliance(recipes, inputSearch)
    // const foundUstensil = findTheUstensil(recipes, inputSearch)
    if (foundTitle || foundDesc || foundIng == true) {
        return true;
    }
    else {
        return false;
    }
}

export function searchBarAlgo() {
    const searchBarInput = document.querySelector("#search").value.toLowerCase();
    const filtersDatas = Array.from(document.querySelectorAll(".addTag button"));
    const lstIng = document.querySelector(".list-ingredient");
    lstIng.innerHTML = ""
    const lstApli = document.querySelector(".list-appliance");
    lstApli.innerHTML = ""
    const lstUst = document.querySelector(".list-ustensil");
    lstUst.innerHTML = ""
    if (searchBarInput.length > 2) {
        let result = [];
        for (const recipes of filter) {
            const match = searchBarMatch(searchBarInput, recipes);
            if (match == true) {
                result.push(recipes);
            }
        }
        recipeSearch = result;
        if (recipeSearch.length != 0) {
            new Recipes(recipeSearch);
            newFiltersList(recipeSearch);
        }
        else {
            const newResultErrorOfRecipes = document.querySelector(".all-recipes")
            newResultErrorOfRecipes.innerHTML = `<div class="error-recipe">Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc...</div>`;;
        }
        newTagTabRecipes = recipeSearch;
    }
    else if (searchBarInput.length < 3 && filtersDatas.length === 0) {
        newTagTabRecipes = recipes;
        recipeSearch = recipes;
        new Recipes(recipes);
        newFiltersList(recipes);
    }
    else {
        recipeSearch = recipes;
        newTagTabRecipes = recipes;
        tagFilterAlgo();
    }
}

export function tagFilterAlgo() {
    const inputSearch = document.querySelector("#search").value.toLowerCase();
    const allTagsFilters = Array.from(document.querySelectorAll(".addTag button"));
    const lstIng = document.querySelector(".list-ingredient");
    lstIng.innerHTML = ""
    const lstApli = document.querySelector(".list-appliance");
    lstApli.innerHTML = ""
    const lstUst = document.querySelector(".list-ustensil");
    lstUst.innerHTML = ""
    console.log(allTagsFilters)
    if (allTagsFilters.length != 0) {
        for (filter of allTagsFilters) {
            matchTagAlgo(filter);
        }
        new Recipes(newTagTabRecipes);
        newFiltersList(newTagTabRecipes);
        console.log(newTagTabRecipes)
        filter = newTagTabRecipes;
        newTagTabRecipes = recipeSearch;
    }
    else {
        recipeSearch = recipes
        searchBarAlgo();
    }
}

function newFiltersList(recipes) {
    const filtersList = new Filters(recipes);
    const ingredients = filtersList.getIngredients();
    const appliances = filtersList.getAppliances();
    const ustensils = filtersList.getUstensils();
    ingredienTag()
    ustensilTag()
    applianceTag()
}