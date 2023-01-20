import { DataSource, DataSourceOptions } from "typeorm";

const data: DataSourceOptions = {
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "testadmin",
  password: "testadmin",
  database: "testadmin",
  entities: ["src/entity/*.ts"],
  logging: false,
  synchronize: true,
};
export const appDataSource = new DataSource(data);
