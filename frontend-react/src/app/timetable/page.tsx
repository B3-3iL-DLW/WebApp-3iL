// src/app/timetable/page.tsx

"use client";
import React, { useEffect, useState } from 'react';
import { getTimeTable } from '@/app/timetable/services/timetableService';
import { Event } from '@/app/models/eventModel';
import Card from "@/app/components/card";
import {getWeek} from "@/app/utils/dateHelper";

export default function Page() {
    const [events, setEvents] = useState<Event[]>([]);
    const [currentWeek, setCurrentWeek] = useState<number>(getWeek(new Date()));
    const fullYear = new Date().getFullYear(); // e.g., 2024
    const lastTwoDigits = fullYear % 100; // e.g., 24
    const [currentYear] = useState<number>(lastTwoDigits);    useEffect(() => {
        const fetchTimeTable = async () => {
            let className;
            try {
                className = encodeURIComponent('B3 Groupe 3 DLW-FA');
                const response = await getTimeTable(className);
                const timetable = await response.event.map((event: any) => {
                    return {
                        id: event.id,
                        creneau: event.creneau,
                        semaine: event.semaine,
                        dateJour: new Date(event.dateJour),
                        activite: event.activite,
                        couleur: event.couleur,
                        salle: event.salle,
                        visio: event.visio,
                        repas: event.repas,
                        eval: event.eval,
                        startAt: event.startAt,
                        endAt: event.endAt,
                        classGroupId: event.classGroupId,
                    } as Event;
                });
                setEvents(timetable);
            } catch (error) {
                console.error(error);
            }
        };

        fetchTimeTable().then(r => console.log(r));
    }, []);

    const eventsThisWeek = events.filter(event => {
        const [eventYear, eventWeek] = event.semaine.split('/').map(Number);
        return eventYear === currentYear && eventWeek === currentWeek;
    });
    const firstWeek = Math.min(...events.map(event => Number(event.semaine.split('/')[1])));
    const lastWeek = Math.max(...events.map(event => Number(event.semaine.split('/')[1])));
    const uniqueWeeks = Array.from(new Set(events.map(event => Number(event.semaine.split('/')[1])))).sort();
    return (
        <div className="grid grid-cols-12 gap-4 p-4 pt-8 bg-white text-black">
            <div className="col-span-12 flex items-center justify-center w-auto p-2">
                <label htmlFor="weekPicker">Selecteur de semaines: </label>
                <select id="weekPicker" value={currentWeek} onChange={(e) => setCurrentWeek(Number(e.target.value))}>
                    {uniqueWeeks.map(week => (
                        <option key={week} value={week}>
                            Semaine n° {week}
                        </option>
                    ))}
                </select>
            </div>
            {currentWeek > firstWeek && (
                <div className="col-span-1 flex items-center justify-center w-auto p-2">
                    <button onClick={() => setCurrentWeek(currentWeek - 1)}>
                        <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none'
                             stroke='#000000' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                            <path d='M19 12H6M12 19l-7 -7 7 -7'/>
                        </svg>
                    </button>
                </div>
            )}
            {Object.entries(
                eventsThisWeek.reduce((acc, event) => {
                    const date = event.dateJour.toISOString().split('T')[0];
                    if (!acc[date]) {
                        acc[date] = [];
                    }
                    acc[date].push(event);
                    return acc;
                }, {} as Record<string, Event[]>)
            ).map(([date, events]) => (
                <div key={date} className="col-span-2">
                    <h3 className="text-center">{date}</h3>
                    {events.map((event) => (
                        <div key={event.id}>
                            <Card activite={event.activite}
                                  horaire={`${event.startAt} - ${event.endAt}`}
                                  salle={event.salle}
                                  visio={event.visio}
                                  ei={event.eval}
                                  repas={event.repas}
                                  today={new Date().toDateString() === event.dateJour.toDateString()}
                            >
                            </Card>
                        </div>
                    ))}
                </div>
            ))}
            {currentWeek < lastWeek && (
                <div className="col-span-1 flex items-center justify-center w-auto p-2">
                    <button onClick={() => setCurrentWeek(currentWeek + 1)}>
                        <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none'
                             stroke='#000000' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                            <path d='M5 12h13M12 5l7 7-7 7'/>
                        </svg>
                    </button>
                </div>
            )}
        </div>
    );
}