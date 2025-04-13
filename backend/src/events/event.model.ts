// src/events/event.model.ts
export interface Event {
    id: string;
    title: string;
    description?: string;
    startTime: string; // ISO string
    media?: string[]; // URLs or base64 (your choice)
  }
  