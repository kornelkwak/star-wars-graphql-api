import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import axios from 'axios';
import { Database } from './database.schema';
import { Film } from 'src/types/film.type';

@Injectable()
export class DatabaseService {

  constructor(@InjectModel(Database.name) private databaseModel: Model<Database>) {}

  private readonly CACHE_TTL = 24 * 60 * 60 * 1000;

  async fetchSingleResource(resourceName: string, resourceId: string): Promise<any> {
    const now = Date.now();
  
    const resource = await this.databaseModel.findOne({
      resourceName,
      'data.id': resourceId,
      createdAt: { $gte: new Date(now - this.CACHE_TTL) },
    });
  
    if (resource) {
      return resource.data;
    }
  
    try {
      const url = `https://swapi.dev/api/${resourceName}/${resourceId}/`;
      const response = await axios.get(url);
  
      await this.databaseModel.create({
        resourceName,
        data: response.data,
        createdAt: new Date(),
      });
  
      return response.data;
    } catch (error) {
      throw new Error(
        `Could not fetch resource from SWAPI and no cache found. Reason: ${error}`,
      );
    }
  }

  
  async fetchMultipleResources(resourceName: string): Promise<any[]> {
    const now = Date.now();
  
    const resources = await this.databaseModel.find({
      resourceName,
      createdAt: { $gte: new Date(now - this.CACHE_TTL) },
    });
  
    if (resources.length > 0) {
      return resources.map((res) => res.data);
    }
  
    try {
      const url = `https://swapi.dev/api/${resourceName}/`;
      const response = await axios.get(url);

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

  countWords(crawl: string): { word: string; count: number }[] {
    if (!crawl) return [];
  
    const wordCounts: Record<string, number> = {};
  
    const words = crawl
      .replace(/[\r\n]+/g, ' ')
      .split(/\s+/)
      .map(word => word.toLowerCase().trim())
      .filter(word => word !== '');
  
    for (const word of words) {
      wordCounts[word] = (wordCounts[word] || 0) + 1;
    }
  
    return Object.entries(wordCounts)
      .map(([word, count]) => ({ word, count }))
      .sort((a, b) => b.count - a.count);
  }

  async fetchFilmCharacters(characterUrls: string[]): Promise<string[]> {
    const characters = await Promise.all(
      characterUrls.map(async (url) => {
        const characterData = await this.fetchSingleResource('people', url.split('/')[5]);
        return characterData.name;
      }),
    );
    return characters;
  }
  
  countCharacterOccurrences(crawl: string, characters: string[]): Record<string, number> {
    const characterCounts: Record<string, number> = {};
    characters.forEach((name) => {
      const regex = new RegExp(`\\b${name}\\b`, 'g');
      const matches = crawl.match(regex);
      if (matches) {
        characterCounts[name] = matches.length;
      }
    });
    return characterCounts;
  }

  async findMostFrequentCharacter(film: Film): Promise<string> {
    const characters = await this.fetchFilmCharacters(film.characters);
    const characterCounts = this.countCharacterOccurrences(film.opening_crawl, characters);
  
    const maxCount = Math.max(...Object.values(characterCounts));
    const mostFrequentCharacter = Object.keys(characterCounts).find(
      (name) => characterCounts[name] === maxCount,
    );
  
    return mostFrequentCharacter || '';
  }

}
