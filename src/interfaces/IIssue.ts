export interface IJiraIssues {
    startAt: number,
    maxResults: number,
    total: number,
    issues: IIssue[]
}

export interface IIssue {
    id: string,
    key: string, // номер типа TMS-2121
    fields: {
        components: IComponent[]
        description: string;
        parent: {
            id: string,
            key: string,
        } | undefined,
        resolution: { // статус
            id: string,
            name: string,
            description: string
        } | null,
        status: {
            name: string
        }
        labels: string[],
        aggregatetimeoriginalestimate: number | undefined,
        issuelinks: any[],
        assignee: {
            name: string,
            emailAddress: string,
            displayName: string
        },
        reporter: {
            name: string,
            emailAddress: string,
            displayName: string
        },
        progress: {
            progress: number,
            total: number,
            persent: number
        },
        worklog: {
            maxResults: number,
            total: number,
            worklogs: {
                timeSpentSeconds: number
            }[],
        },
        issuetype: {
            id: string,
            description: string,
            name: string
        },
        timeoriginalestimate: number | undefined,
        timetracking: {
            originalEstimate: string,
            remainingEstimate: string,
            originalEstimateSeconds: number,
            remainingEstimateSeconds: number
        } | {},
        summary: string,
        aggregateprogress: {
            progress: 0,
            total: 10800,
            percent: 0,
        },
        customfield_13928: ITraib[],
        customfield_13927: ITeam[],
        customfield_14311: null | number //Effort
        customfield_14312: null | number //Impact
        customfield_14313: null | number //Confidence
        customfield_14305: null | number //ICE
        subtasks: ISubTask[]
    }
}

export interface IComponent {
    self: string,
    id: string,
    name: string
}

export interface ITraib {
    self: string,
    id: string,
    value: string
    disabled: boolean
}

export interface ITeam {
    self: string,
    id: string,
    value: string
    disabled: boolean
}

export interface ISubTask{
    self: string,
    id: string,
    key: string
}