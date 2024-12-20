import React from 'react';
import { useNavigate } from 'react-router-dom';
import HomeCarousel from '../Pages/HomeCarousel/HomeCarousel';
import options from '../../Apis/PrivateServer/QutionsData.json'
const Home = () => {
    const navigate = useNavigate();

    const handleCardClick = (item) => {
        // Navigate to QutionPage and pass the selected option's questions and label as state
        navigate('/questions', { state: { qutions: item.qutions, label: item.optionLable } });
    };

    return (
        <div className='Home'>
            <HomeCarousel />
            <h1 className='home-hading'>Question Options For You!!</h1>
            <div className='home-container'>
                {options.map((item, index) => (
                    <div
                        key={index}
                        className='home-qution-options-card'
                        onClick={() => handleCardClick(item)}
                    >
                        <div className='quiz-card-image'>
                            <img src={item.optionImage} alt={item.optionLable} />
                        </div>
                        <div className='quiz-card-label'>
                            <h2>{item.optionLable}</h2>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
