import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import axios from 'axios';

@Injectable()
export class SpeciesService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async fetchWithCache(key: string, url: string): Promise<any> {
    const cachedData = await this.cacheManager.get(key);
    if (cachedData) {
      console.log('Returning data from cache');
      return cachedData;
    }

    const response = await axios.get(url);
    await this.cacheManager.set(key, response.data, 24 * 60 * 60); // TTL 24 godziny
    return response.data;
  }

  async getSpecies() {
    const data = await this.fetchWithCache('species', 'https://swapi.dev/api/species/');
    return data.results;
  }

  async getSpeciesById(id: string) {
    return this.fetchWithCache(`species_${id}`, `https://swapi.dev/api/species/${id}/`);
  }
}
