import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';

const cardKey = 'card_key'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public card: any = {};

  onSubmit(form: any) {
    console.log(form);
    console.log(this.card);
    this.salveList()
  }

  constructor(private storageService: LocalStorageService) {
  }

  salveList() {
    console.log(cardKey, this.card)
    this.storageService.set(cardKey, this.card)
  }

  ngOnInit(): void {
  }

}
