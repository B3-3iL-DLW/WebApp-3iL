// src/app/components/card.tsx

import React from 'react';

interface CardProps {
    activite: string;
    horaire: string;
    salle: string;
    visio: boolean;
    ei: boolean;
    repas: boolean;
    today: boolean;
}
const Card = ({ activite, horaire, salle, visio, ei, repas, today }: CardProps) => {
    return (
        <div className={`break-inside relative overflow-hidden flex flex-col justify-between space-y-2 text-sm rounded-xl max-w-[23rem] h-[8rem] p-4 mb-4 ${today ? 'bg-[#7E30FF]' : ei ? 'bg-orange-500' : 'bg-[#5E17F4]'} text-white`}>
            <span className='uppercase text-xs text-[#D2BDFF]'>{horaire}</span>
            {repas &&
                <div className="flex items-center justify-center">
                    <svg version="1.1" id="Uploaded to svgrepo.com" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 32 32">
                        <path fill="#ffffff" className="blueprint_een" d="M20.715,16.3c0.345-0.029,0.788,0,1.181,0.03c0.307,0.022,0.604,0.043,0.882,0.043
                            c0.542,0,1.332-0.069,1.93-0.667l7-7c0.391-0.391,0.391-1.023,0-1.414l-7-7c-0.391-0.391-1.023-0.391-1.414,0l-7,7
                            c-1.186,1.186-1.294,2.406-1.199,3.387L5.707,1.293C5.584,1.17,4.921,0.556,3.963,0.556c-0.426,0-1.061,0.128-1.67,0.737
                            c-0.318,0.318-0.465,0.786-0.449,1.43C1.908,5.269,4.8,12.617,9.911,17.675l-9.618,9.618c-0.391,0.391-0.391,1.023,0,1.414l3,3
                            c0.391,0.391,1.023,0.391,1.414,0L16,20.414l11.293,11.293C27.488,31.902,27.744,32,28,32s0.512-0.098,0.707-0.293l3-3
                            c0.391-0.391,0.391-1.023,0-1.414L20.715,16.3z M17.182,11.145c-0.174-1.012-0.241-1.671,0.525-2.438L24,2.414l1.439,1.439
                            l-4.793,4.793c-0.195,0.195-0.195,0.512,0,0.707C20.744,9.451,20.872,9.5,21,9.5s0.256-0.049,0.354-0.146l4.793-4.793l1.293,1.293
                            l-4.793,4.793c-0.195,0.195-0.195,0.512,0,0.707C22.744,11.451,22.872,11.5,23,11.5s0.256-0.049,0.354-0.146l4.793-4.793L29.586,8
                            l-6.293,6.293c-0.009,0.008-0.093,0.081-0.516,0.081c-0.231,0-0.479-0.02-0.734-0.038c-0.323-0.024-0.658-0.048-0.991-0.048
                            c-0.753,0-1.857,0.104-2.759,1.005l-1.586-1.586C17.487,12.927,17.317,11.938,17.182,11.145z M4,29.586L2.414,28l9.638-9.638
                            c0.017-0.017,0.023-0.041,0.039-0.059c0.21,0.171,0.422,0.337,0.638,0.498C12.904,18.932,13.119,19,13.338,19h1.248L4,29.586z
                             M28,29.586L16.414,18h-3.088C7.372,13.564,3.728,4.422,3.84,2.598c0.041-0.026,0.084-0.043,0.123-0.043
                            c0.113,0,0.271,0.098,0.33,0.152L29.586,28L28,29.586z"
                        />
                    </svg>
                </div>
            }
            {!repas && (
                <>
                    <div className='flex flex-row items-center space-x-3'>
                        <span className='text-base font-medium'>{activite}</span>

                    </div>
                    <div className='flex justify-between items-center'>
                        <span>Salle : <br/>{salle || "Aucune"} </span>
                        <button
                            className={`flex items-center justify-center text-xs font-medium rounded-full px-4 py-2 space-x-1 bg-white text-black ${visio ? 'opacity-100' : 'opacity-0'}`}>
                            <span>Teams</span>
                            <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24'
                                 fill='none'
                                 stroke='#000000' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                                <path d='M5 12h13M12 5l7 7-7 7'/>
                            </svg>
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};
export default Card;