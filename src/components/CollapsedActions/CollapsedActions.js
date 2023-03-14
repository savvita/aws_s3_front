
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, UncontrolledTooltip, DropdownItem } from 'reactstrap';
import { FaRegTrashAlt, FaFileDownload, FaBars } from "react-icons/fa";

import './CollapsedActions.css';


const CollapsedActions = ({ item, idx, url, onDelete }) => {


    return (
            <>
                <td colSpan="3" className='s3table__collapse__collapsed'>
                    <UncontrolledDropdown>
                        <DropdownToggle caret color="dark">
                            <FaBars className="property-table__icon"  />
                        </DropdownToggle>
                        <DropdownMenu dark className='text-center'>
                            { url && 
                            <DropdownItem>
                                <div id={ item ? `table_row_dropdown_${ idx }_download` : `table_row_dropdown_download` } className="d-inline-block overflow-hidden p-1 position-relative">
                                <a href={ `${ url }?objectName=${ item.key }` }><FaFileDownload className="s3table__icon" /></a>
                                </div>
                                <UncontrolledTooltip placement="right" target={ item ? `table_row_dropdown_${ idx }_download` : `table_row_dropdown_download` } >
                                    Завантажити
                                </UncontrolledTooltip>
                            </DropdownItem> }
                            <DropdownItem>
                                <div id={ item ? `table_row_dropdown_${ idx }_delete` : `table_row_dropdown_delete` } className="d-inline-block overflow-hidden p-1">
                                    <FaRegTrashAlt className="s3table__icon" onClick={ onDelete } />
                                </div>
                                <UncontrolledTooltip placement="right" target={ item ? `table_row_dropdown_${ idx }_delete` : `table_row_dropdown_delete` } >
                                    Видалити
                                </UncontrolledTooltip>
                            </DropdownItem>

                        </DropdownMenu>
                    </UncontrolledDropdown>
                </td>
                <td className='text-center property-table__collapse__expanded'>
                    { url && 
                    <>
                        <div id={ item ? `table_row_${ idx }_download` : `table_row_download` } className="d-inline-block overflow-hidden p-1 position-relative">
                            <a href={ `${ url }?objectName=${ item.key }` }><FaFileDownload className="s3table__icon" /></a>
                        </div>
                        <UncontrolledTooltip placement="right" target={ item ? `table_row_${ idx }_download` : `table_row_download` } >
                            Завантажити
                        </UncontrolledTooltip>
                    </>
                    }
                </td>
                <td className='text-center property-table__collapse__expanded'>
                    <div id={ item ? `table_row_${ idx }_delete` : `table_row_delete` } className="d-inline-block overflow-hidden p-1">
                        <FaRegTrashAlt className="s3table__icon" onClick={ onDelete } />
                    </div>
                    <UncontrolledTooltip placement="right" target={ item ? `table_row_${ idx }_delete` : `table_row_delete` } >
                        Видалити
                    </UncontrolledTooltip>
                </td>
            </>
    );
}

export default CollapsedActions;