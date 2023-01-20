import {
  Get,
  Put,
  JsonController,
  Param,
  BodyParam,
  OnNull,
  Delete,
} from "routing-controllers";
import { Data } from "../entity/data.entity";
import { appDataSource } from "../app-data-source";
import DataService from "../services/DataService/DataService";

@JsonController("/data")
export class DataController {
  private dataService = new DataService();

  @Get("/get/:id")
  public async getProduct(@Param("id") id: number) {
    const user = await appDataSource.getRepository(Data).findOneBy({ id });
    return user || "not fount";
  }

  @Get("/all")
  public async getAllData() {
    return this.dataService.getAll();
  }

  @Delete("/")
  @OnNull(409)
  public async removeData(@BodyParam("id") id: number) {
    if (await this.dataService.remove(id)) {
      return "removed data";
    }
    return null;
  }
  @Put("/")
  @OnNull(409)
  public async initData(
    @BodyParam("name") name: string,
    @BodyParam("url") url: string,
    @BodyParam("selector") selector: string,
    @BodyParam("isNumber") isNumber: boolean
  ) {
    if (await this.dataService.add(name, url, selector, isNumber)) {
      return "added data";
    }
    return null;
  }
}
