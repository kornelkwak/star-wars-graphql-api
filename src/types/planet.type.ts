import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Planet {
  @Field()
  name: string;

  @Field()
  rotation_period: number;

  @Field()
  orbital_period: number;

  @Field()
  diameter: number;

  @Field()
  climate: string;

  @Field()
  gravity: string;

  @Field()
  terrain: string;

  @Field()
  surface_water: number;

  @Field()
  population: number;
}