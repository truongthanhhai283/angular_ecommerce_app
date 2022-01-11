import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Profile } from 'src/app/models/profile';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profile: Profile;
  modalRef: BsModalRef;

  constructor(
    private authService: AuthService,
    private modalService: BsModalService,
    private route: ActivatedRoute
  ) {
    if (route.snapshot.data.profile) {
      this.profile = route.snapshot.data.profile;
      this.updateObject.firstname = this.profile.firstname;
      this.updateObject.lastname = this.profile.lastname;
      this.updateObject.age = this.profile.age;
      this.updateObject.email = this.profile.email;
      this.updateObject.gender = this.profile.gender;
      this.updateObject.phone = this.profile.phone;
      this.updateObject.country = this.profile.country;
      this.updateObject.city = this.profile.city;
      this.updateObject.address = this.profile.address;
    }
  }

  updateObject = {
    firstname: null,
    lastname: null,
    email: null,
    gender: null,
    age: null,
    phone: null,
    country: null,
    city: null,
    address: null,
  };

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  hide(): void {
    this.modalRef.hide();
  }

  updateProfile() {
    this.authService.updateProfile(this.updateObject).subscribe((result) => {
      this.profile = result;
      this.authService.username = `${result.firstname} ${result.lastname}`;
    });
  }

  ngOnInit(): void {}
}
