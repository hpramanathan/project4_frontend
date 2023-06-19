import './Footer.css'
import { useRef } from'react'
import React from 'react'

export default function Footer() {

    // This is the reference to the audio
    const audioRef = useRef(null);

    const playAudio = () => {
        if (audioRef.current) {
        audioRef.current.play();
        }
    };

    const stopAudio = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    };

return (
    <div className='sound-effect'>
        <audio ref={audioRef}>
            <source src='/MastermindThemeTune.mp3' />
        </audio>
        <div className="button-container">
            <button className='button' onClick={playAudio}>▶</button>
            <button className='button' onClick={stopAudio}>◼</button>
        </div>
    </div>
)
}