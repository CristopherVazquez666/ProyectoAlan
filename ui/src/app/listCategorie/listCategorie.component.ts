import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { CategorieService } from './categorie.service';

@Component({
  selector: 'app-listCategorie',
  templateUrl: './listCategorie.component.html',
  styleUrls: ['./listCategorie.component.scss']
})
export class ListCategorieComponent implements OnInit {

  public categories:any =  []
  constructor(private _categorie: CategorieService, private _cd : ChangeDetectorRef) { }

  ngOnInit() {
    this.getCategories()
  }

  getCategories(){
    Swal.fire("Cargando...","Cargando categorias");
    Swal.showLoading();
    this._categorie.getCategories().subscribe((res:any)=>{
      this.categories = res;
      Swal.close();
    })
  }

  async deleteCategorie(id:any){
    Swal.fire({
      title: '¿Desea eliminar la categoria?',
      showDenyButton: true,
      confirmButtonText: 'Si, eliminar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Eliminando categoria", '');
        Swal.showLoading();
        this._categorie.deleteCategories(id).subscribe((res:any)=>{
          if(res.status == 400){
            Swal.fire('Error', res.error, 'error')
          }
          Swal.fire('Se elimino la categoria satisfactoriamente!', '', 'success')
          this.getCategories();
        })
      }
    })
  }

}
