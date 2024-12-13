import { Test, TestingModule } from '@nestjs/testing';
import { StarshipResolver } from './starship.resolver';

describe('StarshipResolver', () => {
  let resolver: StarshipResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StarshipResolver],
    }).compile();

    resolver = module.get<StarshipResolver>(StarshipResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
