import {useEffect, useState} from 'react';

export const useFetch = url => {
    const [data, setData] = useState(null);
    async function fetchData() {
        const response = await fetch(url);
        const result = await response.json();
        setData(result);
    }
    useEffect(() => { fetchData() }, []);
    return data;
};