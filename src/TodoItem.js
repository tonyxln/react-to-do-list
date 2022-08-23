import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular } from '@fortawesome/fontawesome-svg-core/import.macro';

export default function TodoItem({ value }) {
    return (
        <tr id={value.id}>
            <td>{value.title}</td>
            <td>{value.description}</td>
            <td>{value.priority}</td>
            <td>
                <div onClick={(e) => value.edit(e)}><FontAwesomeIcon icon={regular('edit')}  size="lg" /></div>
                <div onClick={(e) => value.delete(e)}><FontAwesomeIcon icon={regular('trash-alt')} size="lg" /></div>
            </td>
        </tr>
    )
}