export interface Company {
  id: string;
  name: string;
  website: string;
  domain: string;
  status: string;
}

export type CompanyPost = Omit<Company, 'id' | 'status'>;
