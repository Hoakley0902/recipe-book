import '../styles/CoverPage.css';
import coverImage from '../HorizontalVintageRecipePage.png';

function CoverPage({ onOpen }) {
  return (
    <div className="cover-page" style={{ backgroundImage: `url(${coverImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="cover-content">
        <h1 className="cover-title">My Recipe Book</h1>
        
        <button className="open-btn" onClick={onOpen}>
          Open My Book
        </button>
      </div>
    </div>
  );
}

export default CoverPage;