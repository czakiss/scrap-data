import scrapeIt from "scrape-it";
import { convertToNumber } from "./utils/ScraperServiceUtils";
import * as console from "console";

interface ScraperProps {
  url: string;
  selector: string;
  isNumber: boolean;
}
const ScraperService: (
  props: ScraperProps
) => Promise<number | undefined> = async (props) => {
  const { url, selector, isNumber = true } = props;
  let value = null;
  try {
    await scrapeIt(url, {
      value: {
        selector,
        convert: (v) => convertToNumber(v),
      },
    }).then(({ data }) => {
      // @ts-ignore
      value = data.value;
    });
  } catch (_e) {
    console.log(_e);
  }

  return value;
};

export default ScraperService;
