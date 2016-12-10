import { Component, OnInit } from '@angular/core';

import { UserProfileService } from './user-profile.service';

import User from '../Models/User';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: User;
  hasLoaded: boolean = false;

  constructor(private userService: UserProfileService) { }
  ngOnInit() {
    this.getUser('cameverett');
  }

  getUser(username: string): void {
    this.userService.getUser(username)
      .then(user => { 
        //console.log(user);
        this.user = user;
        this.hasLoaded = true;
      });
  }
}
