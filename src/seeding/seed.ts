// import { DataSource, DataSourceOptions } from 'typeorm';
// import { runSeeders, SeederOptions } from 'typeorm-extension'; 
// import { getEnvironmentVariable } from '../environments/env';
// // import { ModuleSeeder } from './module.seeder';

// const options: DataSourceOptions & SeederOptions = {
//   // type: 'postgres',
//   ...getEnvironmentVariable().db.options,
//   factories: [ ],
//   seeds: [ModuleSeeder],
// };

// const datasource = new DataSource(options);
// datasource.initialize().then(async () => {
//   // await datasource.synchronize(true);
//   await runSeeders(datasource);
//   process.exit();
// });