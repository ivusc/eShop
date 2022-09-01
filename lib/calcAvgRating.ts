import { IRating } from "../interfaces";

export const calcAvgRating = (prodRating:Array<IRating>) => {
  let totalRating = 0;
  prodRating.forEach((item) => {
    totalRating += item.rating
  })
  return (totalRating/prodRating.length);
}