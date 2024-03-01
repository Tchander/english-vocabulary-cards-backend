import { Card } from "@entities/cards/card.entity";
import { Category } from "@entities/category/category.entity";

export type UserData = {
  id: number
  login: string;
  password: string;
  categories?: Category[];
  cards?: Card[];
};
