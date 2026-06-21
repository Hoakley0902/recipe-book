// ============================================
// IMPORTS — bring in everything the app needs
// ============================================
// IMPORT the main stylesheet for the app
import './App.css';
// IMPORT the RecipeCard component (each individual recipe card)
import RecipeCard from './components/RecipeCard';
// IMPORT the SearchBar component (the search input)
import SearchBar from './components/SearchBar';
// IMPORT the form for adding/editing recipes
import AddRecipeForm from './components/AddRecipeForm';
// IMPORT the form for adding notes to a recipe
import AddNotesForm from './components/AddNotesForm';
// IMPORT the form for adding an image to a recipe
import AddImageForm from './components/AddImageForm';
// IMPORT useState from React — this lets us store and update data
import { useState } from 'react';
// IMPORT the cover/splash page component
import CoverPage from './components/CoverPage';
// IMPORT background images
import vintageBackground from './VintageBackground.jpg';
import navbarBackground from './RecipeBookTopBar.png';

// ============================================
// THE APP FUNCTION — this IS the whole app
// ============================================
function App() {

  // ============================================
  // STATE — these are variables that React watches
  // When state changes, the page automatically re-renders
  // Think of state like the app's memory
  // ============================================

  // TRACK whether the Add Recipe form is visible or hidden
  // starts as false (hidden)
  const [showForm, setShowForm] = useState(false);

  // TRACK whether to show the cover page
  // checks localStorage first — if user visited before, skip the cover
  const [showCover, setShowCover] = useState(() => {
    return localStorage.getItem('hasVisited') ? false : true;
    // IF 'hasVisited' exists in browser storage → show = false (skip cover)
    // IF not found → show = true (show cover page)
  });

  // TRACK what the user is typing in the search bar
  // starts as empty string
  const [searchTerm, setSearchTerm] = useState('');

  // TRACK the list of all recipes
  // checks localStorage first — loads saved recipes or starts with empty array
  const [recipes, setRecipes] = useState(() => {
    const saved = localStorage.getItem('recipes');
    return saved ? JSON.parse(saved) : [];
    // IF recipes exist in browser storage → load and parse them
    // IF nothing saved → start with empty array []
  });

  // TRACK which recipe is being edited (null means nothing being edited)
  const [editingRecipe, setEditingRecipe] = useState(null);

  // TRACK which recipe is having notes added (null means no notes form open)
  const [addingNotesRecipe, setAddingNotesRecipe] = useState(null);

  // TRACK which recipe is having an image added (null means no image form open)
  const [addingImageRecipe, setAddingImageRecipe] = useState(null);


  // ============================================
  // FUNCTIONS — these run when the user does something
  // ============================================

  // CALLED WHEN: user fills out the Add Recipe form and clicks Save
  function handleSaveRecipe(newRecipe) {
    // CREATE a new array with all old recipes PLUS the new one
    // Date.now() gives a unique ID using the current timestamp
    const updatedRecipes = [...recipes, { id: Date.now(), ...newRecipe }];
    // UPDATE state so the page re-renders with the new recipe
    setRecipes(updatedRecipes);
    // SAVE the updated list to browser storage so it persists after refresh
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
    // CLOSE the form
    setShowForm(false);
  }

  // CALLED WHEN: user edits an existing recipe and clicks Save
  function handleEditRecipe(newRecipe) {
    // LOOP through all recipes
    // IF the recipe ID matches the one being edited → replace it with updated version
    // IF it doesn't match → keep it unchanged
    const updatedRecipes = recipes.map((recipe) =>
      recipe.id === editingRecipe.id ? { ...recipe, ...newRecipe } : recipe
    );
    // UPDATE state and save to browser storage
    setRecipes(updatedRecipes);
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
    // CLOSE the form and clear the editing state
    setShowForm(false);
    setEditingRecipe(null);
  }

  // CALLED WHEN: user clicks the delete (trash) button on a card
  function handleDeleteRecipe(id) {
    // CREATE a new array with every recipe EXCEPT the deleted one
    // filter() keeps everything where the condition is true
    const updatedRecipes = recipes.filter((recipe) => recipe.id !== id);
    // UPDATE state and save to browser storage
    setRecipes(updatedRecipes);
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
  }

  // CALLED WHEN: user adds or updates notes on a recipe
  function handleSaveNotes(newNotes) {
    // LOOP through all recipes
    // IF the recipe ID matches → update just the notes field
    // IF it doesn't match → leave that recipe unchanged
    const updatedRecipes = recipes.map((recipe) =>
      recipe.id === addingNotesRecipe.id ? { ...recipe, notes: newNotes } : recipe
    );
    // UPDATE state and save to browser storage
    setRecipes(updatedRecipes);
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
    // CLOSE the notes form
    setAddingNotesRecipe(null);
  }

  // CALLED WHEN: user uploads an image to a recipe
  function handleSaveImage(imageData) {
    // LOOP through all recipes
    // IF the recipe ID matches → update just the image field
    // IF it doesn't match → leave that recipe unchanged
    const updatedRecipes = recipes.map((recipe) =>
      recipe.id === addingImageRecipe.id ? { ...recipe, image: imageData } : recipe
    );
    // UPDATE state and save to browser storage
    setRecipes(updatedRecipes);
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
    // CLOSE the image form
    setAddingImageRecipe(null);
  }


  // ============================================
  // EARLY RETURN — show cover page if needed
  // This runs BEFORE the main return below
  // ============================================

  // IF showCover is true → render the CoverPage instead of the main app
  if (showCover) {
    return <CoverPage onOpen={() => {
      // WHEN user clicks "Open My Book":
      // SAVE that they've visited so cover doesn't show again
      localStorage.setItem('hasVisited', 'true');
      // SET showCover to false → triggers re-render → shows main app
      setShowCover(false);
    }} />;
  }


  // ============================================
  // FILTERING — runs every render to update the recipe list
  // ============================================

  // CREATE a filtered version of recipes based on the search term
  // filter() returns only recipes where the condition is true
  const filteredRecipes = recipes.filter((recipe) =>
    // CHECK if the title contains the search term   OR
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    // CHECK if the category contains the search term   OR
    recipe.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    // CHECK if any ingredient contains the search term
    recipe.ingredients.join(' ').toLowerCase().includes(searchTerm.toLowerCase())
  );


  // ============================================
  // MAIN RETURN — this is the actual HTML/JSX the user sees
  // ============================================
  return (
    // OUTER wrapper div with the vintage background image
    <div className="app" style={{ backgroundImage: `url(${vintageBackground})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh' }}>

      {/* NAVBAR at the top with title and Add Recipe button */}
      <nav className="navbar" style={{ backgroundImage: `url(${navbarBackground})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <h1 className="logo navbar-title">My Recipe Book</h1>
        {/* WHEN clicked → set showForm to true → AddRecipeForm appears */}
        <button className="add-btn" onClick={() => setShowForm(true)}>
          + Add Recipe
        </button>
      </nav>

      <main className="main-content">
        <h2 className="section-title">My Recipes</h2>

        {/* SEARCH BAR — passes searchTerm and setSearchTerm as props */}
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        {/* RECIPE GRID — loops through filtered recipes and renders a card for each */}
        <div className="recipe-grid">
          {filteredRecipes.map((recipe) => (
            // FOR EACH recipe → render a RecipeCard with that recipe's data
            <RecipeCard
              key={recipe.id}           // React needs a unique key for each item in a list
              title={recipe.title}
              category={recipe.category}
              ingredients={recipe.ingredients}
              notes={recipe.notes}
              image={recipe.image}
              // WHEN delete button clicked → call handleDeleteRecipe with this recipe's id
              onDelete={() => handleDeleteRecipe(recipe.id)}
              // WHEN a menu action is clicked → check which action and respond
              onEdit={(action) => {
                // IF "Edit Recipe" clicked → store which recipe and open the form
                if (action === 'edit') {
                  setEditingRecipe(recipe);
                  setShowForm(true);
                }
                // IF "Add Notes" clicked → store which recipe and open notes form
                if (action === 'notes') {
                  setAddingNotesRecipe(recipe);
                }
                // IF "Add Image" clicked → store which recipe and open image form
                if (action === 'image') {
                  setAddingImageRecipe(recipe);
                }
              }}
            />
          ))}
        </div>
      </main>

      {/* CONDITIONALLY render AddRecipeForm — only shows if showForm is true */}
      {/* The && operator means: IF left side is true → render right side */}
      {showForm && (
        <AddRecipeForm
          onClose={() => { setShowForm(false); setEditingRecipe(null); }}
          // IF editingRecipe exists → use edit function, ELSE use save function
          onSave={editingRecipe ? handleEditRecipe : handleSaveRecipe}
          existingRecipe={editingRecipe}
        />
      )}

      {/* CONDITIONALLY render AddNotesForm — only shows if a recipe is selected for notes */}
      {addingNotesRecipe && (
        <AddNotesForm
          onClose={() => setAddingNotesRecipe(null)}
          onSave={handleSaveNotes}
          existingNotes={addingNotesRecipe.notes}
        />
      )}

      {/* CONDITIONALLY render AddImageForm — only shows if a recipe is selected for image */}
      {addingImageRecipe && (
        <AddImageForm
          onClose={() => setAddingImageRecipe(null)}
          onSave={handleSaveImage}
        />
      )}

    </div>
  );
}

export default App;
// EXPORT the App so index.js can import and render it