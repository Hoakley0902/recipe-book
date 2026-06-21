import React, { useState } from 'react';

function AddImageForm({ onClose, onSave }) {

  // Holds the image data after user picks a file
  const [imagePreview, setImagePreview] = useState(null);

  // Runs when user selects a file
  function handleFileChange(e) {
    const file = e.target.files[0];

    if (file) {
      // FileReader converts the image into a string we can store
      const reader = new FileReader();

      // Runs automatically when FileReader finishes
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };

      reader.readAsDataURL(file);
    }
  }

  function handleSave() {
    if (imagePreview) {
      onSave(imagePreview);
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2 className="modal-title">Add a Photo</h2>

        {/* File picker — only accepts image files */}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />

        {/* Show preview if an image has been selected */}
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            style={{ width: '100%', marginTop: '12px', borderRadius: '8px' }}
          />
        )}

        <div className="modal-buttons">
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
          <button className="save-btn" onClick={handleSave}>Save Photo</button>
        </div>
      </div>
    </div>
  );
}

export default AddImageForm;