
const api = "https://localhost:7066/api/s3";

const getAsync = async () => {
    let results = {};

    let url = api;

    await fetch(url, {
        method: 'get'
    })
    .then(response => response.json())
    .then(response => {
        results = response;
    })
    .catch(() => {
        results = undefined;
    });

    return results;
}

const uploadAsync = async (file) => {
    if(!file) {
        return undefined;
    }

    let results = {};
    const formData = new FormData();

    formData.append('file', file);
    
    await fetch(api, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(response => {
        results = response;
    })
    .catch(() => {
        results = undefined;
    });
    
    return results;
}

const deleteAsync = async (fileName) => {
    if(!fileName) {
        return false;
    }
    let results = {};


    await fetch(`${ api }?objectName=${ fileName }`, {
        method: 'delete'
    })
    .then(response => response.json())
    .then(response => {
        results = response;
    })
    .catch(() => {
        results = undefined;
    });

    return results;
}

const functions = {
    api: api,
    getAsync: getAsync,
    uploadAsync: uploadAsync,
    deleteAsync: deleteAsync
}

export default functions;