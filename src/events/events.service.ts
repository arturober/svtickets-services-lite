import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ImageService } from 'src/commons/image/image.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from '../entities/event.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: EntityRepository<Event>,
    private readonly imageService: ImageService
  ) {}

  async create(createDto: CreateEventDto) {
    const imageUrl = await this.imageService.saveImage(
      'events',
      createDto.image
    );
    const event = new Event(
      createDto.title,
      createDto.description,
      imageUrl,
      createDto.price,
      createDto.date
    );
    createDto.image = imageUrl;

    await this.eventRepository.persistAndFlush(event);
    return event;
  }

  async findAll() {
    const events = await this.eventRepository.findAll();
    return events;
  }

  async findOne(id: number) {
    const event = await this.eventRepository.findOne(id);
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    return event;
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    throw new InternalServerErrorException('Not implemented yet');
  }

  async remove(id: number) {
    await this.eventRepository.nativeDelete(id);
  }
}
