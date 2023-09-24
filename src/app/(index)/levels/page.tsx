"use client";
import React from 'react'
import { useAuth } from '@/contexts/AuthProvider';
import LevelProgressBar from '@/components/Level/LevelProgressBar';


const scores = [
    { name: 'Fleur de lis', emoji: ':fleur_de_lis:', required: 'Score required : +301 points', scoreFirst: 300, },
    { name: 'Rocket', emoji: ':rocket:', required: 'Score required : between 201 and 300 points', scoreFirst: 201 },
    { name: 'Rainbow', emoji: ':rainbow:', required: 'Score required : between 101 and 200 points', scoreFirst: 101 },
    { name: 'Heart', emoji: ':heart:', required: 'Score required : between 51 and 100 points', scoreFirst: 51, },
    { name: 'Unicorn', emoji: ':unicorn:', required: 'Score required : between 41 and 50 points', scoreFirst: 41, },
    { name: 'Muscle', emoji: ':muscle:', required: 'Score required : between 31 and 40 points', scoreFirst: 31, },
    { name: 'Star', emoji: ':star:', required: 'Score required : between 21 and 30 points', scoreFirst: 21, },
    { name: 'Fire', emoji: ':fire:', required: 'Score required : between 11 and 20 points', scoreFirst: 11, },
    { name: 'Rose', emoji: ':rose:', required: 'Score required : between 5 and 10 points', scoreFirst: 5, },
    { name: 'Seedling', emoji: ':seedling:', required: 'Score required : between 0 and 4 points', scoreFirst: 0, }
];

const Levels = () => {
    const { user } = useAuth();

    const userScore = user?.score;

    return (
        <>
            <h1 className="text-4xl text-center font-semibold mb-6 mt-4">Levels</h1>
            {userScore && (
                <p className="text-[#4C9CCD] text-1xl text-center font-semibold mb-6">
                    You currently have {userScore} points
                </p>
            )}
            {scores.map((score, index) => (
                <LevelProgressBar
                    key={index}
                    scoreFirst={score.scoreFirst}
                    name={score.name}
                    emojiName={score.emoji}
                    description={score.required}
                    userScore={userScore}
                />
            ))}
        </>
    );
};

export default Levels;

