"use client";
// src/app/pages/Page.tsx

import React, { useEffect, useState } from 'react';
import { getTimeTable } from '@/app/timetable/services/timetableService';
import { Event } from '@/app/models/eventModel';

export default function Page() {
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        const fetchTimeTable = async () => {
            try {
                const response = await getTimeTable('B3 Groupe 3 DLW-FA');
                const timetable = response.event.map((event: any) => {
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

        console.log(fetchTimeTable());
    }, []);

    return (
        <div>
            <h2>Emploi du temps</h2>
            {events.map((event, index) => (
                <div key={event.id}>
                    <h2>{event.activite}</h2>
                    <p>Créneau: {event.creneau}</p>
                    <p>Semaine: {event.semaine}</p>
                    <p>Date: {event.dateJour.toString()}</p>
                    <p>Salle: {event.salle}</p>
                    <p>Visio: {event.visio ? 'Oui' : 'Non'}</p>
                    <p>Repas: {event.repas ? 'Oui' : 'Non'}</p>
                    <p>Eval: {event.eval ? 'Oui' : 'Non'}</p>
                    <p>Start At: {event.startAt}</p>
                    <p>End At: {event.endAt}</p>
                    <p>Class Group ID: {event.classGroupId}</p>
                </div>
            ))}
        </div>
    );
}