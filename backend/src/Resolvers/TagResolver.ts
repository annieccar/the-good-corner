import { Tag } from "../entities/tag";

import { Query, Resolver } from "type-graphql";

@Resolver(Tag)
export class TagsResolver {
  @Query(() => [Tag])
  async AllTags() {
    const tags= await Tag.find({
        order: {
          id: "ASC"
        },
      })
    return tags;
  }}