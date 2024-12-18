import { validate } from "class-validator";
import { Ad } from "../entities/ad";
import { Arg, Mutation, Query, Resolver} from "type-graphql";
import { AdInput, AdInputWithId } from "../Inputs/AdInputType";
import { Picture } from "../entities/picture";
import { Tag } from "../entities/tag";
import { Like } from "typeorm";

@Resolver(Ad)
export class AdResolver {
  @Query(() => [Ad])
  async AllAds() {
    const ads= await Ad.find({
        order: {
          id: "ASC"
        },
      })
    return ads;
  }

  @Query(() => [Ad])
  async AllAdsByKeyword(@Arg("keyword") keyword: string) {
    const ads= await Ad.find({
        order: {
          id: "ASC"
        },
        where: {
          title: Like(`%${keyword}%`),
        }
      })
    return ads;
  }

  @Query(() => [Ad])
  async AllAdsByCategory(@Arg("category") categoryId: number) {
    const ads= await Ad.find({
        order: {
          id: "ASC"
        },
        where: {
          category: {
            id: categoryId
          },
        }
      })
    return ads;
  }

  @Query(() => Ad)
  async getAdById(@Arg("id") id: number) {
    const ad = await Ad.findOneByOrFail({
          id: id,
      })
     return ad
  }

  @Mutation(() => Ad)
  async addAd(@Arg("data") { title, description, owner, price, location, category, pictures, tags }: AdInput) {

    const picturesArray: Picture[] = [];
    pictures?.forEach((el : string)=>{
    const newPicture = new Picture();
    newPicture.url = el;
    picturesArray.push(newPicture)
  })

  let tagsObject:Tag[] = []
  if(!!tags && tags.length >0) {tagsObject = await Promise.all(tags.map((tag) => {return Tag.findOneByOrFail({
    id: tag,
    }) }))}  
  

    const ad = new Ad(); 
    ad.title = title;
    ad.description = description;
    ad.owner = owner;
    ad.price = price;
    ad.location = location;
    ad.createdAt = new Date();
    ad.category= category ;
    if(picturesArray.length > 0){
      ad.pictures = picturesArray
    }
    if(!!tags){
      ad.tags = tagsObject
    }
    
  
    const errors = await validate(ad);
  
    if (errors.length > 0) {
      console.log(errors);
    
     return("Invalid input");
    } else {
      try{
        const result = await ad.save();
        const adWithCategory = await Ad.findOneByOrFail({id: result.id})
        return adWithCategory
      }catch (err) {
        console.log("err", err);
        return (JSON.stringify(err));
      }
    }
  }

  @Mutation(() => String)
  async editAd(@Arg("data") { id, title, description, owner, price, location, category, pictures, tags }: AdInputWithId) {
  
    const picturesArray: Picture[] = [];
    pictures?.forEach((el : string)=>{
    const newPicture = new Picture();
    newPicture.url = el;
    picturesArray.push(newPicture)
  })

  let tagsObject:Tag[] = []
  if(!!tags && tags.length >0) {tagsObject = await Promise.all(tags.map((tag) => {return Tag.findOneByOrFail({
    id: tag,
    }) }))}  
  
    const adToUpdate = await Ad.findOneByOrFail({
      id: id,
  })

  const updatedAd = Object.assign(adToUpdate, { id, title, description, owner, price, location, category  } );
  if(picturesArray.length > 0){
    updatedAd.pictures = picturesArray
  }
  if(!!tags){
    updatedAd.tags = tagsObject
  }
  const result = await updatedAd.save()
    if (result){return("ad has been updated")}
    else return ("Failed updating datas") 
  }

  @Mutation(() => String)
  async deteteAd(@Arg("id") id: number){
    const result = await Ad.delete(id)
    console.log("result", result.affected);
    if (result.affected === 1) {
      return "Ad has been deleted";
    } else {
      throw new Error("Ad has not been found");
    }
  }
}