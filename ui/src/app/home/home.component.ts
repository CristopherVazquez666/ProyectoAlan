import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import Swal from 'sweetalert2';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  public categories:Array<any> = [];
  public codeToSearch = 'all';
  public admin : boolean = false;
  public total:number = 0;
  public candiesAdded:any = [];
  public candies:any = [];
  public query:any = {
    orderby: '-1',
    textSearch: '',
    categorie:''
  }
  public user:any = {logged:false};

  constructor(private _home: HomeService, private _cd: ChangeDetectorRef,) { }

  ngOnInit() {
    this.getCandies();
    this.getCategories();
    this.getUser();
  }

  orderby(e:any){
    if(e.target.value != ""){
      this.query.orderby = e.target.value;
    }
  }
  OnChangeText(e:any){
    this.query.textSearch = e.target.value;
  }

  getUser(){
    this._home.getUser().subscribe((res:any)=>{
      console.log("Respuesta del usuario",res)
      if(res.data){
        this.user = res.data;
      }
    })
  }

  changeCategorie(categorie:string){
    this.query.categorie = categorie;
    this.getCandies()
  }
  getCandies = () =>{
    Swal.fire('Cargando...','Un momento por favor');
    Swal.showLoading();
    this._home.getCandies(this.query).subscribe((res:any)=>{
      this.candies = res.map((item:any)=>{
        item['quantity'] = 0; 
        return item
      })
      Swal.close();
    })
  }

  emptyCart = () => {
    this.candiesAdded = [];
    this.total = 0;
    for(const candy of this.candies){
      candy.quantity = 0;
    }
  }

  AddToShoppingCart = (candy:any)=>{
    const index = this.candiesAdded.map((item:any)=>{
      return item._id.toString();
    }).indexOf(candy._id);

    if(candy.quantity > 0){
      if(index > -1){
        this.candiesAdded.splice(index,1);
        this.candiesAdded.push(candy);
      }else{
        this.candiesAdded.push(candy);
      }
    }else{
      this.candiesAdded.splice(index,1);
    }
    this.updatetotal();
  }

  getCategories(){
    this._home.getCategories().subscribe((res:any)=>{
      res.unshift(
        {name_cat: "Inicio", _id:''},
      )
      this.categories = res;
    })
  }
  
  changeRole(){
    this.query = {
      orderby: '-1',
      textSearch: '',
      categorie:''
    }
    this.admin = !this.admin;
    this._cd.detectChanges ();
  }

  updateQuantity(candy:any,quantity:number){
    if(candy.quantity>0){
      if(quantity >0){
        candy.quantity = quantity;
        this.AddToShoppingCart(candy);
      }else{
        candy.quantity = 0;
        this.AddToShoppingCart(candy);
      }
    }else{
      candy.quantity = quantity;
      this.AddToShoppingCart(candy);
    }
  }

  updatetotal(){
    if(this.candiesAdded.length > 0){
      let total = 0;
      for(const candy of this.candiesAdded){
        total =  total + (candy.quantity * candy.price)
      }
      this.total = total;
    }else{
      this.total = 0
    }
  }

  
}