import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import Activity from './Models/Activity';
import Repo from './Models/Repo';
import User from './Models/User';

import { isValidActivityType, mapToDto } from './data-helpers/dtos/github-activity.dto';

@Injectable()
export class AppGitHubService {
    private repoByUsernameUrl = 'https://api.github.com/users/';
    private userActivitiesUrl = 'https://api.github.com/users/';
    private userProfileUrl = 'https://api.github.com/users/';

    constructor(private http: Http) { }

    getActivities(username: string): Observable<Activity[]> {
        return this.http.get(this.userActivitiesUrl + username + '/events/public?per_page=3')
            .map((res: Response) => {
                console.log('Observable Response res.json():', res.json())
                return this.mapPropsToActivityModel(res);
            })
            .catch((error: any) => {
                return Observable.throw(error)
            })
    } 

/*
    getActivities(username: string): Promise<Activity[]> {
        return this.http.get(this.userActivitiesUrl + username + '/events/public?per_page=3')
            .toPromise()
            .then(resource => {
                return this.mapPropsToActivityModel(resource);
            })
            .catch(this.handleError);
    } 
    */
    
    getRepos(user: string): Promise<Repo[]> {
        return this.http.get( this.repoByUsernameUrl + user + '/repos?per_page=9')
            .toPromise()
            .then(response => {
                return this.mapPropsToRepoModel( response );
            })
            .catch(this.handleError);
    }

    getUser(username: string) : Promise<User> {
        return this.http.get(this.userProfileUrl + username)
            .toPromise()
            .then(response => {
                return this.mapPropsToUserModel(response);
            
            })
            .catch(this.handleError);
    }
    
    private mapPropsToActivityModel(resource): Activity {
        const results = resource.json();
        
        const filteredResults = results.filter( res => {
            return isValidActivityType(res.type);
        })
        
        return filteredResults.map(event => {
            return mapToDto(event);
        });
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

    private mapPropsToUserModel(jsonResponse): User {
        let result = jsonResponse.json();
        return {
            bio: result.bio,
            profileUrl: result.html_url,
            thumbnail: result.avatar_url,
            username: result.login
        }
    }

    private handleError(error: any): any {
        console.error('An error has occured <GitHubRepoService>', error);
        return (error.message || error);
    }
}
