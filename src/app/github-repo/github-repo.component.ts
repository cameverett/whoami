/*
import { Component, OnInit } from '@angular/core';
import { GitHubRepoService } from './github-repo.service';
*/

import { Component } from '@angular/core';

import Repo from '../Models/Repo';

@Component({
    selector: 'github-repo',
    templateUrl: 'github-repo.component.html',
    styleUrls: ['github-repo.component.css']

})
export class GitHubRepoComponent /*implements OnInit*/ {
    private repos: Repo[];

/*
    constructor(private repoService: GitHubRepoService) { }

    ngOnInit() {
        this.getRepositories('cameverett');
    }

    private getRepositories(username: string): void {
        this.repoService.getRepos(username).then(repoCollection => {
            this.repos = repoCollection;
        });
    }
*/

}