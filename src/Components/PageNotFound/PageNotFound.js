import './PageNotFound.css'
import React from 'react';

export default function PageNotFound() {
    return (
        <div>
        <h1 className='PageNotFound'>Oopsie daisies! Page Not Found ...</h1>
            <div className='trivia-cartoon'> 
                <img src='/QuizNightCartoon.png' alt="Trivia Cartoon" />
            </div>
        {/* <p id="PageNotFound">Why hello there! It's rather delightful of you to pay this page a visit.
           Hardly anyone ever comes down here. Unfortunately for you, the page you're looking for 
           does not exist. Please check the spelling of your URL or click on any of the links in the 
           navigation bar.</p> */}
        </div>
    )
}