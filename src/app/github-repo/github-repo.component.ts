import { Component, Input } from '@angular/core';

import { Repo } from '../Models/Repo';

@Component({
    selector: 'app-github-repo',
    templateUrl: 'github-repo.component.html',
    styleUrls: ['github-repo.component.css']

})

/**
 * Displays the current array of public repositories from the AppComponent.
 */
export class GitHubRepoComponent {
    private _repos: Array<Repo>;

    @Input()
    set repos(repos: Array<Repo>) {
        this._repos = repos;
    }

    get repos(): Array<Repo> {
        return this._repos;
    }
}
