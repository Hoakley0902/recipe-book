import { useState } from 'react';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
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

function RecipeCard({ title, category, ingredients, notes, onDelete, onEdit }) {
  const style = categoryStyles[category] || { color: '#8B5E3C', emoji: '🍽️' };
  const [menuOpen, setMenuOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  return (
    <div className="recipe-card">

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

      <div className="card-banner" style={{ backgroundColor: style.color }}>
        <span>{style.emoji} {category}</span>

        <div className="card-actions">
          {/* Plus button */}
          <div className="menu-wrapper">
            <button className="card-action-btn" onClick={() => setMenuOpen(!menuOpen)}><FiPlus /></button>
            {menuOpen && (
              <div className="action-dropdown">
                <button onClick={() => { onEdit('edit'); setMenuOpen(false); }}>✏️ Edit Recipe</button>
                <button onClick={() => { onEdit('notes'); setMenuOpen(false); }}>📝 Add Notes</button>
                <button onClick={() => { onEdit('image'); setMenuOpen(false); }}>🖼️ Add Image</button>
              </div>
            )}
          </div>

          {/* Trash button */}
          <button className="card-action-btn" onClick={() => setShowDeleteConfirm(true)}><FiTrash2 /></button>
        </div>
      </div>

      <h3>{title}</h3>
      <p>{category}</p>

      <div className="ingredients-section">
        <h4>Ingredients</h4>
        <ul>
          {ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>

      <div className="notes-section">
        <h4>Notes</h4>
        <p>{notes}</p>
      </div>
    </div>
  );
}

export default RecipeCard;