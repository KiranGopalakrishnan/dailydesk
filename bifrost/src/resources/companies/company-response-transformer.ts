import { TransformFunction } from '../../utils/service-utils/Outcome';
import { User } from '../users/user-service';
import { UserResponse } from '../users/user-post-transformer';
import { Company } from './company-service';

export const companyPostTransformer: TransformFunction<Company, Required<Company>> = (data: any) => ({
  to: (company: Company) => company as Required<Company>
});