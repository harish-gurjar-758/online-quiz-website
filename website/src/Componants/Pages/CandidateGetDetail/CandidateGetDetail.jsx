import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CandidateGetDetail = () => {
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState(null);
  const [message, setMessage] = useState(''); // To manage success or failure message
  const [isSuccess, setIsSuccess] = useState(false); // To manage the status of submission
  const [showPopup, setShowPopup] = useState(false); // To toggle popup visibility
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Store the candidate details in localStorage
    localStorage.setItem('candidateName', name);
    if (photo) {
      const reader = new FileReader();
      reader.onloadend = () => {
        localStorage.setItem('candidatePhoto', reader.result); // Store the photo as base64 string
        setMessage('Your submission was successfully submitted ! Welcome to QuizApp and Test Yourself with Us. !! 😊');
        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false);
          navigate('/quiz-app-home'); // Redirect to Home after 3 seconds
        }, 3000); // Hide popup after 3 seconds
      };
      reader.readAsDataURL(photo);
    } else {
      setMessage('!! Your submission failed, please try again.. ! 😞');
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 5000); // Hide popup after 5 seconds
    }
  };

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  return (
    <div className="candidate-detail-form">

      {/* Popup message */}
      {showPopup && (
        <div className={`popup-message ${isSuccess ? 'popup-success' : 'popup-failed'}`}>
          {message}
        </div>
      )}
      <h1>Enter Your Details For Certificate</h1>
      <form className='form' onSubmit={handleSubmit}>
        <div>
          <label>Name : </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Photo : </label>
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
          />
        </div>
        <button type="submit">Submit & Start Quiz</button>
      </form>

    </div>
  );
};

export default CandidateGetDetail;
