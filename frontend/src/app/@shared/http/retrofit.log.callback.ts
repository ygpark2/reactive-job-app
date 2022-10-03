import { LogCallback, RequestConfig, Response } from "ts-retrofit";
import { CredentialsService } from "../modules/auth";


export const tsRetrofitLogCallback: LogCallback = (config: RequestConfig, response: Response) => {
  const log = `[${config.method}] ${config.url} ${response.status}`;
  const credentialsService = new CredentialsService();  
  if (response.status === 401) {
    credentialsService.setCredentials(undefined, false);
  }
  console.log(log); // [GET] http://localhost:12345/ping 200
};
  