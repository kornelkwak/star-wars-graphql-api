import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Film {
  @Field()
  title: string;

  @Field()
  opening_crawl: string;

  @Field()
  characters: string;

  @Field()
  director: string;

  @Field()
  producer: string;

  @Field()
  release_date: string;
}