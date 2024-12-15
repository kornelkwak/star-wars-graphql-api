import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import axios from 'axios';
import { Database } from './database.schema';

@Injectable()
export class DatabaseService {
  
  constructor(@InjectModel(Database.name) private databaseModel: Model<Database>) {}

  private readonly CACHE_TTL = 24 * 60 * 60 * 1000;

  async fetchSingleResource(resourceName: string, resourceId: string): Promise<any> {
    const now = Date.now();
  
    // Sprawdź w cache
    const resource = await this.databaseModel.findOne({
      resourceName,
      'data.id': resourceId,
      createdAt: { $gte: new Date(now - this.CACHE_TTL) },
    });
  
    if (resource) {
      return resource.data; // Zwróć dane z cache
    }
  
    try {
      // Jeśli brak w cache, spróbuj pobrać z SWAPI
      const url = `https://swapi.dev/api/${resourceName}/${resourceId}/`;
      const response = await axios.get(url);
  
      // Zapisz w cache
      await this.databaseModel.create({
        resourceName,
        data: response.data,
        createdAt: new Date(),
      });
  
      return response.data;
    } catch (error) {
      // Jeśli API zwróci błąd, rzuć wyjątek z odpowiednią wiadomością
      throw new Error(
        `Could not fetch resource from SWAPI and no cache found. Reason: ${error}`,
      );
    }
  }

  
  async fetchMultipleResources(resourceName: string): Promise<any[]> {
    const now = Date.now();
  
    // Wyszukiwanie w cache
    const resources = await this.databaseModel.find({
      resourceName,
      createdAt: { $gte: new Date(now - this.CACHE_TTL) }, // Ważne: porównanie czasu
    });
  
    if (resources.length > 0) {
      return resources.map((res) => res.data); // Jeśli znaleziono, zwróć dane
    }
  
    try {
      const url = `https://swapi.dev/api/${resourceName}/`;
      const response = await axios.get(url);
  
      // Zapis do cache
      const resourcesArray = response.data.results.map((item) => ({
        resourceName,
        data: item,
        createdAt: new Date(),
      }));
      await this.databaseModel.insertMany(resourcesArray);
  
      return response.data.results;
    } catch (error) {
      throw new Error('SWAPI request failed and no cache available');
    }
  }
  
}
