import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { CandyService } from './candy.service';
@Component({
  selector: 'app-addCandy',
  templateUrl: './addCandy.component.html',
  styleUrls: ['./addCandy.component.scss']
})
export class AddCandyComponent implements OnInit {
  public categories:any = []
  public images:any = [];
  candyForm:any = {};

  constructor(private _candy: CandyService) { }

  ngOnInit() {
    this.getCategories()
  }

  getCategories(){
    this._candy.getCategories().subscribe((res:any)=>{
      this.categories = res;
    })
  }

  onSubmit() {
    const data:any = new FormData();
    if(
      !this.candyForm.name_prod || 
      !this.candyForm.categorie || 
      !this.candyForm.price){ 
      Swal.fire(
        'Error',
        'Es necesario llenar todos los campos',
        'error'
      )
      return false;
    }
    if(this.images.length <= 0){ 
      Swal.fire(
        'Error',
        'Es necesario subir una imagen',
        'error'
      )
      return false;
    }
    for(let key in this.candyForm) {
      data.append(key, this.candyForm[key] )
    }
    for(let file of this.images){
      data.append('image', file)
    }
    Swal.fire(
      'Cargando...',
      'Guardando dulce'
    )
    Swal.showLoading()
    this._candy.addCandy(data).subscribe((res:any)=>{
      Swal.fire(
        'Todo salio perfecto!',
        res.success,
        'success'
      )
      window.location.reload();
    })
  }

  OnChange(e:any){
    this.candyForm [e.target.name] = e.target.value;
    console.log(this.candyForm);
  }
  addImage(e:any){
    const file = e.target.files[0];
    this.images.push(file);
  }
}
