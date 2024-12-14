import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseResolver } from './database.resolver';

describe('DatabaseResolver', () => {
  let resolver: DatabaseResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatabaseResolver],
    }).compile();

    resolver = module.get<DatabaseResolver>(DatabaseResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
