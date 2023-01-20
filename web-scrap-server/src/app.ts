import * as dotenv from "dotenv";
import { appDataSource } from "./app-data-source";
import { createExpressServer } from "routing-controllers";
import { DataController } from "./controllers/DataController";
import TimerService from "./services/TimerService/TimerService";
import { StorageController } from "./controllers/StorageController";

appDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });
dotenv.config();

const port = process.env.PORT;

const app = createExpressServer({
  controllers: [DataController, StorageController],
  cors: {
    origin: "*",
  },
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  TimerService();
});
