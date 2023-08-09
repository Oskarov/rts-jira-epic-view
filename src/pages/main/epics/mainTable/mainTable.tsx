import React    from 'react';
import {IIssue} from "../../../../interfaces/IIssue";

interface MainTableProps {
    data: IIssue[];
}

const MainTable: React.FC<MainTableProps> = ({data}) => {
    return <div className="table_holder">
        <table>
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
                <th className="th_medium">Согласовано со смежными подразделениями (DoD: есть подтверждение по плану на квартал и оценка) -
                    смежные команды подразделения указаны справа
                </th>
                <th className="th_small">Всего ч/недель на инициативу</th>
                <th className="th_rose">ЭК:</th>
                <th className="th_rose">КС</th>
                <th className="th_rose">Web</th>
                <th className="th_rose">APP (iOS& Android)</th>
                <th className="th_rose">Выбор покупки</th>
                <th className="th_rose">Дизайн</th>
                <th className="th_rose">Корзина и Чекаут</th>
                <th className="th_rose">Рекламная система</th>
                <th className="th_rose">ЭР</th>
                <th className="th_rose">Маркеты</th>
            </tr>
            {data.length && data.map(issue=>{
                return <tr key={issue.key}>
                    <td className="th_small">{issue.fields.components.map(component=><div key={component.id}>
                        {component.name}
                    </div>)}</td>
                    <td className="th_medium">{issue.fields.summary}</td>
                    <td className="th_medium"><a href={`https://jira.eapteka.ru/browse/${issue.key}`} target='_blank'>https://jira.eapteka.ru/browse/${issue.key}</a></td>
                    <td>{issue.fields.description}</td>
                    <td>{issue.fields.customfield_13927 && issue.fields.customfield_13927.map(component=><div key={component.id}>
                        {component.value}
                    </div>)}</td>
                    <td>{issue.fields.customfield_13928 && issue.fields.customfield_13928.map(component=><div key={component.id}>
                        {component.value}
                    </div>)}</td>
                    <td>{issue.fields.customfield_14312 || ''}</td>
                    <td>{issue.fields.customfield_14313 || ''}</td>
                    <td>{issue.fields.customfield_14311 || ''}</td>
                    <td className="th_small">{issue.fields.customfield_14305 || ''}</td>
                    <td className="th_small">Владелец инициативы</td>
                    <td className="th_small">{issue.fields.labels.filter(label=>['techdebt', 'product', 'tech-debt'].includes(label.toLowerCase())).map(label=><div key={`${issue.key}-${label}`}>
                        {label.toLowerCase()}
                    </div>)}</td>
                    <td className="th_medium">Согласовано со смежными подразделениями (DoD: есть подтверждение по плану на квартал и оценка) -
                        смежные команды подразделения указаны справа
                    </td>
                    <td className="th_small">Всего ч/недель на инициативу</td>
                    <td className="th_rose">ЭК:</td>
                    <td className="th_rose">КС</td>
                    <td className="th_rose">Web</td>
                    <td className="th_rose">APP (iOS& Android)</td>
                    <td className="th_rose">Выбор покупки</td>
                    <td className="th_rose">Дизайн</td>
                    <td className="th_rose">Корзина и Чекаут</td>
                    <td className="th_rose">Рекламная система</td>
                    <td className="th_rose">ЭР</td>
                    <td className="th_rose">Маркеты</td>
                </tr>
            })}
        </table>
    </div>;
}

export default MainTable;
