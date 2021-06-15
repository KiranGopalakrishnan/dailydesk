import { post } from '../api/Api';
import { projectorUrl } from './utils';
import { CompanyPost } from '@services/Company';

export interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  companyId: string;
  password: string;
}

export interface UserPost extends Omit<User, 'id' | 'companyId' | 'status'> {
  company: CompanyPost;
}
