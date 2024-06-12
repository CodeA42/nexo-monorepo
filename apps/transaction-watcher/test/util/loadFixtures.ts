import * as path from 'path';
import { Builder, fixturesIterator, Loader, Parser, Resolver } from 'typeorm-fixtures-cli/dist';
import { DataSource } from 'typeorm';

export type FixturesLoaderType = {
  dataSource: DataSource;
  synchronize: boolean;
  fixturesPath: string;
};

const parser = new Parser();
// see https://github.com/RobinCK/typeorm-fixtures#programmatically-loading-fixtures
export const loadFixtures = async ({
  dataSource,
  synchronize = false,
  fixturesPath,
}: FixturesLoaderType): Promise<void> => {
  const loader = new Loader();
  loader.load(path.resolve('./apps/transaction-watcher/test', fixturesPath));

  const resolver = new Resolver();
  const fixtures = resolver.resolve(loader.fixtureConfigs);
  const fixturesArray = [...fixturesIterator(fixtures)];

  if (synchronize) {
    await dataSource.dropDatabase();
  }

  await dataSource.runMigrations();

  const builder = new Builder(dataSource, parser, false);

  for (const fixture of fixturesArray) {
    const entity = await builder.build(fixture);

    if (entity.dueDate) {
      entity.dueDate = new Date(entity.dueDate).toISOString();
    }

    await dataSource.getRepository(entity.constructor.name).save(entity);
  }
};
