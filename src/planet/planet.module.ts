import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { PlanetService } from './planet.service';
import { PlanetResolver } from './planet.resolver';

@Module({
  imports: [
    CacheModule.register({
      ttl: 86400,
    }),
  ],
  providers: [PlanetService, PlanetResolver],
})
export class PlanetModule {}
