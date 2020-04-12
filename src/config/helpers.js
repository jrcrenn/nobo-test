import { months } from "./consts";
import { red, lightGreen, yellow } from "@material-ui/core/colors";

export function formatPremieredDate(premieredDate, yearOnly) {
  const date = premieredDate
    .split("-")
    .map((item, index) => (index === 1 ? parseInt(item) - 1 : item));
  const [year, month, day] = date;
  return yearOnly ? year : months[month] + " " + day + ", " + year;
}

export function scoreToColor(score) {
  return score >= 15
    ? yellow[100 * (10 - (20 - score))]
    : score < 10
    ? red[100 * (10 - score)]
    : lightGreen[100 * (8 - (15 - score))];
}
