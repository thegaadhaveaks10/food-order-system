import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isSubmitted = false;
  returnUrl = '';

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required]
    });
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;
  }

 /**
  * The function returns the controls of a login form.
  * @returns The `formControls` method is returning the controls of the `loginForm`.
  */
  get formControls() {
    return this.loginForm.controls;
  }

/**
 * The submit function sets a flag to indicate that the form has been submitted, checks if the form is
 * invalid, and displays an alert with the email and password values.
 * @returns If the login form is invalid, the function will return and no further code will be
 * executed. If the login form is valid, an alert will be displayed with the email and password values
 * from the form.
 */
  submit() {
    this.isSubmitted = true;
    if (this.loginForm.invalid) return;

    // alert(`Email: ${this.formControls.email.value}.
    // Password: ${this.formControls.password.value}`);
    this.userService.login({ email: this.formControls.email.value, 
      password: this.formControls.password.value }).subscribe(() => {
        this.router.navigateByUrl(this.returnUrl);
      })
  }

}
