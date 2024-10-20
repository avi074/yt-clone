import videoCategoryModel from "../models/videoCategory.model.js"
import { fetchVideoCategories } from "../services/youtubeApi.js"
import main from "./main.js"

/**
 * Update assignable categories in the database
 *  - assinable category = which can be used as video upload category type
 * @param {Array<Object>} categories videoCategories array
 */
const updateCategoriesInDB = async (categories) => {
  for (const category of categories) {
    if (category.snippet.assignable) {
      await videoCategoryModel.updateOne(
        { ytId: category.id },
        {
          $set: {
            title: category.snippet.title,
          },
        },
        { upsert: true }, // Create if it doesn't exist
      )
    }
  }
}

main("videoCategories", fetchVideoCategories, updateCategoriesInDB)
