import { plainToClass } from 'class-transformer';
import { IsDefined, IsEnum, validateSync } from 'class-validator';
import * as constants from './common/constants';

export enum Environment {
  Development = 'development',
  Production = 'production',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  [constants.NODE_ENV]: Environment;

  @IsDefined()
  [constants.GITHUB_CLIENT_ID]: string;

  @IsDefined()
  [constants.GITHUB_CLIENT_SECRET]: string;

  @IsDefined()
  [constants.CLIENT_URL]: string;

  @IsDefined()
  [constants.CLIENT_LOGIN_URL]: string;

  @IsDefined()
  [constants.DATABASE_URL]: string;

  @IsDefined()
  [constants.JWT_SECRET]: string;

  @IsDefined()
  [constants.INTROSPECTION_KEY]: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
