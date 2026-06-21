import { useState } from 'react';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import '../styles/RecipeCard.css';
import CardBaking from '../CardBaking.png';
import CardSavory from '../CardSavory.png';

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

const bakingCategories = ['baked', 'breakfast'];

function RecipeCard({ title, category, ingredients, notes, image, onDelete, onEdit }) {
  const style = categoryStyles[category] || { color: '#8B5E3C', emoji: '🍽️' };
  const [menuOpen, setMenuOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const cardImage = bakingCategories.includes(category) ? CardBaking : CardSavory;
  const previewIngredients = ingredients.slice(0, 3);
  const hasMore = ingredients.length > 3;

  return (
    <div className="recipe-card" style={{ backgroundImage: `url(${cardImage})` }}>

      {/* Delete confirmation popup */}
      {showDeleteConfirm && (
        <div className="delete-overlay">
          <div className="delete-popup">
            <p>Are you sure you want to delete this recipe?</p>
            <div className="delete-popup-buttons">
              <button className="delete-confirm-btn" onClick={onDelete}>Yes, delete</button>
              <button className="delete-cancel-btn" onClick={() => setShowDeleteConfirm(false)}>No, keep it</button>
            </div>
          </div>
        </div>
      )}

      {/* Title and buttons floating over the card's brown header */}
      <div className="card-header-overlay">
        <span className="card-title">{style.emoji} {title}</span>
        <div className="card-actions">
          <div className="menu-wrapper">
            <button className="card-action-btn" onClick={() => setMenuOpen(!menuOpen)}>
              <FiPlus />
            </button>
            {menuOpen && (
              <div className="action-dropdown">
                <button onClick={() => { onEdit('edit'); setMenuOpen(false); }}>✏️ Edit Recipe</button>
                <button onClick={() => { onEdit('notes'); setMenuOpen(false); }}>📝 Add Notes</button>
                <button onClick={() => { onEdit('image'); setMenuOpen(false); }}>🖼️ Add Image</button>
              </div>
            )}
          </div>
          <button className="card-action-btn" onClick={() => setShowDeleteConfirm(true)}>
            <FiTrash2 />
          </button>
        </div>
      </div>

      {/* Category label */}
      <p className="card-category">{category}</p>

      {/* Ingredient preview */}
      <div className="ingredients-preview">
        <h4>Ingredients</h4>
        <ul>
          {previewIngredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
          {hasMore && <li className="more-indicator">...</li>}
        </ul>
      </div>

    </div>
  );
}

export default RecipeCard;