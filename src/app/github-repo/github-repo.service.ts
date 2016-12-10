import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import Repo from '../Models/Repo';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class GitHubRepoService {
    private repoByNameUrl = 'https://api.github.com/users/';

    constructor(private http: Http) { }

    getRepos(user: string): Promise<Repo[]> {
        return this.http.get( this.repoByNameUrl + user + '/repos?per_page=9')
            .toPromise()
            .then(response => {
                return this.mapPropsToRepoModel( response );
            })
            .catch(this.handleError);
    }

    private mapPropsToRepoModel(response): Repo {
        const repos = response.json();
        return repos.map(res => {
            return {
                description: res.description,
                name: res.name,
                primaryLanguage: res.language,
                url: res.url
            }
        })
    }

    private handleError(error: any): any {
        console.error('An error has occured <GitHubRepoService>', error);
        return (error.message || error);
    }
}