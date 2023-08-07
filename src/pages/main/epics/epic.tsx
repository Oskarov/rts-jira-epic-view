import React, {useEffect, useState} from 'react';
import MainTable                    from "./mainTable/mainTable";
import {IIssue, IJiraIssues}        from "../../../interfaces/IIssue";

interface EpicsProps {

}

const Epics: React.FC<EpicsProps> = ({}) => {
    const [data, setData] = useState<IIssue[]>();
    const [loaded, setLoaded] = useState(0);
    const [sum, setSum] = useState(0);

    const getEpicsInfo = async () => {
        let response = await fetch(`https://jira.eapteka.ru/rest/agile/1.0/board/290/issue`);
        if (response.ok) {
            let json = await response.json();
            let maxResults = json.maxResults;
            let total = json.total;
            setSum(total);
            setLoaded(maxResults);
         /*   if (total > maxResults) {
                let count = Math.ceil(total / maxResults);
                let startAt = maxResults;
                for (let i = 0; i < count; i++) {
                    let additionalResponse = await fetch('https://jira.eapteka.ru/rest/agile/1.0/board/290/issue');
                    if (additionalResponse.ok) {
                        setLoaded((loaded) => (loaded + maxResults) < sum && sum !== 0 ? (loaded + maxResults) : sum);
                        let additionalJson = await additionalResponse.json();
                        let issues = additionalJson.issues;
                        json = {...json, issues: [...json.issues, ...issues]};
                        startAt = startAt + maxResults;
                    }
                }
            }*/

            setData(json.issues);
        } else {
            alert("Ошибка HTTP: " + response.status);
        }
    }

    useEffect(() => {
        getEpicsInfo();
    }, [])

    return <div>
        {data && <MainTable data={data}/>}
        {!data && <div>
            <span>Загрузка {loaded}/{sum}</span>
        </div>}
    </div>;
}

export default Epics;
