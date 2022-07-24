import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CandyService } from './candy.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listCandy',
  templateUrl: './listCandy.component.html',
  styleUrls: ['./listCandy.component.scss']
})
export class ListCandyComponent implements OnInit {
  public candies:any =  []
  constructor(private _candy: CandyService, private _cd : ChangeDetectorRef) { }

  ngOnInit() {
    this.getCandies()
  }

  getCandies(){
    Swal.fire("Cargando...","Cargando dulces");
    Swal.showLoading();
    this._candy.getCandies().subscribe((res:any)=>{
      this.candies = res;
      Swal.close();
    })
  }

  async deleteCandy(id:any){
    Swal.fire({
      title: '¿Desea eliminar el dulce?',
      showDenyButton: true,
      confirmButtonText: 'Si, eliminar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Se elimino el dulce satisfactoriamente!', '', 'success')
        this._cd.detectChanges();
      }
    })
  }

}
