import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import Repo from './Models/Repo';

@Injectable()
export class AppService {
    private repoByUsernameUrl = 'https://api.github.com/users/';

    constructor(private http: Http) { }

    getRepos(user: string): Promise<Repo[]> {
        return this.http.get( this.repoByUsernameUrl + user + '/repos?per_page=9')
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
                url: res.html_url
            }
        })
    }

    private handleError(error: any): any {
        console.error('An error has occured <GitHubRepoService>', error);
        return (error.message || error);
    }
}