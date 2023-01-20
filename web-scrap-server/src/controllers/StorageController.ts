import { Get, JsonController } from "routing-controllers";
import StorageService from "../services/StorageService/StorageService";

@JsonController("/storage")
export class StorageController {
  private storageService = new StorageService();

  @Get("/all")
  public async getAllStorage() {
    return this.storageService.getAll();
  }
}
