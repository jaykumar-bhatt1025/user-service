import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Users1758901895966 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'bigint',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
            unsigned: true,
            isNullable: false,
          },
          {
            name: 'uuid',
            type: 'uuid',
            isUnique: true,
            isNullable: false,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'first_name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'last_name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'email',
            type: 'varchar',
            isNullable: true,
            default: null,
            isUnique: true,
          },
          // {
          //   name: 'password',
          //   type: 'varchar',
          //   isNullable: false,
          // },
          // {
          //   name: 'is_active',
          //   type: 'boolean',
          //   isNullable: false,
          //   default: true,
          // },
          // {
          //   name: 'email_otp',
          //   type: 'varchar',
          //   length: '10',
          //   isNullable: true,
          //   default: null,
          // },
          // {
          //   name: 'email_otp_expired_at',
          //   type: 'timestamp with time zone',
          //   isNullable: true,
          //   default: null,
          // },
          // {
          //   name: 'email_verified_at',
          //   type: 'timestamp with time zone',
          //   isNullable: true,
          //   default: null,
          // },
          {
            name: 'profile_photo',
            type: 'varchar',
            isNullable: true,
            default: null,
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            isNullable: false,
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            isNullable: true,
            default: null,
            onUpdate: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'deleted_at',
            type: 'timestamp with time zone',
            isNullable: true,
            default: null,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
