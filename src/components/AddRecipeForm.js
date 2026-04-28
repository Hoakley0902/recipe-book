import { useState } from 'react';
import '../styles/AddRecipeForm.css';

function AddRecipeForm({ onClose, onSave }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('pasta');
  const [ingredients, setIngredients] = useState('');
  const [notes, setNotes] = useState('');

  function handleSave() {
    onSave({
      title: title,
      category: category,
      ingredients: ingredients.split('\n'),
      notes: notes,
    });
  }

  return (
    <div className="form-overlay">
      <div className="form-container">
        <h2>Add a New Recipe</h2>

        {/* Recipe Title */}
        <div className="form-group">
          <label>Recipe Title</label>
          <input
            type="text"
            placeholder="e.g. Grandma's Bolognese"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>

        {/* Category */}
        <div className="form-group">
          <label>Category</label>
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <option value="pasta">🍝 Pasta / Italian</option>
            <option value="baked">🍪 Baked Goods</option>
            <option value="chinese">🥡 Chinese</option>
            <option value="mexican">🌮 Mexican</option>
            <option value="soups">🍲 Soups & Stews</option>
            <option value="breakfast">🍳 Breakfast</option>
            <option value="drinks">🥤 Drinks</option>
            <option value="grilling">🔥 Grilling</option>
            <option value="snacks">🍿 Snacks</option>
          </select>
        </div>

        {/* Ingredients */}
        <div className="form-group">
          <label>Ingredients</label>
          <textarea
            placeholder="One ingredient per line..."
            rows="5"
            value={ingredients}
            onChange={(event) => setIngredients(event.target.value)}
          />
        </div>

        {/* Notes */}
        <div className="form-group">
          <label>Notes</label>
          <textarea
            placeholder="Any cooking tips or notes..."
            rows="3"
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
          />
        </div>

        {/* Buttons */}
        <div className="form-buttons">
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
          <button className="save-btn" onClick={handleSave}>Save Recipe</button>
        </div>

      </div>
    </div>
  );
}

export default AddRecipeForm;