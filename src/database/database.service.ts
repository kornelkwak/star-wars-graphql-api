import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import axios from 'axios';
import { Database } from './database.schema';

@Injectable()
export class DatabaseService {
  constructor(@InjectModel(Database.name) private databaseModel: Model<Database>) {}

  private readonly CACHE_TTL = 24 * 60 * 60 * 1000;

  
  async fetchAndCacheResource(resourceName: string, resourceId?: string): Promise<any> {
    const now = Date.now();
  
    if (resourceId) {
      const resource = await this.databaseModel.findOne({
        resourceName,
        'data.id': resourceId,
        createdAt: { $gte: new Date(now - this.CACHE_TTL) },
      });
  
      if (resource) {
        return resource.data;
      }
    } else {
      const resources = await this.databaseModel.find({
        resourceName,
        createdAt: { $gte: new Date(now - this.CACHE_TTL) },
      });
  
      if (resources && resources.length > 0) {
        return resources.map((res) => res.data);
      }
    }
  
    const url = resourceId
      ? `https://swapi.dev/api/${resourceName}/${resourceId}/`
      : `https://swapi.dev/api/${resourceName}/`;
    const response = await axios.get(url);
  
    const dataToCache = {
      resourceName,
      data: resourceId ? response.data : response.data.results,
      createdAt: new Date(),
    };
  
    if (resourceId) {
      
      await this.databaseModel.create(dataToCache);
      return response.data;
    } else {
      
      const resourcesArray = response.data.results.map((item) => ({
        resourceName,
        data: item,
        createdAt: new Date(),
      }));
      await this.databaseModel.insertMany(resourcesArray);
      return response.data.results;
    }
  }
}
