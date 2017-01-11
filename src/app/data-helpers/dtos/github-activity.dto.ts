/**
 * Data Transfer Objects
 * 
 * Provide a uniform way for the
 * view to receive data from a service
 * and display desired properties of an activity.
 */
export interface GitHubActivityDto {
    branch: string;
    linkToActivity: string;
    message: string;
    repoName: string;
} 

// Activity types currently supported by the application.
export const ACTIVITY_TYPES = {
    CREATE: 'CreateEvent',
    COMMITCOMMENT: 'CommitCommentEvent',
    FORK: 'ForkEvent',
    ISSUE: 'IssuesEvent',
    PUSH: 'PushEvent',
    WATCH: 'WatchEvent'
}

/**
  * Check if the activity is in the ACTIVITY_TYPES object
  * If it is not do not display it.
  * @param {string} type - Name of an Activity object's type
  * @returns {boolean} - is the type found in ACTIVITY_TYPES
  */
export function isValidActivityType(type: string): boolean {
    const keys = Object.keys(ACTIVITY_TYPES)

    for(let i = 0; i < keys.length; i++) {
        if(ACTIVITY_TYPES[keys[i]] === type) {
            return true;
        }
    }

    return false;
}

/**
 * Return model according to the type property of response
 * Provides a common interface when displaying data in the view.
 * @param {any} response from http request
 * @returns {GitHubActivityDto} returns a valid GitHubActivityDto.
 */
export function mapToDto(response: any): GitHubActivityDto {
    const domain: string = 'https://github.com/';
    switch (response.type) {

        case ACTIVITY_TYPES.COMMITCOMMENT: {
            return {
                branch: '',
                linkToActivity: response.payload.comment.html_url,
                message: "Says, '" + response.payload.comment.body + "'",
                repoName: 'View the comment thread',
            }
        }

        case ACTIVITY_TYPES.CREATE: {
            return {
                branch: response.payload.description,
                linkToActivity: domain + response.repo.name,
                message: 'created ' + ( response.payload.ref || response.payload.ref_type),
                repoName: response.repo.name
            }
        }

        case ACTIVITY_TYPES.FORK: {
            return {
                branch: '',
                linkToActivity: response.payload.forkee.html_url,
                message: 'forked ' + response.repo.name,
                repoName: response.payload.forkee.full_name
            }
        }

        case ACTIVITY_TYPES.ISSUE: {
            console.log(response);
            return {
                branch: '',
                linkToActivity: response.payload.issue.html_url,
                message: response.payload.action + ' an issue.',
                repoName: response.payload.issue.title,
            }
        }

        case ACTIVITY_TYPES.PUSH: {
            return {
                branch: response.payload.ref,
                linkToActivity: domain + response.repo.name + '/commit/' + response.payload.commits[0].sha,
                message: response.payload.commits[0].message,
                repoName: response.repo.name
            }
        }

        case ACTIVITY_TYPES.WATCH: {
            return {
                branch: '',
                linkToActivity: domain + response.repo.name,
                message: response.actor.display_login + ' watched a repo.',
                repoName: response.repo.name
            }
        }

        default: {
            break;
        }
    }
}
