import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Species {
  @Field()
  name: string;

  @Field()
  designation: string;
  
  @Field()
  average_height: number;
  
  @Field()
  skin_colors: string;
  
  @Field()
  hair_colors: string;
  
  @Field()
  eye_colors: string;
  
  @Field()
  average_lifespan: string;
  
  @Field()
  homeworld: string;
  
  @Field()
  language: string;
}