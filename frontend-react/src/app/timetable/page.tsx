// src/app/timetable/page.tsx

"use client";
import React, { useEffect, useState } from 'react';
import { mapTimeTable } from '@/app/timetable/services/timetableService';
import { Event } from '@/app/models/eventModel';
import Card from "@/app/components/card";
import {getWeek} from "@/app/utils/dateHelper";
import Arrow from "@/app/components/arrows";

export default function Page() {
    const [events, setEvents] = useState<Event[]>([]);
    const [currentWeek, setCurrentWeek] = useState<number>(getWeek(new Date()));
    const fullYear = new Date().getFullYear(); // e.g., 2024
    const lastTwoDigits = fullYear % 100; // e.g., 24
    const [currentYear] = useState<number>(lastTwoDigits);

    useEffect(() => {
        const fetchTimeTable = async () => {
            const events = await mapTimeTable('L3-MIAGE')
            setEvents(events);
        };
        fetchTimeTable().then(r => console.log(r));
    }, []);

    const getButtonClass = (week: number, currentWeek: number) => {
        if (currentWeek === week) {
            return 'bg-[#5E17F4] text-white';
        } else if (week === getWeek(new Date())) {
            return 'bg-[#7E30FF] text-white';
        } else {
            return '';
        }
    };

    const eventsThisWeek = events.filter(event => {
        const [eventYear, eventWeek] = event.semaine.split('/').map(Number);
        return eventYear === currentYear && eventWeek === currentWeek;
    });
    const firstWeek = Math.min(...events.map(event => Number(event.semaine.split('/')[1])));
    const lastWeek = Math.max(...events.map(event => Number(event.semaine.split('/')[1])));
    const uniqueWeeks = Array.from(new Set(events.map(event => Number(event.semaine.split('/')[1])))).sort((a, b) => (a - b));
    return (
        <div className="grid grid-cols-12 gap-4 p-4 pt-8 bg-white text-black">
            <div className="col-span-12 flex items-center justify-center w-auto p-2 space-x-2 overflow-x-auto">
                {uniqueWeeks.map(week => (
                    <button
                        key={week}
                        onClick={() => setCurrentWeek(week)}
                        className={`px-4 py-2 border rounded-md ${getButtonClass(week, currentWeek)}`}
                    >
                        Semaine n° {week}
                    </button>
                ))}
            </div>
            {currentWeek > firstWeek && (
                <div className="col-span-1 flex items-center justify-center w-auto p-2">
                    <Arrow onClick={() => setCurrentWeek(currentWeek - 1)}  direction={'left'}/>
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
                    <Arrow onClick={() => setCurrentWeek(currentWeek + 1)} direction={'right'}/>
                </div>
            )}
        </div>
    );
}