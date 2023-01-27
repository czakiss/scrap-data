import StorageService from "../StorageService/StorageService";
import DataService from "../DataService/DataService";
import ScraperService from "../ScraperService/ScraperService";
import * as console from "console";

const TIMER_DURATION = 10;
const CLEAN_TIME = 500;

const storageService = new StorageService();
const dataService = new DataService();
const scrapData = async () => {
  const dateNow = new Date();
  const cleanDate = new Date(dateNow.getTime() - CLEAN_TIME * 1000);
  console.log("Updating scrapers...");
  await storageService.removeOld(cleanDate);
  const dataArray: any[] = await dataService.getAll();
  for (const data of dataArray) {
    const { url, selector, isNumber } = data;
    const value = await ScraperService({ url, selector, isNumber });
    console.log(`Updating: ${data.name} - ${value}`);
    if (value != undefined) {
      const isCorrect = await storageService.add(data.id, value, new Date());
      if (!isCorrect) {
        console.log("Cannot get data");
      }
    }
  }
};
const TimerService = () => {
  setInterval(async () => {
    await scrapData();
  }, TIMER_DURATION * 1000);
};

export default TimerService;
