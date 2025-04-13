// src/utils/api.ts
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000', 
});

export const getEvents = () => API.get('/events');
export const getEvent = (id: string) => API.get(`/events/${id}`);
export const createEvent = (data: any) => API.post('/events', data);
export const updateEvent = (id: string, data: any) => API.put(`/events/${id}`, data);
export const deleteEvent = (id: string) => API.delete(`/events/${id}`);
