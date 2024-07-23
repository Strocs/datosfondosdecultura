import fs from 'fs';
import path from 'path';


function createFilePath(fileName: string): string {
  return path.join(process.cwd(), `db/${fileName}.json`);

}

export async function fetchLocal<T>(fileName: string) {
  const filePath = createFilePath(fileName);
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(jsonData) as T;
}

