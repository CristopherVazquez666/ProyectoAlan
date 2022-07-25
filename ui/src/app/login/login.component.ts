
import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import Swal from 'sweetalert2';


@Component({
	selector: 'login',
	templateUrl: './login.component.html', 
})
export class LoginComponent{

	loginForm:any = {};

	constructor(
		private router: Router,
		private service: LoginService,
		private cdr: ChangeDetectorRef
	) { }

	ngOnInit() {

	}

	onChange(e:any){
		this.loginForm[e.target.name] = e.target.value;
	}

	signIn() {
		this.service.login(this.loginForm).subscribe(res=>{
			if(res){
				localStorage['token'] = res;
				window.location.href = "/";
			}else{
				Swal.fire("Algo salio mal","Por favor verifique su informacion","error");
			}
		})
	}
}
