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
    Object.keys(ACTIVITY_TYPES)
        .forEach(k => {
            if(ACTIVITY_TYPES[k] === type) {
                console.log('FOO');
                return true;
            }
        });
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
