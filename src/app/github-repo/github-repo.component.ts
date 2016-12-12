import { Component, Input } from '@angular/core';

import Repo from '../Models/Repo';

@Component({
    selector: 'github-repo',
    templateUrl: 'github-repo.component.html',
    styleUrls: ['github-repo.component.css']

})
export class GitHubRepoComponent {
    private _repos: Repo[];

    @Input()
    set repos(repos: Repo[]) {
        this._repos = repos;
    }

    get repos(): Repo[] {
        return this._repos;
    }
}