import { ResponseJob } from "./response_job";

export interface JobMessage {
  job: ResponseJob;
  loading: boolean;
  date: Date;
}
