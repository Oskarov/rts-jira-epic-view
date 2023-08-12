import React                     from 'react';
import {customJiraField, IIssue} from "../../../../interfaces/IIssue";

interface MainTableProps {
    data: IIssue[];
    allTeams: customJiraField[];
}

interface ITeamTime {
    [key: string]: number
}

const MainTable: React.FC<MainTableProps> = ({data, allTeams}) => {
    return <div className="table_holder">
        <table>
            <thead>
            <tr>
                <th className="th_small">Квартал</th>
                <th className="th_medium">Инициатива</th>
                <th className="th_medium">Ссылка на задачу в Jira</th>
                <th className="th_medium">DoD (конкретный перечень результатов после выполнения инициативы)</th>
                <th className="th_small">Команда</th>
                <th className="th_small">Лид трайб</th>
                <th className="th_small">Impact</th>
                <th className="th_small">Confidence</th>
                <th className="th_small">Effort</th>
                <th className="th_small">ICE</th>
                <th className="th_small">Владелец инициативы</th>
                <th className="th_small">Labels</th>
                <th className="th_medium">Согласовано со смежными подразделениями (DoD: есть подтверждение по плану на
                    квартал и оценка) -
                    смежные команды подразделения указаны справа
                </th>
                <th className="th_small">Кол-во вложенных эпиков</th>
                <th className="th_small">Всего ч/недель на инициативу</th>
                {allTeams.map(team => <th className="th_small" key={team.id}>{team.value}</th>)}
            </tr>
            </thead>
            <tbody>
            {data.length && data.map(issue => {

                const teamTime: ITeamTime = {};
                issue.fields.subEpics?.forEach(subEpic => {
                    if (subEpic.fields.customfield_13927 && subEpic.fields.aggregatetimeoriginalestimate) {
                        subEpic.fields.customfield_13927.forEach(team => {
                            if (teamTime.hasOwnProperty(team.id)) {
                                teamTime[team.id] = teamTime[team.id] + (subEpic.fields.aggregatetimeoriginalestimate || 0)
                            } else {
                                teamTime[team.id] = subEpic.fields.aggregatetimeoriginalestimate || 0
                            }
                        })
                    }
                });

                console.log(teamTime)


                return <tr key={issue.key}>
                    <td className="th_small">{issue.fields.components.map(component => <div key={component.id}>
                        {component.name}
                    </div>)}</td>
                    <td className="th_medium">{issue.fields.summary}</td>
                    <td className="th_medium"><a href={`https://jira.eapteka.ru/browse/${issue.key}`}
                                                 target='_blank'>https://jira.eapteka.ru/browse/${issue.key}</a></td>
                    <td>{issue.fields.description}</td>
                    <td>{issue.fields.customfield_13927 && issue.fields.customfield_13927.map(component => <div
                        key={component.id}>
                        {component.value}
                    </div>)}</td>
                    <td>{issue.fields.customfield_13928 && issue.fields.customfield_13928.map(component => <div
                        key={component.id}>
                        {component.value}
                    </div>)}</td>
                    <td>{issue.fields.customfield_14312 ? issue.fields.customfield_14312.value : ''}</td>
                    <td>{issue.fields.customfield_14313 ? issue.fields.customfield_14313.value : ''}</td>
                    <td>{issue.fields.customfield_14311 ? issue.fields.customfield_14311.value : ''}</td>
                    <td className="th_small">{issue.fields.customfield_14305 ? issue.fields.customfield_14305.value : ''}</td>
                    <td className="th_small">Владелец инициативы</td>
                    <td className="th_small">{issue.fields.labels.filter(label => ['techdebt', 'product', 'tech-debt'].includes(label.toLowerCase())).map(label =>
                        <div key={`${issue.key}-${label}`}>
                            {label.toLowerCase()}
                        </div>)}</td>
                    <td className="th_medium">Согласовано со смежными подразделениями (DoD: есть подтверждение по плану
                        на квартал и оценка) -
                        смежные команды подразделения указаны справа
                    </td>
                    <td className="th_small">{issue.fields.subEpics ? issue.fields.subEpics.length : 0}</td>
                    <td className="th_small">{!issue.fields.aggregatetimeoriginalestimate ? 0 : issue.fields.aggregatetimeoriginalestimate / 60 / 60}</td>
                    {allTeams.map(team => {
                        const currentTime = teamTime.hasOwnProperty(team.id) ? teamTime[team.id] : 0
                        return <td className="th_small" key={team.id}>{!currentTime ? '' : currentTime / 60 / 60}</td>
                    })}
                </tr>
            })}
            </tbody>

        </table>
    </div>;
}

export default MainTable;
