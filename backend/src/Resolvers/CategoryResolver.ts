import { Category } from "../entities/category";
import { Query, Resolver } from "type-graphql";

@Resolver(Category)
export class CategoriesResolver {
  @Query(() => [Category])
  async AllCategories() {
    const categories= await Category.find({
        order: {
          id: "ASC"
        },
      })
    return categories;
  }}