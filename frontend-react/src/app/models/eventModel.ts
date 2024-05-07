// src/app/models/eventModel.ts

export interface Event {
    id: number;
    creneau: number;
    semaine: string;
    dateJour: Date;
    activite: string;
    couleur: string;
    salle: string;
    visio: boolean;
    repas: boolean;
    eval: boolean;
    startAt: string;
    endAt: string;
    classGroupId: number;
}