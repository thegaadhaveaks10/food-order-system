import { Injectable } from '@angular/core';
import { Food } from './shared/model/food';
import { sample_foods, sample_tags } from 'src/data';
import { Tag } from './shared/model/tag';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FOODS_BY_ID_URL, FOODS_BY_SEARCH_URL, FOODS_BY_TAG_URL, FOODS_TAGS__URL, FOODS_URL } from './shared/constants/url';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private httpClient: HttpClient) { }
  
/**
 * The getAll function returns an array of Food objects.
 * @returns The getAll() function is returning an array of Food objects.
 */
  getAll(): Observable<Food[]>{
    return this.httpClient.get<Food[]>(FOODS_URL);
  }

 
/**
 * The function filters a list of food items based on a search term and returns the matching items.
 * @param {string} searchTerm - A string representing the term to search for in the food names.
 * @returns an array of food items that match the search term.
 */
  getAllFoodBySearchTerm(searchTerm: string) {
    return this.httpClient.get<Food[]>(FOODS_BY_SEARCH_URL + searchTerm)
  }

  
 /**
  * The function getAllTags returns an array of Tag objects.
  * @returns The function `getAllTags()` is returning an array of `Tag` objects.
  */
  getAllTags(): Observable<Tag[]> {
    return this.httpClient.get<Tag[]>(FOODS_TAGS__URL);
  }

  
/**
 * The function `getAllFoodByTag` returns all food items if the tag is 'All', otherwise it filters the
 * food items based on the given tag.
 * @param {string} tag - A string representing the tag of the food.
 * @returns an array of Food objects.
 */
  getAllFoodByTag(tag: string): Observable<Food[]> {
    return tag === 'All' ? this.getAll() : 
    this.httpClient.get<Food[]>(FOODS_BY_TAG_URL + tag);
  }

  /**
   * Get food by id
   */
  getFoodById(foodId: string): Observable<Food> {
    return this.httpClient.get<Food>(FOODS_BY_ID_URL + foodId);
  }
}
