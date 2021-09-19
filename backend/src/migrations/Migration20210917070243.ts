import { Migration } from '@mikro-orm/migrations';

export class Migration20210917070243 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "currency" ("id" serial primary key, "country" varchar(255) not null, "value" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');
  }

}
