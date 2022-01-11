import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { AlertService } from 'src/app/services/alert/alert.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  authCredentialsDto: FormGroup;
  showPass = false;
  modalRef: BsModalRef;
  @ViewChild('invalidCredentials', { static: false })
  invalidCredentialsTemp: TemplateRef<any>;

  constructor(
    private authService: AuthService,
    private router: Router,
    private cartService: CartService,
    private fb: FormBuilder,
    private alertService: AlertService,
    private modalService: BsModalService
  ) {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
  }

  ngOnInit(): void {
    this.authCredentialsDto = this.fb.group({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  userLogin() {
    // this.authService.login(this.authCredentialsDto.value).subscribe(
    //   (res) => {
    //     localStorage.setItem('token', res.accessToken);
    //     this.authService.prepareUserData();
    //     this.authService.getCurrentUser().subscribe((resUser) => {
    //       this.authService.getCurrentUser = resUser;
    //     });
    //     this.router.navigate(['/home']);
    //   },
    //   (error) => {
    //     this.alertService.error(error);
    //     this.modalService.show(this.invalidCredentialsTemp);
    //   }
    // );
    this.router.navigate(['/profile']);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  hide() {
    this.modalRef.hide();
  }
}
