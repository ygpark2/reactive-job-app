import { Address } from "./job_dto";

export interface ResponseJob {

    docId: string;

    name: string;
  
    phone: string;
  
    address: Address;
  
    status: string;

    createdAt: Date;
    
    updatedAt: Date;
  
  }
  