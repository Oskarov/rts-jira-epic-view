import React, {useEffect, useState} from 'react';
import MainTable                                                from "./mainTable/mainTable";
import {customJiraField, IIssue, IJiraIssues, IMetaInformation} from "../../../interfaces/IIssue";

interface EpicsProps {

}

interface IChildObj {
    [key: string]: IIssue[];
}

const Epics: React.FC<EpicsProps> = ({}) => {
    const [data, setData] = useState<IIssue[]>();
    const [loaded, setLoaded] = useState(0);
    const [sum, setSum] = useState(0);
    const [loadingText, setLoadingText] = useState('Подготовка');

    const [allTeams, setAllTeams] = useState<customJiraField[]>([]);

    const getEpicsInfo = async () => {
        let response = await fetch(`https://jira.eapteka.ru/rest/agile/1.0/board/290/issue`);
        if (response.ok) {
            let json: IJiraIssues = await response.json();
            let maxResults = json.maxResults;
            let total = json.total;
            let childIssues: IChildObj = {};
            let metaInfo = await fetch(`https://jira.eapteka.ru/rest/api/2/issue/${json.issues[0].key}/editmeta`);
            if (metaInfo.ok){
                let metaInfoJson:IMetaInformation = await metaInfo.json();
                if (metaInfoJson.fields.customfield_13927.allowedValues){
                    setAllTeams(metaInfoJson.fields.customfield_13927.allowedValues)
                }
            }
            setSum(total);
            setLoaded(maxResults);
            if (total > maxResults) {
                setLoadingText('Запрос данных в Jira');
                let count = Math.ceil(total / maxResults) - 1;
                let startAt = maxResults;
                for (let i = 0; i < count; i++) {
                    let additionalResponse = await fetch(`https://jira.eapteka.ru/rest/agile/1.0/board/290/issue?startAt=${startAt}`);
                    if (additionalResponse.ok) {
                        setLoaded((loaded) => {
                            let result = 0;
                            if (loaded + maxResults > total) {
                                result = total;
                            } else {
                                result = loaded + maxResults;
                            }
                            return result;
                        });
                        let additionalJson = await additionalResponse.json();
                        let issues = additionalJson.issues;
                        json = {...json, issues: [...json.issues, ...issues]};
                        startAt = startAt + maxResults;
                    }
                }
                setLoadingText('Обработка данных');
            }

            const withOutParrent = json.issues.filter(issue => {
                if (issue.fields.parent) {
                    if (childIssues.hasOwnProperty(issue.fields.parent.id)) {
                        childIssues[issue.fields.parent.id].push(issue);
                    } else {
                        childIssues[issue.fields.parent.id] = [issue];
                    }
                    return false;
                } else {
                    return true;
                }
            });

            const filledWIthChilds = withOutParrent.map(issue => childIssues.hasOwnProperty(issue.id) ? {
                ...issue,
                fields: {
                    ...issue.fields,
                    subEpics: childIssues[issue.id]
                }
            } : issue)

            setData(filledWIthChilds);
        } else {
            alert("Ошибка HTTP: " + response.status);
        }
    }

    useEffect(() => {
        getEpicsInfo();
    }, [])

    return <div>
        {data && <MainTable data={data} allTeams={allTeams}/>}
        {!data && <div className='loading_screen'>
            <div>
                <div className="spinner-box">
                    <div className="blue-orbit leo">
                    </div>

                    <div className="green-orbit leo2">
                    </div>

                    <div className="red-orbit leo">
                    </div>

                    <div className="white-orbit w1 leo">
                    </div>
                    <div className="white-orbit w2 leo">
                    </div>
                    <div className="white-orbit w3 leo">
                    </div>
                </div>
                <div>{loadingText}</div>
                <div>{loaded !== 0 ? Math.round((loaded * 100) / sum) : 0} %</div>
            </div>
        </div>}
    </div>;
}

export default Epics;
