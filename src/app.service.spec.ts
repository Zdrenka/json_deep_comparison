import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = module.get<AppService>(AppService);
  });

  describe('findDifferences', () => {
    it('should correctly identify no differences for equal objects', () => {
      const obj1 = { name: 'Alice', age: 30 };
      const obj2 = { age: 30, name: 'Alice' };

      const result = service.findDifferences(obj1, obj2);
      expect(result.result).toBe(true);
    });

    it('should correctly identify differences in values', () => {
      const obj1 = { name: 'Alice', age: 30 };
      const obj2 = { name: 'Alice', age: 31 };

      const result = service.findDifferences(obj1, obj2);
      expect(result.result).toBe(false);
    });

    it('should parse JSON strings and compare them', () => {
      const jsonString1 = JSON.stringify({ name: 'Alice', age: 30 });
      const jsonString2 = JSON.stringify({ age: 30, name: 'Alice' });

      const result = service.findDifferences(jsonString1, jsonString2);
      expect(result.result).toBe(true);
    });

    it('should return false if invalid JSON is provided', () => {
      const jsonString1 = '{ invalid JSON }';
      const jsonString2 = JSON.stringify({ age: 30, name: 'Alice' });

      const result = service.findDifferences(jsonString1, jsonString2);
      expect(result.result).toBe(false);
    });
  });

  describe('compareDeeply', () => {
    it('should compare deeply nested objects correctly', () => {
      const obj1 = {
        name: 'Alice',
        details: { age: 30, address: { city: 'Wonderland' } },
      };
      const obj2 = {
        name: 'Alice',
        details: { address: { city: 'Wonderland' }, age: 30 },
      };

      const result = service.compareDeeply(obj1, obj2, '');
      expect(result).toBe(true);
    });

    it('should identify differences in deeply nested objects', () => {
      const obj1 = {
        name: 'Alice',
        details: { age: 30, address: { city: 'Wonderland' } },
      };
      const obj2 = {
        name: 'Alice',
        details: { age: 31, address: { city: 'Wonderland' } },
      };

      const result = service.compareDeeply(obj1, obj2, '');
      expect(result).toBe(false);
    });
  });

  describe('deepSort', () => {
    it('should correctly sort arrays of objects by property "n"', () => {
      const input = [{ n: 'Zebra' }, { n: 'Apple' }, { n: 'Monkey' }];
      const expectedOutput = [{ n: 'Apple' }, { n: 'Monkey' }, { n: 'Zebra' }];

      const result = service.deepSort(input);
      expect(result).toEqual(expectedOutput);
    });

    it('should sort nested objects alphabetically by keys', () => {
      const input = { b: 1, a: { z: 2, y: 3 } };
      const expectedOutput = { a: { y: 3, z: 2 }, b: 1 };

      const result = service.deepSort(input);
      expect(result).toEqual(expectedOutput);
    });

    it('should handle primitive values correctly', () => {
      expect(service.deepSort(5)).toBe(5);
      expect(service.deepSort('string')).toBe('string');
      expect(service.deepSort(null)).toBe(null);
    });
  });
});
