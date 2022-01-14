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

  public cardList: any = [];

  onSubmit(form: any) {
    console.log(form);
    console.log(this.card);
    this.addItem(this.card);
  }

  constructor(private storageService: LocalStorageService) {
  }

  salveList() {
    console.log(cardKey, this.cardList)
    this.storageService.set(cardKey, this.cardList)
  }


  addItem(item: object) {
    this.cardList.push(item);
    console.log(this.cardList)
    this.salveList()
    this.clearForm()
  }

  clearForm() {
    console.log(this.card.id)
    this.card.id = '',
    this.card.nome = '',
    this.card.descricao = '',
    this.card.ataque = '',
    this.card.defesa = '',
    this.card.tipo = '',
    this.card.classe = ''
  }

  ngOnInit(): void {
  }

}
