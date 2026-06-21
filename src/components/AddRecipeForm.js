import { useState } from 'react';
import '../styles/AddRecipeForm.css';

// This component handles both ADDING a new recipe and EDITING an existing one
// existingRecipe is passed in when editing — it's null when adding a new recipe
function AddRecipeForm({ onClose, onSave, existingRecipe }) {

  // If we're editing, pre-fill each field with the existing recipe data
  // If we're adding new, start with empty fields
  const [title, setTitle] = useState(existingRecipe ? existingRecipe.title : '');
  const [category, setCategory] = useState(existingRecipe ? existingRecipe.category : 'pasta');
  
  // ingredients is an array in the recipe, but a textarea needs a string
  // .join('\n') converts ['tomato', 'garlic'] into "tomato\ngarlic" so each ingredient is on its own line
  const [ingredients, setIngredients] = useState(existingRecipe ? existingRecipe.ingredients.join('\n') : '');
  const [notes, setNotes] = useState(existingRecipe ? existingRecipe.notes : '');

  function handleSave() {
    // bundle up all the form fields into one object and pass it up to App.js
    // ingredients.split('\n') converts the textarea text back into an array
    // so "tomato\ngarlic" becomes ['tomato', 'garlic']
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

        {/* If editing show "Edit Recipe", if adding show "Add a New Recipe" 
            This is a ternary — the ? means "if true" and : means "otherwise" */}
        <h2>{existingRecipe ? 'Edit Recipe' : 'Add a New Recipe'}</h2>

        {/* Each form-group has a label and an input field */}
        {/* value= ties the input to the state variable */}
        {/* onChange= updates the state every time the user types */}
        <div className="form-group">
          <label>Recipe Title</label>
          <input
            type="text"
            placeholder="e.g. Grandma's Bolognese"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>

        {/* select is a dropdown — each option has a value that gets saved */}
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

        {/* textarea is a multi-line input — rows sets how tall it is */}
        <div className="form-group">
          <label>Ingredients</label>
          <textarea
            placeholder="One ingredient per line..."
            rows="5"
            value={ingredients}
            onChange={(event) => setIngredients(event.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Notes</label>
          <textarea
            placeholder="Any cooking tips or notes..."
            rows="3"
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
          />
        </div>

        {/* Cancel closes the form without saving */}
        {/* Save calls handleSave which bundles and sends the data up to App.js */}
        <div className="form-buttons">
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
          <button className="save-btn" onClick={handleSave}>Save Recipe</button>
        </div>

      </div>
    </div>
  );
}

export default AddRecipeForm;