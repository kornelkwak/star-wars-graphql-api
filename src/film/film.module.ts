import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { FilmService } from './film.service';
import { FilmResolver } from './film.resolver';

@Module({
  imports: [
    CacheModule.register({
      ttl: 86400,
    }),
  ],
  providers: [FilmService, FilmResolver],
})
export class FilmModule {}
