'use client'

import React, { ReactNode, useEffect, useState } from 'react';
import { useSettings } from './customize';

export function TimeGet() {
    const { SettingGET } = useSettings(); // useSettings フックから SettingGET 関数を取得

    const [currentTime, setCurrentTime] = useState<React.ReactNode[]>(['00', ':', '00', ':', '00']);
    const [prevTime, setPrevTime] = useState<string>('');

    useEffect(() => {
        const interval = setInterval(() => {
            const date = new Date();
            const newTime = date.toLocaleTimeString();
            
            if (newTime !== prevTime) {
            }
            updateWithAnimation(newTime, prevTime);
            setPrevTime(newTime);
        }, 600);
    
        return () => clearInterval(interval);
    }, [prevTime, currentTime]);  // currentTimeを依存配列に追加

    const updateWithAnimation = (newTime: string, prevTime: string) => {
        const newTimeArr = newTime.split(':').map(part => part.padStart(2, '0'));
        const prevTimeArr = prevTime.split(':').map(part => part.padStart(2, '0'));
    
        const animatedParts: React.ReactNode[] = [];
    
        newTimeArr.forEach((part, index) => {
            const partChars = part.split('');
            const prevPartChars = prevTimeArr[index]?.split('') || [];
    
            partChars.forEach((char, charIndex) => {
                const prevChar = prevPartChars[charIndex];
                const hasChanged = char !== prevChar;
    
                const charElement = (
                    <span 
                        key={`${index}${charIndex}`} 
                        onAnimationEnd={() => {
                            // フィードインのアニメーション開始
                            setTimeout(() => {
                                setCharOpacity(index, charIndex, 1);
                            }, 100); // 100ミリ秒の遅延を追加
                        }}
                        className={`number ${hasChanged && ``}`}
                    >
                        {char}
                    </span>
                );
    
                animatedParts.push(charElement);
            });
    
            if (index < newTimeArr.length - 1) {
                animatedParts.push(<span key={`separator-${index}`} className="separator">:</span>);
            }
        });
    
        setCurrentTime(animatedParts);
    };
    
    const setCharOpacity = (index: number, charIndex: number, opacity: number) => {
        const updatedParts = [...currentTime];
    
        if (updatedParts[index]) {
            const updatedCharElement = React.cloneElement(updatedParts[index] as React.ReactElement, {
                className: `number opacity-${opacity} transition-opacity duration-500 ease-in-out`
            });
    
            updatedParts[index] = updatedCharElement;
            setCurrentTime(updatedParts);
        }
    };

    return (
        <>
            <p className='animate-spin'></p>
            <p className='animate-bounce'></p>
            <p className='animate-rotate-x'></p>
            <div className={`font-${SettingGET(`font`)} font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl text-white animate-${SettingGET(`animation`)} animate-infinite animate-duration-1000 animate-delay-0 animate-ease-in-out animate-normal animate-fill-forwards`}>
                {currentTime}
            </div>
        </>
    );
}