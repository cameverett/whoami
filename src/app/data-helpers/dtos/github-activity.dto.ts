/**
 * Data Transfer Objects
 * 
 * Provide a uniform way for the
 * view to receive data from a service
 * and display desired properties of an activity.
 */
export default class GitHubAcitivityDto {
    message: string;
    repoName: string;
    branch: string;
} 

export const ACTIVITY_TYPES = {
    PUSH: 'PushEvent',
    CREATE: 'CreateEvent'
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
    switch (response.type) {

        case ACTIVITY_TYPES.CREATE: {
            return {
                branch: response.payload.description,
                message: 'created ' + ( response.payload.ref || response.payload.ref_type),
                repoName: response.repo.name
            }
        }

        case ACTIVITY_TYPES.PUSH: {
            return {
                branch: response.payload.ref,
                message: response.payload.commits[0].message,
                repoName: response.repo.name
            }
        }

        default: {
            break;
        }
    }
}
