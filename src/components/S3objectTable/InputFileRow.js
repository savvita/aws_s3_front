import { useState } from "react";


import { FaCheck, FaBan } from "react-icons/fa";
import { Input, Button } from "reactstrap";


const InputFileRow = ({ onUpload, onCancel }) => {
    const [file, setFile] = useState([]);
    const [isValid, setIsValid] = useState(false);

    const upload = () => {
        if(!isValid) {
            return;
        }

        onUpload && onUpload(file[0]);
    }

    const cancel = () => {
        onCancel && onCancel();
    }

    const handleFile = (e) => {
        if(e.target.files) {
            setFile([...e.target.files]);
            setIsValid(e.target.files.length === 1);
        }
        else {
            setIsValid(false);
        }
    }

    return (
        <tr>
            <td colSpan="5">
                <Input name="file" type="file" onChange={ handleFile } />
            </td>
            <td colSpan="2">
                <div className="d-inline-block overflow-hidden p-2">
                    <Button disabled={ !isValid } onClick={ upload } className="p-0 m-0 bg-transparent border-0">
                        <FaCheck className="s3table__icon"  />
                    </Button>
                </div>
                <div className="d-inline-block overflow-hidden p-2">
                    <FaBan className="s3table__icon" onClick={ cancel } />
                </div>
            </td>
        </tr>
    );
}

export default InputFileRow;