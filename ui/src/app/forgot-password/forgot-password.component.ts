import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ForgotPasswordService } from './forgot-password.service';

@Component({
	selector: 'forgot-password',
	templateUrl: './forgot-password.component.html',
})
export class ForgotPasswordComponent{
	// Public params
	forgotPasswordForm: object | undefined;

	constructor(
		private router: Router,
		private service: ForgotPasswordService,
		private cdr: ChangeDetectorRef
	) { }

	ngOnInit() {

	}

	submit() {
		//Here must be the petition
	}
}
