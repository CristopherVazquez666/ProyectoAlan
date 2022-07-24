import { ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from './register.service';
import Swal from 'sweetalert2';

@Component({
	selector: 'kt-register',
	templateUrl: './register.component.html',
	encapsulation: ViewEncapsulation.None
})
export class RegisterComponent {
	registerForm:any = {};

	constructor(
		private router: Router,
		private service: RegisterService,
		private cdr: ChangeDetectorRef
	) { }

	ngOnInit() {

	}

	onChange(e:any){
		this.registerForm[e.target.name] = e.target.value;
	}

	submit() {
		if(!this.registerForm.full_name || !this.registerForm.email || !this.registerForm.username || !this.registerForm.password || !this.registerForm.confirmPassword){
			return Swal.fire('Error', 'Debe registrar todos los datos', 'error')
		}
		if(this.registerForm?.password !== this.registerForm?.confirmPassword){
			Swal.fire('Error', 'Las contraseñas deben coincidir', 'error');
			return;
		}
		delete this.registerForm.confirmPassword;
		Swal.fire('Guardando su informacion', 'Por favor espere');
		Swal.showLoading();
		this.service.singup(this.registerForm).subscribe((res:any)=>{
			if(res){
				Swal.close();
				window.location.href ='/login'
			}else{
				Swal.fire('Error', 'Algo salio mal, intente de nuevo por favor', 'error');
			}
		})
	}
}
