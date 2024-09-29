import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Event {
  @PrimaryKey()
  id!: number;

  @Property({ length: 100 })
  title!: string;

  @Property({ length: 2000 })
  description!: string;

  @Property({ length: 100 })
  image!: string;

  @Property({ columnType: 'decimal', defaultRaw: `0.00` })
  price!: number;

  @Property({ columnType: 'date' })
  date!: string;

  constructor(
    title: string,
    description: string,
    image: string,
    price: number,
    date: string
  ) {
    this.title = title;
    this.description = description;
    this.image = image;
    this.price = price;
    this.date = date;
  }
}
