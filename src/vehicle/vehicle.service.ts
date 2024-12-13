import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import axios from 'axios';

@Injectable()
export class VehicleService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async fetchWithCache(key: string, url: string): Promise<any> {
    const cachedData = await this.cacheManager.get(key);
    if (cachedData) {
      console.log('Returning data from cache');
      return cachedData;
    }

    const response = await axios.get(url);
    await this.cacheManager.set(key, response.data, 24 * 60 * 60);
    return response.data;
  }

  async getVehicle() {
    const data = await this.fetchWithCache('vehicles', 'https://swapi.dev/api/vehicles/');
    return data.results;
  }

  async getVehicleById(id: string) {
    return this.fetchWithCache(`vehicle_${id}`, `https://swapi.dev/api/vehicles/${id}/`);
  }
}
