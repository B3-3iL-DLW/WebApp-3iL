// src/app/login/services/timetableService.ts

import {apiRequest} from '../../api/apiService';
import {Event} from "@/app/models/eventModel";


export class InvalidTimeTableError extends Error {
    constructor(message?: string) {
        super(message);
        this.name = 'InvalidTimeTableError';
    }
}

async function getTimeTable(className: string) {
    try {
        let response = await apiRequest(`timetable/${className}`, 'GET');
        return response.data;
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            throw new InvalidTimeTableError('Invalid TimeTable');
        } else {
            throw new Error('Failed to get TimeTable');
        }
    }
}

/**
 * Cette fonction mappe l'emploi du temps d'une classe spécifique en objets de type Event.
 * Elle fait une requête à l'API pour obtenir l'emploi du temps, puis mappe les données reçues.
 * En cas d'erreur lors de la requête, elle affiche l'erreur dans la console et retourne un tableau vide.
 *
 * @param {string} className - Le nom de la classe pour laquelle obtenir l'emploi du temps.
 * @returns {Promise<Event[]>} Un tableau d'objets de type Event représentant l'emploi du temps de la classe.
 * @throws {Error} Si une erreur se produit lors de la requête à l'API.
 */
export async function mapTimeTable(className: string): Promise<Event[]>{
    try {
        const response = await getTimeTable(encodeURIComponent(className));
        return await response.event.map((event: any) => {
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
    } catch (error) {
        console.error(error);
        return [];
    }
}