import {useEffect, useState} from "react";
import {getApi} from "@/api/apiCall";

export interface useGetApiResult<T> {
    data: T | null | undefined;
    loading: boolean;
}

export function useGetApi<T>(path: string): useGetApiResult<T> {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<T | null>();

    useEffect(() => {
        getApi<T>(path).then((data: T | null) => {
            setData(data)
            setLoading(false);
        })
    }, [])

    return {loading, data}
}