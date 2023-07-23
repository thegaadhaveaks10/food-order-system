import { Component, OnInit } from '@angular/core';
import { FoodService } from 'src/app/food.service';
import { Tag } from 'src/app/shared/model/tag';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {
  tags: Tag[];

  constructor(api: FoodService) {
    api.getAllTags().subscribe(serverTag => {
      this.tags = serverTag;
    })
  }

  ngOnInit(): void {
    
  }

}
