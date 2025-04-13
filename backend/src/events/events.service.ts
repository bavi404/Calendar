import { Injectable, NotFoundException } from '@nestjs/common';
import { Event } from './event.model';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class EventsService {
  private events: Event[] = [];

  create(createEventDto: CreateEventDto): Event {
    const newEvent: Event = {
      id: uuid(),
      ...createEventDto,
    };
    this.events.push(newEvent);
    return newEvent;
  }

  findAll(): Event[] {
    return this.events;
  }

  findOne(id: string): Event {
    const event = this.events.find((e) => e.id === id);
    if (!event) throw new NotFoundException('Event not found');
    return event;
  }

  update(id: string, updateDto: UpdateEventDto): Event {
    const index = this.events.findIndex((e) => e.id === id);
    if (index === -1) throw new NotFoundException('Event not found');

    this.events[index] = { ...this.events[index], ...updateDto };
    return this.events[index];
  }

  remove(id: string): void {
    const index = this.events.findIndex((e) => e.id === id);
    if (index === -1) throw new NotFoundException('Event not found');
    this.events.splice(index, 1);
  }
}
