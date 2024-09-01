import { TypeOrmModuleOptions } from '@nestjs/typeorm';

enum ENV__VARS {
  APP_PORT,
  DB_HOST,
  DB_NAME,
  DB_USER,
  DB_PASS,
  DB_PORT,
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRES_IN,
}

type ENV_KEYS = keyof typeof ENV__VARS;

export class ConfigService {
  constructor(private env: { [key: string]: string | undefined }) {}

  public getValue(key: ENV_KEYS) {
    const value = this.env[key];
    if (!value) {
      throw new Error(`config error: ${key} is missing `);
    }
    return value;
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    if (process.env.DATABASE_URL) {
      return {
        type: 'postgres',
        url: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false,
        },
        autoLoadEntities: true,
        synchronize: true,
        migrationsTableName: 'migration',
        entities: ['dist/**/**.entity{.ts,.js}'],
        migrations: ['dist/database/migrations/*.js'],
        cli: {
          migrationsDir: 'src/database/migrations',
          entitiesDir: 'src/models',
        },
      };
    }
    return {
      type: 'postgres',
      host: this.getValue('DB_HOST'),
      port: parseInt(this.getValue('DB_PORT')),
      username: this.getValue('DB_USER'),
      password: this.getValue('DB_PASS'),
      database: this.getValue('DB_NAME'),
      autoLoadEntities: true,
      synchronize: true,
      migrationsTableName: 'migration',
      entities: ['dist/**/**.entity{.ts,.js}'],
      migrations: ['dist/database/migrations/*.js'],
      cli: {
        migrationsDir: 'src/database/migrations',
        entitiesDir: 'src/models',
      },
    };
  }
}

export const configService = new ConfigService(process.env);
