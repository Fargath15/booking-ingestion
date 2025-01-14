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
      ConnectionService.mActiveConnection[option.name] = await this.initializeConnection(option);
    } else {
      ConnectionService.mActiveConnection["default"] = await new DataSource({
        type: "postgres",
        name: "default",
      }).initialize();
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
