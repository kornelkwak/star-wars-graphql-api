import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from './database.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Film } from 'src/types/film.type';

describe('DatabaseService', () => {
  let service: DatabaseService;
  let mockDatabaseModel: Model<any>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DatabaseService,
        {
          provide: getModelToken('Database'),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    mockDatabaseModel = module.get<Model<any>>(getModelToken('Database'));
    service = module.get<DatabaseService>(DatabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return the most frequent character', async () => {
    const film: Film = {
      title: 'A New Hope',
      director: 'George Lucas',
      producer: 'Gary Kurtz, Rick McCallum',
      release_date: '1977-05-25',
      opening_crawl: 'Luke is here. Luke is a hero.',
      characters: [
        'https://swapi.dev/api/people/1',
        'https://swapi.dev/api/people/2',
      ],
      wordsCount: undefined,
      mostFrequentCharacter: "Luke Skywalker", 
    };

    jest.spyOn(service, 'fetchSingleResource').mockImplementation((_, id) => {
      const mockData = { '1': { name: 'Luke Skywalker' }, '2': { name: 'Leia Organa' } };
      return Promise.resolve(mockData[id]);
    });

    const result = await service.findMostFrequentCharacter(film);
    expect(result).toBe('Luke Skywalker');
  });
});
