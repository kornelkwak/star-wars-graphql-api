import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import axios from 'axios';

@Injectable()
export class StarshipService {
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

  async getStarship() {
    const data = await this.fetchWithCache('starships', 'https://swapi.dev/api/starships/');
    return data.results;
  }

  async getStarshipById(id: string) {
    return this.fetchWithCache(`starship_${id}`, `https://swapi.dev/api/starships/${id}/`);
  }
}
