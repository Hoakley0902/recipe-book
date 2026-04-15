import '../styles/RecipeCard.css';

const categoryStyles = {
  pasta:     { color: '#8B5E3C', emoji: '🍝' },
  baked:     { color: '#C9973A', emoji: '🍪' },
  chinese:   { color: '#B5472A', emoji: '🥡' },
  mexican:   { color: '#7A8C5E', emoji: '🌮' },
  soups:     { color: '#6B8FA6', emoji: '🍲' },
  breakfast: { color: '#C9973A', emoji: '🍳' },
  drinks:    { color: '#6B8FA6', emoji: '🥤' },
  grilling:  { color: '#B5472A', emoji: '🔥' },
  snacks:    { color: '#7A8C5E', emoji: '🍿' },
};

function RecipeCard({ category }) {
  const style = categoryStyles[category] || { color: '#8B5E3C', emoji: '🍽️' };

  return (
    <div className="recipe-card">
      <div className="card-banner" style={{ backgroundColor: style.color }}>
        {style.emoji} {category}
      </div>

      <h3>Recipe Title</h3>
      <p>Category</p>

      {/* Ingredients */}
      <div className="ingredients-section">
        <h4>Ingredients</h4>
        <ul>
          <li>Ingredient 1</li>
          <li>Ingredient 2</li>
          <li>Ingredient 3</li>
        </ul>
      </div>

      <div className="notes-section">
        <h4>Notes</h4>
        <p>Add notes here...</p>
      </div>

    </div>
  );
}

export default RecipeCard;