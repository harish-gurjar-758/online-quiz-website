import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import logo from '../Assets/logo.png';
import candidentDefoultPhoto from '../Assets/candidate-defoult-pic.jpeg'; // Default image if none uploaded
import mdSignature from '../Assets/md-signature.png';

const QutionPage = () => {
  const location = useLocation();
  const { qutions, label } = location.state || { qutions: [], label: 'No Label' };  // Default values if no state is passed

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [candidateName, setCandidateName] = useState('');
  const [candidatePhoto, setCandidatePhoto] = useState('');

  const totalQuestions = qutions.length;

  useEffect(() => {
    // Retrieve candidate details from localStorage
    const storedName = localStorage.getItem('candidateName');
    const storedPhoto = localStorage.getItem('candidatePhoto');
    setCandidateName(storedName || 'Unknown Candidate');
    setCandidatePhoto(storedPhoto || candidentDefoultPhoto);
  }, []);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    if (selectedOption === qutions[currentQuestion].answer) {
      setScore(score + 1);
    }

    setSelectedOption('');

    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowScore(true);
    }
  };

  // Function to download the scorecard as PNG
  const downloadScoreCardAsImage = () => {
    const scoreCard = document.getElementById('score-card');
    html2canvas(scoreCard).then(canvas => {
      const link = document.createElement('a');
      link.download = 'score-card.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  };

  // Function to download the scorecard as PDF
  const downloadScoreCardAsPDF = () => {
    const scoreCard = document.getElementById('score-card');
    html2canvas(scoreCard).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('score-card.pdf');
    });
  };

  return (
    <div className='quiz-page'>
      <div className="quiz-age-controlers">
        <Link to='/' className='btn-link'>
          <div className='back-btn'>
            <IoMdArrowRoundBack /> Back To Home
          </div>
        </Link>
      </div>
      {showScore ? (
        <div className='score-section'>
          <div className='score-card' id="score-card">
            <div className="score-card-hader">
              <h2>Quiz Score Card</h2>
            </div>

            {/* Score Main Box */}
            <div className='score-main-box'>
              {/* Candidate Score Box */}
              <div className="candidate-score-box">
                <table>
                  <tr colSpan={2} style={{ paddingLeft: "5px", height: "55px", fontWeight: "bold" }}>
                    {label} Quiz Test Organized By Quiz App
                  </tr>
                  <tr colSpan={2}>
                    <img src={logo} alt="" width={100} />
                    <div>
                      <h3 className='logo'>Quiz <span>App</span></h3>
                      <p>Test your skills with Quiz App and practice with us.</p>
                    </div>
                  </tr>
                  <tr>
                    <td>Total Attempted Questions</td>
                    <td>{totalQuestions}</td>
                  </tr>
                  <tr>
                    <td>Your Correct Answers</td>
                    <td>{score}</td>
                  </tr>
                  <tr>
                    <td>Incorrect Answers</td>
                    <td>{totalQuestions - score}</td>
                  </tr>
                  <tr>
                    <td>Score in Percentage</td>
                    <td>{((score / totalQuestions) * 100).toFixed(2)}%</td>
                  </tr>
                </table>
              </div>

              {/* Candidate Info Box */}
              <div className="candidate-info-box">
                <div className='candidate-photo'>
                  <img src={candidatePhoto} alt="Candidate" />
                  <p>Candidate Photo</p>
                </div>
                <div className='candidate-info-container'>
                  <div className='info-box'>
                    <h3>Candidate Name</h3> : 
                    <h3>
                      <p>{candidateName}</p>
                      <p>............................</p>
                      </h3>
                  </div>
                  <div className='info-box'>
                    <h3>Quiz Subject</h3> :
                    <h3>
                      <p>MERN</p>
                      <span>............................</span>
                    </h3>
                  </div>
                  <div className='info-box'>
                    <h3>Quiz Type</h3> : 
                    <h3>
                      <p>MC Quiz</p>
                      <p>............................</p>
                      </h3>
                  </div>
                </div>
                <div className='score-signatures'>
                  <div className='signature'>
                    <span>---------------------</span>
                    <p>Signature of Candidate</p>
                  </div>
                  <div className='signature'>
                    <p className="signatur-text">HarishGurjar...</p>
                    <span>---------------------</span>
                    <p>Signature of MD</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='score-card-download-btns-group'>
            <button onClick={downloadScoreCardAsImage}>Download as PNG</button>
            <button onClick={downloadScoreCardAsPDF}>Download as PDF</button>
          </div>
        </div>
      ) : (
        <div className='quiz-container'>
          <div className='quiz-page-header'>
            {label} Question <span>{currentQuestion + 1}</span> / {totalQuestions}
          </div>
          <div className='quiz-question'>
            <div className='quiz-question-inercontainer'>
              <h3>💁 {qutions[currentQuestion]?.question}</h3>
              <div className='quiz-options'>
                {qutions[currentQuestion]?.options.map((option, index) => (
                  <div key={index}>
                    <label>
                      👉 <input
                        type='radio'
                        value={option}
                        checked={selectedOption === option}
                        onChange={() => handleOptionChange(option)}
                      />
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className='quiz-actions'>
            <button className='next-btn' onClick={handleNextQuestion} disabled={!selectedOption}>
              {currentQuestion === totalQuestions - 1 ? 'Finish' : 'Next'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QutionPage;
