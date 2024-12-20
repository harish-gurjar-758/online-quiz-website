// const carouselData = [
//   {
//     image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8HQe4g3UuXE5lo-5xzHlUgYePdcJJiLINPMKSzDGbWyCC8nTMVckqelUbAVWTiovwmZg&usqp=CAU',
//     legend: 'Game Development Qutions'
//   },
//   {
//     image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJIuo6WUnwyeLySW3tyZSMjZD90-p5C81glIOANhoRyqWBIKG-ovttJrgzd7Bus6FY0q0&usqp=CAU',
//     legend: 'Android Development Qutions'
//   },
//   {
//     image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1MORHXzlEVPxXBlb_cUkK385xgZOGWZ49YQ&s',
//     legend: 'Software Developent'
//   },
//   {
//     image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZmyT75JjktJsNQ_WvEmFKpcuei5WhSb47ur6XbtEssW-a0lPG78I_EAXWZFg44yU0wQU&usqp=CAU',
//     legend: 'Java Developement'
//   }
// ]

import React, { useState, useEffect } from 'react';
import './HomeCarousel.css'; // Ensure to add your CSS styles accordingly

const HomeCarousel = () => {
  const [postIndex, setPostIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const posts = [
    {
      title: "Game Development Qutions",
      tag: 'News',
      date: '16 August 2019',
      img: 'https://img.freepik.com/free-vector/game-night-facebook-cover-template_23-2151050091.jpg?w=1060&t=st=1727193637~exp=1727194237~hmac=bd093fc929e27e5073bdbb02aa4a8652db40143c2584cc7ac9dee0e0618e9df7',
      link: '#',
    },
    {
      title: 'Android Development Qutions',
      tag: 'Video',
      date: '12 August 2019',
      img: 'https://img.freepik.com/free-vector/neon-landing-page-with-smartphone_23-2148337746.jpg?t=st=1727193792~exp=1727197392~hmac=b645a24295be9e4d82305ee46c525f5a453b6ba78016e7567c83bd2d24f69832&w=1060',
      link: '#',
    },
    {
      title: 'Java Developement',
      tag: 'News',
      date: '08 August 2019',
      img: 'https://img.freepik.com/free-photo/programming-background-collage_23-2149901779.jpg?t=st=1727193883~exp=1727197483~hmac=afd392a8b6f06960279026299474edf1e50c7f7e8555be7defc1ef5c803a871c&w=1060',
      link: '#',
    },
  ];

  // Handles the automatic progress bar and post switching
  useEffect(() => {
    const interval = setInterval(() => {
      if (progress === 100) {
        setProgress(0);
        setPostIndex((prevIndex) => (prevIndex + 1) % posts.length); // Cycle through the posts
      } else {
        setProgress(progress + 1);
      }
    }, 100); // Update every 100ms

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [progress, posts.length]);

  const handlePostClick = (index) => {
    setProgress(0);
    setPostIndex(index);
  };

  return (
    <div className="carousel">
      {/* Progress bar for mobile */}
      <div className="progress-bar progress-bar--primary hide-on-desktop">
        <div className="progress-bar__fill" style={{ width: `${progress}%` }}></div>
      </div>

      {/* Main Post Wrapper */}
      <header className="main-post-wrapper">
        <div className="slides">
          {posts.map((post, index) => (
            <article key={index} className={`main-post ${index === postIndex ? 'main-post--active' : 'main-post--not-active'}`}>
              <div className="main-post__image">
                <img src={post.img} alt={post.title} loading="lazy" />
              </div>
              <div className="main-post__content">
                <div className="main-post__tag-wrapper">
                  <span className="main-post__tag">{post.tag}</span>
                </div>
                <h1 className="main-post__title">{post.title}</h1>
                <a className="main-post__link" href={post.link}>
                  <span className="main-post__link-text">find out more</span>
                  <svg className="main-post__link-icon main-post__link-icon--arrow" width="37" height="12" viewBox="0 0 37 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 6H36.0001M36.0001 6L31.0001 1M36.0001 6L31.0001 11" stroke="white" />
                  </svg>
                </a>
              </div>
            </article>
          ))}
        </div>
      </header>

      {/* Post Wrapper for Desktop */}
      <div className="posts-wrapper hide-on-mobile">
        {posts.map((post, index) => (
          <article key={index} className={`post ${index === postIndex ? 'post--active' : ''}`} onClick={() => handlePostClick(index)}>
            <div className="progress-bar">
              <div className="progress-bar__fill" style={{ width: index === postIndex ? `${progress}%` : '0' }}></div>
            </div>
            <header className="post__header">
              <span className="post__tag">{post.tag}</span>
              <p className="post__published">{post.date}</p>
            </header>
            <h2 className="post__title">{post.title}</h2>
          </article>
        ))}
      </div>
    </div>
  );
};

export default HomeCarousel;
