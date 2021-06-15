import { badRequest, internalServerError, notFound, Outcome, success } from '../../utils/service-utils/Outcome';
import { generateId } from '../../utils/nano-id';
import { prisma } from '../../utils/db';
import { userDocumentTransformer, UserResponse, userTokenTransformer } from '../users/user-post-transformer';
import { generateTokens } from '../../utils/jwt';
import { saveRefreshToken } from '../tokens/token-service';
import { getJWTCookieData, getRefreshTokenCookieData } from '../../utils/http/cookies';
import { logger } from '../../logger';
import { RecordStatus, User, UserPostRequest } from '../users/user-service';
import { companyPostTransformer } from './company-response-transformer';

export interface Company {
  id: string;
  name: string;
  domain: string;
  website: string;
  status: RecordStatus ;
}

interface CompanyPost extends Omit<Company,'id'|'status'>{}

export const createCompany = async (company: CompanyPost):Promise<Company> =>{
      const id = await generateId();
      const exists = await prisma.companies.findUnique({
        where:{
          domain: company.domain,
        }
      })

      if (exists) throw new Error("Company already exists");

      const companyWithStatus = { ...company, id, status: RecordStatus.CREATED };
      const companyResponse: Required<Company> = companyPostTransformer().to(companyWithStatus);
      const newCompany = await prisma.companies.create({
        data: companyResponse,
      });

      if (!newCompany) throw new Error("Company creation failed");

      return companyResponse
}