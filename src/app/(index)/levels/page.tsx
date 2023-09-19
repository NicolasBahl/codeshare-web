"use client";
import React from 'react'
import * as emoji from "node-emoji";
import apiService from '@/utils/ApiService';
import { useAuth } from '@/contexts/AuthProvider';


const scores = [
    { name: 'Fleur de lis', emoji: ':fleur_de_lis:', required: 'Score required : +301 points', scoreFirst: 300, lastScore: 1000000 },
    { name: 'Rocket', emoji: ':rocket:', required: 'Score required : between 201 and 300 points', scoreFirst: 201, lastScore: 300 },
    { name: 'Rainbow', emoji: ':rainbow:', required: 'Score required : between 101 and 200 points', scoreFirst: 101, lastScore: 200, },
    { name: 'Heart', emoji: ':heart:', required: 'Score required : between 51 and 100 points', scoreFirst: 51, lastScore: 100, },
    { name: 'Unicorn', emoji: ':unicorn:', required: 'Score required : between 41 and 50 points', scoreFirst: 41, lastScore: 50, },
    { name: 'Muscle', emoji: ':muscle:', required: 'Score required : between 31 and 40 points', scoreFirst: 31, lastScore: 40, },
    { name: 'Star', emoji: ':star:', required: 'Score required : between 21 and 30 points', scoreFirst: 21, lastScore: 30, },
    { name: 'Fire', emoji: ':fire:', required: 'Score required : between 11 and 20 points', scoreFirst: 11, lastScore: 20, },
    { name: 'Rose', emoji: ':rose:', required: 'Score required : between 5 and 10 points', scoreFirst: 5, lastScore: 11 },
    { name: 'Seedling', emoji: ':seedling:', required: 'Score required : between 0 and 4 points', scoreFirst: 0, lastScore: 5 }
];


export const Levels = () => {
    const { user } = useAuth();
    const getProgressBar = (first: number, last: number) => {
        if (user?.score && user?.score > first || user?.score === first) return '#4C9CCD';
        else {
            return 'gray';
        } 101
    }


    return (
        <>
            <h1 className="text-4xl text-center font-semibold mb-6">Levels</h1>
            <p className="text-[#4C9CCD] text-1xl text-center font-semibold mb-6">Your have currently {user?.score} points</p>
            {
                scores.map((score, index) => {
                    return (
                        <div key={index} className="p-4 mt-4">

                            <div className="container">
                                <div className="flex flex-col md:grid grid-cols-12 text-gray-50">
                                    <div className="flex md:contents">
                                        <div className="col-start-2 col-end-4 mr-10 md:mx-auto relative">
                                            <div className="h-full w-6 flex items-center justify-center">
                                                {score.name !== 'Seedling' && <div style={{ backgroundColor: getProgressBar(score.scoreFirst, score.lastScore) }} className="w-0.5 h-5/6   relative top-20 left-1">
                                                </div>}
                                            </div>

                                            <div style={{ backgroundColor: getProgressBar(score.scoreFirst, score.lastScore) }} className="w-8 h-8 absolute top-1/2 -mt-3 rounded-full  shadow text-center flex items-center justify-center" >
                                                {emoji.emojify(score.emoji)}
                                            </div>
                                        </div>
                                        <div className="bg-red col-start-4 col-end-12 p-4 rounded-xl my-4 mr-auto shadow-md w-full">
                                            <h3 style={{ color: getProgressBar(score.scoreFirst, score.lastScore) }} className=" font-semibold text-lg mb-1 ">{score.name}</h3>

                                            <p className='text-neutral-400'>{score.required}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }

        </>

    )
}







export default Levels;