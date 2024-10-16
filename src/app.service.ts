import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  findDifferences(obj1, obj2, path = '') {
    let sorted1 = obj1;
    let sorted2 = obj2;

    // Parse strings if they are JSON strings and at the root level
    if (typeof obj1 === 'string' && path === '') {
      try {
        sorted1 = JSON.parse(obj1);
      } catch (error) {
        console.error(`Failed to parse obj1 at path: ${path}`, error);
        return { result: false, sorted1: obj1, sorted2: obj2 };
      }
    }

    if (typeof obj2 === 'string' && path === '') {
      try {
        sorted2 = JSON.parse(obj2);
      } catch (error) {
        console.error(`Failed to parse obj2 at path: ${path}`, error);
        return { result: false, sorted1: obj1, sorted2: obj2 };
      }
    }

    // Sort the objects before comparing them
    sorted1 = this.deepSort(sorted1);
    sorted2 = this.deepSort(sorted2);

    const result = this.compareDeeply(sorted1, sorted2, path);

    console.log({ result, sorted1, sorted2 });
    return { result, sorted1, sorted2 };
  }

  compareDeeply(obj1, obj2, path) {
    if (
      typeof obj1 === 'object' &&
      typeof obj2 === 'object' &&
      obj1 !== null &&
      obj2 !== null
    ) {
      if (Array.isArray(obj1) && Array.isArray(obj2)) {
        if (obj1.length !== obj2.length) {
          console.log(`Array lengths are different at path: ${path}`);
          return false;
        }

        return obj1.every((item, index) =>
          this.compareDeeply(item, obj2[index], `${path}[${index}]`),
        );
      }

      const keys1 = Object.keys(obj1).sort();
      const keys2 = Object.keys(obj2).sort();

      if (!this.compareDeeply(keys1, keys2, `${path}.keys`)) {
        console.log(`Object keys are different at path: ${path}`);
        return false;
      }

      return keys1.every((key) =>
        this.compareDeeply(obj1[key], obj2[key], `${path}.${key}`),
      );
    }

    if (obj1 !== obj2) {
      console.log(`Values are different at path: ${path}`);
      console.log(`Value in obj1: ${obj1}`);
      console.log(`Value in obj2: ${obj2}`);
      return false;
    }

    return true;
  }

  deepSort(value) {
    if (Array.isArray(value)) {
      return value
        .map(this.deepSort) // Recursively sort items
        .sort((a, b) => {
          if (typeof a === 'object' && typeof b === 'object') {
            if (a.n && b.n) {
              return a.n.localeCompare(b.n);
            }
            if (a.id && b.id) {
              return a.id.localeCompare(b.id);
            }
          }
          // Fallback
          return JSON.stringify(a).localeCompare(JSON.stringify(b));
        });
    }

    if (typeof value === 'object' && value !== null) {
      const sortedObject = {};
      Object.keys(value)
        .sort()
        .forEach((key) => {
          sortedObject[key] = this.deepSort(value[key]);
        });
      return sortedObject;
    }

    return value;
  }
}
