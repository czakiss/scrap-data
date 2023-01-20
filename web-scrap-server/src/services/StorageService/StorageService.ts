import { appDataSource } from "../../app-data-source";
import { DataSource } from "typeorm";
import { Storage } from "../../entity/storage.entity";

export default class StorageService {
  private readonly dataSource: DataSource = null;
  constructor() {
    this.dataSource = appDataSource;
  }
  async add(idData: number, value: number, date: Date) {
    let isCorrect = false;
    if (this.dataSource != null) {
      await this.dataSource
        .createQueryBuilder()
        .insert()
        .into(Storage)
        .values({ idData, value, date })
        .execute()
        .then(() => {
          isCorrect = true;
        });
    }
    return isCorrect;
  }

  async removeOld(date: Date) {
    let isCorrect = false;
    if (this.dataSource != null) {
      await this.dataSource
        .createQueryBuilder()
        .delete()
        .from(Storage)
        .where("storage.date < :date", { date })
        .execute()
        .then(() => {
          isCorrect = true;
        });
    }
    return isCorrect;
  }

  async getAll() {
    if (this.dataSource != null) {
      return this.dataSource
        .getRepository(Storage)
        .createQueryBuilder("storage")
        .getMany();
    }
    return [];
  }
}
