import { Test, TestingModule } from '@nestjs/testing';
import { FilmResolver } from './film.resolver';

describe('FilmResolver', () => {
  let resolver: FilmResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilmResolver],
    }).compile();

    resolver = module.get<FilmResolver>(FilmResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
