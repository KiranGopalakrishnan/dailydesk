import { DbTransformFunction, TransformFunction } from '../../utils/service-utils/Outcome';
import { User } from '../users/user-service';
import { UserResponse } from '../users/user-post-transformer';
import { Company } from './company-service';

export const companyPostTransformer: TransformFunction<Company, Required<Company>> = (data: any) => ({
  to: (company: Company) => company as Required<Company>,
  from: (company: Company) => company as Required<Company>
});

export const companyDbTransformer: TransformFunction<Required<Company>> = (data: any) => ({
  from: (company: Company) => company as Required<Company>,
  to: (company: Company) => company as Required<Company>
});