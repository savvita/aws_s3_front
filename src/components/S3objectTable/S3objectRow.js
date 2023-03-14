

import CollapsedActions from '../CollapsedActions/CollapsedActions';

const S3objectRow = ({ item, idx, className, url, onDelete }) => {
    return (
        <tr className={ className }>
            <th scope="row" className='text-center ms-4 me-4'><p className="p-1 m-0">{ idx }</p></th>
            <td style={{ width: '100%' }}><p className="p-1 m-0">{ item && item.key }</p></td>
            <td><p className="p-1 m-0">{ item && item.lastModified && new Date(item.lastModified).toLocaleString() }</p></td>
            <td><p className="p-1 m-0">{ item && item.size }</p></td>
            <CollapsedActions item={ item } idx={ idx } url={ url } onDelete={ () => onDelete && onDelete(item) } />
        </tr>
    );
}

export default S3objectRow;