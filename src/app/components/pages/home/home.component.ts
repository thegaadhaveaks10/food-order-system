import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FoodService } from 'src/app/food.service';
import { Food } from 'src/app/shared/model/food';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  foods: Food[] = [];

  constructor(private api: FoodService,
    activatedRote: ActivatedRoute) {
      let foodsObservable: Observable<Food[]>;
      activatedRote.params.subscribe((params) =>  {
        if (params.searchTerm) {
          foodsObservable = api.getAllFoodBySearchTerm(params.searchTerm)
        } else if (params.tag) {
          foodsObservable = api.getAllFoodByTag(params.tag);
        } else {
          foodsObservable = api.getAll();
        }
        foodsObservable.subscribe((serverFoods) => {
          this.foods = serverFoods;
        });
      });
  }

  ngOnInit(): void {
    
  }

}
