import './App.css';
import RecipeCard from './components/RecipeCard';
import SearchBar from './components/SearchBar';

function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <h1 className="logo">My Recipe Book</h1>
        <button className="add-btn">+ Add Recipe</button>
      </nav>

      <main className="main-content">
        <h2 className="section-title">My Recipes</h2>
        <SearchBar />
        <div className="recipe-grid">
          <RecipeCard category="pasta" />
          <RecipeCard category="baked" />
          q<RecipeCard category="grilling" />
        </div>
      </main>

    </div>
  );
}

export default App; 