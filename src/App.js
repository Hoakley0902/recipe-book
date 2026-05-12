import './App.css';
import RecipeCard from './components/RecipeCard';
import SearchBar from './components/SearchBar';
import AddRecipeForm from './components/AddRecipeForm';
import { useState } from 'react';
import CoverPage from './components/CoverPage';
import vintageBackground from './VintageBackground.jpg';
import navbarBackground from './RecipeBookTopBar.png';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [showCover, setShowCover] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const [recipes, setRecipes] = useState([
    {
      id: 1,
      title: 'Add Recipe Title',
      category: 'pasta',
      ingredients: ['Add ingredients...'],
      notes: 'Add notes here...',
    },
  ]);

  function handleSaveRecipe(newRecipe) {
    setRecipes([...recipes, { id: Date.now(), ...newRecipe }]);
    setShowForm(false);
  }

  function handleDeleteRecipe(id) {
    setRecipes(recipes.filter((recipe) => recipe.id !== id));
  }

  if (showCover) {
    return <CoverPage onOpen={() => setShowCover(false)} />;
  }

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.ingredients.join(' ').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app" style={{ backgroundImage: `url(${vintageBackground})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh' }}>
      <nav className="navbar" style={{ backgroundImage: `url(${navbarBackground})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <h1 className="logo navbar-title">My Recipe Book</h1>
        <button className="add-btn" onClick={() => setShowForm(true)}>
          + Add Recipe
        </button>
      </nav>

      <main className="main-content">
        <h2 className="section-title">My Recipes</h2>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <div className="recipe-grid">
          {filteredRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              title={recipe.title}
              category={recipe.category}
              ingredients={recipe.ingredients}
              notes={recipe.notes}
              onDelete={() => handleDeleteRecipe(recipe.id)}
            />
          ))}
        </div>
      </main>

      {showForm && (
        <AddRecipeForm
          onClose={() => setShowForm(false)}
          onSave={handleSaveRecipe}
        />
      )}
    </div>
  );
}

export default App;