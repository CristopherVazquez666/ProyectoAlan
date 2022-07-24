import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router'
import { CategorieService } from './categorie.service';

@Component({
  selector: 'app-editCategorie',
  templateUrl: './editCategorie.component.html',
  styleUrls: ['./editCategorie.component.scss']
})
export class EditCategorieComponent implements OnInit {
  public categorieForm:any = {};
  public id:any = '';
  constructor(private _categorie : CategorieService, private r:Router, private ac:ActivatedRoute) {
    const $self = this;
    this.ac.params.forEach(function(param:any){
      $self.id = param['id'];
     });
   }

  ngOnInit() {
    Swal.fire(
      'Cargando categoria...',
      'Espere un momento',
    )
    Swal.showLoading()
    this._categorie.getCategorie(this.id).subscribe((res:any)=>{
      this.categorieForm = res;
      Swal.close()
    })
  }

  onSubmit() {
    Swal.fire(
      'Cargando....',
      'Espere un momento',
    )
    Swal.showLoading()
    this._categorie.updateCategorie(this.categorieForm, this.id).subscribe((res:any)=>{
      Swal.fire(
        'Todo salio perfecto!',
        res.success,
        'success'
      )
      window.location.href='/listcategories'
    })
  }

  OnChange(e:any){
    this.categorieForm [e.target.name] = e.target.value;
  }
}
