'use client'

import React, { ReactNode, useEffect, useState } from 'react';

export function TimeGet() {
    const [currentTime, setCurrentTime] = useState<React.ReactNode[]>(['00', ':', '00', ':', '00']);
    const [prevTime, setPrevTime] = useState<string>('');

    useEffect(() => {
        const interval = setInterval(() => {
            const date = new Date();
            const newTime = date.toLocaleTimeString();
            
            if (newTime !== prevTime) {
                updateWithAnimation(newTime, prevTime);
                setPrevTime(newTime);
            }
        }, 1000);
    
        // Cleanup
        return () => clearInterval(interval);
    }, [prevTime]);

    const updateWithAnimation = (newTime: string, prevTime: string) => {
        const newTimeArr = newTime.split(':').map(part => part.padStart(2, '0'));
        const prevTimeArr = prevTime.split(':').map(part => part.padStart(2, '0'));
        
        const animatedParts = newTimeArr.flatMap((part, index) => {
            if (part !== prevTimeArr[index]) {
                return part.split('').map((char, idx) => (
                    <span key={`${index}${idx}`} className="number">{char}</span>
                ));
            }
            return part.split('').map((char, idx) => <span key={`${index}${idx}`}>{char}</span>);
        });
    
        const separatedParts: React.ReactNode[] = [];
    
        animatedParts.forEach((part, index) => {
            separatedParts.push(part);
            if (index < animatedParts.length - 1 && (index === 1 || index === 3)) {
                separatedParts.push(<span key={`separator-${index}`} className="separator">:</span>);
            }
        });
    
        setCurrentTime(separatedParts);
    };

    return (
        <>
            <div className='font-sans font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl text-white'>
                {currentTime}
            </div>
        </>
    );
}