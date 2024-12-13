import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { SpeciesService } from './species.service';
import { SpeciesResolver } from './species.resolver';

@Module({
  imports: [
    CacheModule.register({
      ttl: 86400,
    }),
  ],
  providers: [SpeciesService, SpeciesResolver],
})
export class SpeciesModule {}
