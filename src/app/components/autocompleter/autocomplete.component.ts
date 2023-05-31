import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-complete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutoComponent implements OnInit {
  @Input() categories: Category[] | undefined
  public categoryControl = new FormControl();

  constructor() { }

  ngOnInit(): void {
  }

}
