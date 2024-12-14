import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Starship {
  @Field()
  name: string;

  @Field()
  model: string;

  @Field()
  manufacturer: string;

  @Field()
  cost_in_credits: number;

  @Field()
  length: number;

  @Field()
  max_atmosphering_speed: number;

  @Field()
  crew: string;

  @Field()
  passengers: number;

  @Field()
  cargo_capacity: number;

  @Field()
  consumables: string;

  @Field()
  hyperdrive_rating: number;

  @Field()
  starship_class: string;
  
}