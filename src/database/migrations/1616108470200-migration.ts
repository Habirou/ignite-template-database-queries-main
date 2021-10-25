import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from "typeorm";

export class migration1616108470200 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "first_name",
            type: "varchar",
          },
          {
            name: "last_name",
            type: "varchar",
          },
          {
            name: "email",
            type: "varchar",
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
        ]
      })
    );

    await queryRunner.createTable(
      new Table({
        name: "games",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "title",
            type: "varchar",
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
          }
        ]
      })
    );

    await queryRunner.createTable(
      new Table({
        name: "users_games_games",
        columns: [
          {
            name: "usersId",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "gamesId",
            type: "uuid",
            isPrimary: true,
          }
        ]
      })
    );

    await queryRunner.createIndex(
      "users_games_games",
      new TableIndex({
        name: "IDX_e5263d029d8644de829aae5c35",
        columnNames: ["usersId"]
      })
    );

    await queryRunner.createIndex(
      "users_games_games",
      new TableIndex({
        name: "IDX_934b0d8f9d0084c97d3876ad32",
        columnNames: ["gamesId"]
      })
    );

    await queryRunner.createForeignKey("users_games_games", new TableForeignKey({
      columnNames: ["usersId"],
      referencedColumnNames: ["id"],
      referencedTableName: "users",
      onDelete: "CASCADE"
    }));

    await queryRunner.createForeignKey("users_games_games", new TableForeignKey({
      columnNames: ["gamesId"],
      referencedColumnNames: ["id"],
      referencedTableName: "games",
      onDelete: "CASCADE"
    }));

  }

  public async down(queryRunner: QueryRunner): Promise<void> {

  /*   const table = await queryRunner.getTable("users_games_games");

    const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("usersId") !== -1);
    await queryRunner.dropForeignKey("users_games_games", foreignKey);

    const forKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("gamesId") !== -1);
    await queryRunner.dropForeignKey("users_games_games", forKey); */


    await queryRunner.dropTable("users");
    await queryRunner.dropTable("games");
    await queryRunner.dropTable("users_games_games");
    await queryRunner.dropIndex("users_games_games", "IDX_e5263d029d8644de829aae5c35");
    await queryRunner.dropIndex("users_games_games", "IDX_934b0d8f9d0084c97d3876ad32");
  }
}
