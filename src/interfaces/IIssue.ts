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
        customfield_14311: null | customJiraField //Effort
        customfield_14312: null | customJiraField //Impact
        customfield_14313: null | customJiraField //Confidence
        customfield_14305: null | customJiraField //ICE
        subtasks: ISubTask[],
        subEpics: IIssue[] | null,
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

export interface customJiraField {
    disabled: boolean,
    id: string,
    self: string,
    value: string
}

export interface IMetaInformation {
    fields:{
        customfield_13927: { //Команды
            allowedValues: customJiraField[]
        }
    }
}