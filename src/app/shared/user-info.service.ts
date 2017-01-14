import { Injectable } from '@angular/core';
import { AppGitHubService } from './app-github.service';

import { Subject } from 'rxjs/Subject';

import { Activity, Repo, User } from '../Models/index';

@Injectable()
export class UserInfoService {
    private receivedActivitiesSource =  new Subject<Array<Activity>>();
    private receivedReposSource =  new Subject<Array<Repo>>();
    private receivedProfileSource =  new Subject<User>();

    activities$ = this.receivedActivitiesSource.asObservable();
    repos$ = this.receivedReposSource.asObservable();
    user$ = this.receivedProfileSource.asObservable();

    constructor(private _githubService: AppGitHubService) {
        this.loadNewUserInfo();
    }

    public loadNewUserInfo(username?: string): void {
        this._githubService.loadUserInfo(username || 'github')
            .subscribe(
                res => {
                    this.receivedActivitiesSource.next(res.activities);
                    this.receivedReposSource.next(res.repos);
                    this.receivedProfileSource.next(res.user);
                },
                err => console.log(err),
            );
    }

}