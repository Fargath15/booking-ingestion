import { DataSource, DataSourceOptions } from "typeorm";

interface ConnectionPool {
  [connection: string]: DataSource;
}

export class ConnectionService {
  protected static mActiveConnection: ConnectionPool = {};

  protected async initializeConnection(option: any): Promise<DataSource> {
    const connectionSource = await new DataSource(option).initialize();
    ConnectionService.mActiveConnection[option.name] = connectionSource;
    return ConnectionService.mActiveConnection[option.name];
  }

  public async CreateConnection(option: any): Promise<DataSource> {
    if (!option?.name) {
      console.log("Connection string not available");
      process.exit(1);
    }
    if (option) {
      if (process.env.DB_HOST) {
        option.host = process.env.DB_HOST;
      }
      if (process.env.DB_PORT) {
        option.port = parseInt(process.env.DB_PORT ? process.env.DB_PORT.toString() : "5432");
      }
      if (process.env.DB_PASSWORD) {
        option.password = process.env.DB_PASSWORD;
      }
      if (process.env.MAIN_DB) {
        option.database = process.env.MAIN_DB;
      }
      if (process.env.DB_USER) {
        option.username = process.env.DB_USER;
      }
      ConnectionService.mActiveConnection[option.name] = await this.initializeConnection(option);
    } else {
      ConnectionService.mActiveConnection["default"] = await this.initializeConnection({
        type: "postgres",
        name: "default",
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT ? process.env.DB_PORT.toString() : "5432"),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.MAIN_DB,
      });
    }
    return ConnectionService.mActiveConnection[option.name];
  }

  public GetConnection(name?: string): DataSource {
    let connectionName: string = name || "";
    if (!connectionName || "") {
      connectionName = process.env.ENV === "dev" ? "default" : process.env.ENV || "";
    }
    if (!ConnectionService.mActiveConnection[connectionName]) {
      console.log("Connection not available");
      process.exit(1);
    }
    return ConnectionService.mActiveConnection[connectionName];
  }
}
