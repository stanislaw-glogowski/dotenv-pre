import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { parse } from 'dotenv';
import { expand } from 'dotenv-expand';

function prepareFileNames(...keys: string[]): string[] {
  const path = keys
    .filter((item) => !!item)
    .map((item) => `.${item}`)
    .join('');

  return [`.env${path}.local`, `.env${path}`];
}

export function config(options?: { name?: string }): Record<string, string> {
  const result: Record<string, string> = (process?.env || {}) as Record<
    string,
    string
  >;

  const name = options?.name;

  const environment =
    result?.NODE_ENV === 'production' ? 'production' : 'development';

  let fileNames = [...prepareFileNames(environment), ...prepareFileNames()];

  if (name) {
    fileNames = [
      ...prepareFileNames(name, environment),
      ...prepareFileNames(name),
      ...fileNames,
    ];
  }

  for (const fileName of fileNames) {
    const filePath = join(process.cwd(), fileName);

    if (existsSync(filePath)) {
      const content = parse(readFileSync(filePath));
      const contentEntries = Object.entries(content);

      for (const [key, value] of contentEntries) {
        if (!result[key]) {
          result[key] = value;
        }
      }
    }
  }

  expand({
    parsed: result,
    ignoreProcessEnv: true,
  });

  return result;
}
