import { Resolver, Query, Args } from '@nestjs/graphql';
import { VehicleService } from './vehicle.service';
import { Vehicle } from './vehicle.type';

@Resolver(() => Vehicle)
export class VehicleResolver {
  constructor(private readonly VehicleService: VehicleService) {}

  @Query(() => [Vehicle])
  vehicles() {
    return this.VehicleService.getVehicle();
  }

  @Query(() => Vehicle)
  vehicle(@Args('id') id: string) {
    return this.VehicleService.getVehicleById(id);
  }
}
