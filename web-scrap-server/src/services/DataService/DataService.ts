import { appDataSource } from "../../app-data-source";
import { Data } from "../../entity/data.entity";
import { DataSource } from "typeorm";
import ScraperService from "../ScraperService/ScraperService";
import { Storage } from "../../entity/storage.entity";

export default class DataService {
  private readonly dataSource: DataSource = null;
  constructor() {
    this.dataSource = appDataSource;
  }
  async add(name: string, url: string, selector: string, isNumber: boolean) {
    let isCorrect = false;
    const value = ScraperService({ url, selector, isNumber });
    if (value != undefined && this.dataSource != null) {
      await this.dataSource
        .createQueryBuilder()
        .insert()
        .into(Data)
        .values({
          url,
          name,
          selector,
          isNumber,
        })
        .execute()
        .then(() => {
          isCorrect = true;
        });
    }
    return isCorrect;
  }

  async remove(id: number) {
    let isCorrect = false;
    if (this.dataSource != null) {
      await this.dataSource
        .createQueryBuilder()
        .delete()
        .from(Data)
        .where("data.id = :id", { id })
        .execute()
        .then(() => {
          isCorrect = true;
        });
    }
    return isCorrect;
  }

  getStorageByData = async (idData: number) => {
    return this.dataSource.getRepository(Storage).findBy({ idData });
  };

  async getAll() {
    if (this.dataSource != null) {
      const dataArray = await this.dataSource
        .getRepository(Data)
        .createQueryBuilder("data")
        .getMany();

      if (Array.isArray(dataArray) && dataArray.length > 0) {
        return Promise.all(
          dataArray.map(async (data: Data) => {
            const storageArray = await this.getStorageByData(data.id);
            return {
              id: data.id,
              name: data.name,
              url: data.url,
              selector: data.selector,
              storageData: storageArray
                .filter((storage) => storage.idData === data.id)
                .map((storage) => {
                  return {
                    value: storage.value,
                    date: storage.date,
                  };
                }),
            };
          })
        );
      }
    }
    return [];
  }
}
