import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

const cardKey = 'card_key'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'HearthStone';

  constructor(private storageService: LocalStorageService) {}  
  

  public card: any = {};
  public tipos: any = '';
  public classes: any = '';

  public cardList: any = [];
  public cardsList: any = [];

  public getCards: any = [];
  public cardFiltered: any = [];

  public inputName: any = '';

  ngOnInit() {
    this.changeInputName()

    this.tipos = 'Escolha um abaixo';
    this.classes= 'Escolha uma abaixo';
    this.card.tipo = 'Escolha um abaixo';
    this.card.classe = 'Escolha uma abaixo';
  }

  onSubmit(form: any) {
    this.addItem(this.card);
  }

  onUpdate(form: any) {
    this.updateItem(this.getCards, this.card)
  }

  edit(items: any) {
    this.card.id = items.id,
    this.card.nome = items.nome,
    this.card.descricao = items.descricao,
    this.card.ataque = items.ataque,
    this.card.defesa = items.defesa,
    this.card.tipo = items.tipo,
    this.card.classe = items.classe
  }

  addItem(item: object) {
    this.getCards.push(item);
    this.salveList()
    this.clearForm()
    this.changeInputName()
  }

  salveList() {
    this.storageService.set(cardKey, this.getCards)
    this.getItem()
  }

  getItem() {
    this.cardsList = this.storageService.get(cardKey)
    this.getCards = JSON.parse(this.cardsList)
  }

  updateItem(item: any, changes: any) {
    for (let obj in this.getCards) {
      if (this.getCards[obj].id === changes.id) {
        this.getCards[obj] = {...changes };
      }
    }
    this.changeInputName()
    this.storageService.set(cardKey, this.getCards);
  }

  deleteItem(item: string) {
    this.cardFiltered.forEach((element: any) => {

      if(element.id === item) {
        return this.cardFiltered.splice(this.cardFiltered.indexOf(element.id), 1);
      } else {
        return element.id
      }
    });
  }

  clearForm() {
    this.card.id = '',
    this.card.nome = '',
    this.card.descricao = '',
    this.card.ataque = '',
    this.card.defesa = '',
    this.card.tipo = '',
    this.card.classe = ''
  }

  changeInputName() {
    if(this.inputName) {
      this.cardFiltered = this.getCards.filter((it: any) => {
        return it.nome.includes(this.inputName)
      })
    } else {
      this.cardFiltered = this.getCards
    }
  }

  changeSelectType(){
    if(this.tipos) {
      this.cardFiltered = this.getCards.filter((it: any) => {
        return it.tipo === this.tipos || this.tipos === 'Escolha um abaixo'
      })
    } else {
      this.cardFiltered = this.getCards
    }
  }

  changeSelectClass(){
    if(this.classes) {
      this.cardFiltered = this.getCards.filter((it: any) => {
        return it.classe === this.classes || this.classes === 'Escolha uma abaixo'
      })
    } else {
      this.cardFiltered = this.getCards
    }
  }
}
