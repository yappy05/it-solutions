import { plainToInstance, Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsString, validateSync } from 'class-validator';
class Env {
  @IsString() DATABASE_URL!: string;
  @IsOptional() @Type(() => Number) @IsInt() PORT = 3000;
  @IsOptional() @IsIn(['development', 'test', 'production']) NODE_ENV = 'development';
}
export function validate(config: Record<string, unknown>): Record<string, unknown> {
  const env = plainToInstance(Env, config, { enableImplicitConversion: true });
  const errors = validateSync(env, { skipMissingProperties: false });
  if (errors.length) throw new Error(errors.toString());
  return config;
}
