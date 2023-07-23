import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodService } from 'src/app/food.service';
import { CartService } from 'src/app/services/cart.service';
import { Food } from 'src/app/shared/model/food';

@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrls: ['./food-page.component.scss']
})
export class FoodPageComponent implements OnInit {
  food: Food;

  constructor(activatedRoute: ActivatedRoute,
    private api: FoodService, private cartService:CartService, 
    private router: Router) {
      activatedRoute.params.subscribe((params) => {
        if (params.id) {
          api.getFoodById(params.id).subscribe(serverFood => {
            this.food = serverFood;
          });
        } 
      });
    }
    
  ngOnInit(): void {
  }

  addToCart(){
    this.cartService.addToCart(this.food);
    this.router.navigateByUrl('/cart-page');
  }

}
