import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { VehicleService } from './vehicle.service';
import { VehicleResolver } from './vehicle.resolver';

@Module({
  imports: [
    CacheModule.register({
      ttl: 86400,
    }),
  ],
  providers: [VehicleService, VehicleResolver],
})
export class VehicleModule {}
