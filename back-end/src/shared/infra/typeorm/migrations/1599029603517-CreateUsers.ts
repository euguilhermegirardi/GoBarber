import { MigrationInterface, QueryRunner, Table } from "typeorm";

export default class CreateUsers1599029603517 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // what to do when the migration is executed
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "email",
            type: "varchar",
            isUnique: true,
          },
          {
            name: "password",
            type: "varchar",
            // isUnique: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // if something happens, I delete something that was done in 'up'
    await queryRunner.dropTable("users");
  }
}
