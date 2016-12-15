/**
 * Data Transfer Objects
 * 
 * Provide a uniform way for the
 * view to receive data from a service
 * and display desired properties of an activity.
 */
export default class GitHubAcitivityDto {
    branch: string;
    linkToActivity: string;
    message: string;
    repoName: string;
} 

export const ACTIVITY_TYPES = {
    CREATE: 'CreateEvent',
    COMMITCOMMENT: 'CommitCommentEvent',
    FORK: 'ForkEvent',
    PUSH: 'PushEvent'
}

export function isValidActivityType(type): boolean {
    const keys = Object.keys(ACTIVITY_TYPES)

    for(let i = 0; i < keys.length; i++) {
        if(ACTIVITY_TYPES[keys[i]] === type) {
            return true;
        }
    }

    return false;
}

export function mapToDto(response): GitHubAcitivityDto {
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
                linkToActivity: response.payload.html_url,
                message: 'forked ' + response.repo.name,
                repoName: response.payload.forkee.full_name
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

        default: {
            break;
        }
    }
}
