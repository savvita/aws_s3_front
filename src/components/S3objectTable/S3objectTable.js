import tbl from '../../modules/sort'; 

import S3objectRow from './S3objectRow';
import Pagination from '../Pagination';
import PerPageSelect from '../PerPageSelect';
import ConfirmDeletingModal from '../ConfirmDeletingModal';
import InfoModal from '../InfoModal';

import { selectValues, selectStatus, selectUrl, getAsync, uploadAsync, deleteAsync } from '../../app/s3Slice';

import { useSelector, useDispatch } from 'react-redux';

import { useEffect, useState } from 'react';
import React from 'react';

import { Table, Spinner, UncontrolledTooltip, Row, Col } from 'reactstrap';
import { FaFileUpload } from "react-icons/fa";
import InputFileRow from './InputFileRow';

import './S3objectTable.css';


const S3objectTable = () => {
    const values = useSelector(selectValues);
    const status = useSelector(selectStatus);
    const url = useSelector(selectUrl);
    const dispatch = useDispatch();

    const [items, setItems] = useState([]);
    const [itemsPage, setItemsPage] = useState([]);

    const [addMode, setAddMode] = useState(false);

    const [modal, setModal] = useState(false);
    const [item, setItem] = useState({});

    const [infoModal, setInfoModal] = useState(false);
    const [infoHeader, setInfoHeader] = useState('');
    const [infoText, setInfoText] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [pages, setPages] = useState([]);

    useEffect(() => {
        dispatch(getAsync());
        pages.splice(0, pages.length);
        pages.push(5);
        pages.push(10);
        pages.push(20);
        pages.push(50);
        setPages(pages);
    }, []);

    useEffect(() => {
        if(values) {
            setItems([...values]);
            setCurrentPage(1);
        }
    }, [values]);

    useEffect(() => {
        setItemsPage(items.slice((currentPage - 1) * perPage, (currentPage - 1) * perPage + perPage));
    }, [currentPage, items, perPage]);


    const deleteItem = async () => {
        setModal(false);

        if(!item) {
            showError();
            return;
        }
        const res = await dispatch(deleteAsync(item.key));
        if(!res.payload) {
            showError();
            return;
        }

        if(res.payload === false) {
            showError(undefined, 'Виникла помилка при видаленні файлу. Спробуйте пізніше');
            return;
        }

        await dispatch(getAsync());
    }

    const uploadFile = async (file) => {
        setAddMode(false);
        if(!file) {
            showError()
        }

        const res = await dispatch(uploadAsync(file));
        if(!res.payload) {
            showError();
            return;
        }

        if(res.payload === false) {
            showError(undefined, 'Виникла помилка при завантаженні файлу. Спробуйте пізніше');
            return;
        }

        await dispatch(getAsync());
    }

    const showCofirmModal = (item) => {
        if(!item) {
            showError();

            return;
        }

        setItem(item);
        setModal(true);
    }

    const showError = (title, text) => {
        setInfoHeader(title ?? 'Помилка');
        setInfoText(text ?? 'Ой, щось пішло не так :( Спробуйте пізніше');
        setInfoModal(true);
    }

    return (
        <>
            <Table dark hover className="s3table__table table_sort">
                <caption className='s3table__caption ps-2 fs-3'>
                    <Row>
                        <Col className="text-center">
                            <h1 className="fs-3 text-white d-inline">S3 Objects</h1>
                            <FaFileUpload id="s3table__caption__upload" className="s3table__icon ms-2" onClick={ () => setAddMode(true) } />
                            <UncontrolledTooltip placement="right" target="s3table__caption__upload">Завантажити новий файл</UncontrolledTooltip>
                        </Col>
                    </Row>
                    <Row className="pe-2">
                        <Col>
                            <PerPageSelect values={ pages } onChange={ (idx) => setPerPage(pages[idx]) } />
                        </Col>
                    </Row>
                </caption>
                <thead>
                    <tr>
                        <th className='text-center sortable' onClick={ tbl.sort }>№</th>
                        <th className="sortable" onClick={ tbl.sort }>Назва файлу</th>
                        <th className="sortable" onClick={ tbl.sort }>Модифіковано</th>
                        <th className="sortable" onClick={ tbl.sort }>Розмір</th>
                        <th colSpan="2" className="text-center s3table__collapse__collapsed">Дії</th>
                        <th className='s3table__collapse__expanded'>Завантажити</th>
                        <th className='s3table__collapse__expanded'>Видалити</th>
                    </tr>
                </thead>
                <tbody>
                    { addMode && <InputFileRow onUpload={ uploadFile } onCancel={ () => setAddMode(false) } /> }
                    { itemsPage && itemsPage.map((item, idx) => 
                        item && <S3objectRow key={ item.key } idx={ (currentPage - 1) * perPage + idx + 1 } item={ item } onDelete={ (item) => showCofirmModal(item) } url={ url } />)
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="6">
                            <div className={ status === 'loading' ? 'd-flex justify-content-center' : 'd-none' }><Spinner color="light">Loading...</Spinner></div>
                            <Pagination currentPage={ currentPage } hits={ items.length } perPage={ perPage } className={ status !== 'idle' && 'd-none' } onPageChanged={ (page) => setCurrentPage(page) } />
                        </td>
                    </tr>
                </tfoot>
            </Table>
            <ConfirmDeletingModal isOpen={ modal } onCancel={ () => setModal(false) } onAccept={ () => deleteItem() } item={ item } />
            <InfoModal isOpen={ infoModal } onAccept={ () => setInfoModal(false) }  text={ infoText } title={ infoHeader } />
        </>
    );
}

export default S3objectTable;

//todo finish this
//todo table.css