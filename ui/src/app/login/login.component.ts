
import { ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import Swal from 'sweetalert2';


@Component({
	selector: 'kt-login',
	templateUrl: './login.component.html', 
	encapsulation: ViewEncapsulation.None
})
export class LoginComponent{

	loginForm: object | undefined;

	constructor(
		private router: Router,
		private service: LoginService,
		private cdr: ChangeDetectorRef
	) { }

	ngOnInit() {

	}

	signIn() {
		//Here must be the petition
	}
}
