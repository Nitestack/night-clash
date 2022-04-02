import { useQuery } from "react-query";
import Util from "@util/index";
import { useRouter } from "next/router";
import type { NextRouter } from "next/router";
import type { User } from "firebase/auth";
import type { AxiosRequestConfig } from "axios";
import type { FC } from "react";
import { useAuth } from "@components/AuthProvider";
import type { NextApiError, NextPageWithConfiguration } from "@util/types";
import Spinner from "@components/Utilities/Spinner";
import Center from "@components/Utilities/Center";
import type axios from "axios";
import type { AxiosError } from "axios";
import Link from "@components/Elements/Link";
import Button from "@components/Elements/Button";

/**
 * Fetches data and handles errors/loading state/successful state (with {@link axios} and {@link useQuery})
 * @param {FC<{ data: DataProps }>} NextPage The successful page to render
 * @param {object} requestInfo Information about the request
 */
export function useNextPageFetchData<DataProps = any>(NextPage: FC<{ data: DataProps }>, requestInfo: {
    key: string,
    url: string,
    method: "post",
    setData: (router: NextRouter, user?: User) => any,
    config?: AxiosRequestConfig
} | {
    key: string,
    url: string,
    method: "get",
    config?: AxiosRequestConfig
}) {
    const nextPage: NextPageWithConfiguration<{ data: DataProps }> = () => {
        const router = useRouter();
        const { user } = useAuth();
        const { url, method, config, key } = requestInfo;
        const { data, error, isError, isLoading, isSuccess } = useQuery<DataProps, AxiosError<NextApiError>>(key, async () => {
            const response = method == "get" ? await Util.Axios.get(url, config) : await Util.Axios.post(url, requestInfo.setData(router, user!), config);
            return response.data;
        });
        if (isLoading) return (
            <Center className="flex-col">
                <Spinner/>
            </Center>
        );
        if (isSuccess) return (
            <NextPage data={data}/>
        );
        else if (isError) {
            Util.ApiHandler.errorHandler(error);
        };
        return (
            <Center className="flex-col">
                <Spinner/>
                <Link href="/">
                    <Button className="bg-primary"> Return Home </Button>
                </Link>
            </Center>
        );
    };
    return nextPage;
};