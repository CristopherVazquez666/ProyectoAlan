import { Component, OnInit } from '@angular/core';
import { CategorieService } from './categorie.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addCategorie',
  templateUrl: './addCategorie.component.html',
  styleUrls: ['./addCategorie.component.scss']
})
export class AddCategorieComponent implements OnInit {
  public categorieForm:any = {};

  constructor(private _categorie:CategorieService) { }

  ngOnInit() {
  }
  onSubmit() {
    Swal.fire(
      'Cargando....',
      'Espere un momento',
    )
    Swal.showLoading()
    this._categorie.addCategorie(this.categorieForm).subscribe((res:any)=>{
      Swal.fire(
        'Todo salio perfecto!',
        res.success,
        'success'
      )
    })
  }

  OnChange(e:any){
    this.categorieForm [e.target.name] = e.target.value;
  }
}
