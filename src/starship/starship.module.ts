import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { StarshipService } from './starship.service';
import { StarshipResolver } from './starship.resolver';

@Module({
  imports: [
    CacheModule.register({
      ttl: 86400,
    }),
  ],
  providers: [StarshipService, StarshipResolver],
})
export class StarshipModule {}
