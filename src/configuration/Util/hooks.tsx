import Util from "@util/index";
import { NextRouter, useRouter } from "next/router";
import type { FC } from "react";
import { useEffect } from "react";
import { useAuth as useAuthentication } from "@components/AuthProvider";
import type { NextPageWithConfiguration } from "types";
import Spinner from "@components/Utilities/Spinner";
import Center from "@components/Utilities/Center";
import Link from "@components/Elements/Link";
import Button from "@components/Elements/Button";
import type { MetaProps } from "@components/Layout";
import { useQuery, gql } from "@apollo/client";
import type ApolloTypes from "@apollo/client";
import type { User } from "firebase/auth";

export const useAuth = useAuthentication;

type QueryResultType<DataProps> = Record<string, DataProps>;

/**
 * Fetches data and handles errors/loading state/successful state (with Apollo {@link useQuery})
 * @param {FC<{ data: DataProps }>} NextPage The successful page to render
 *
 */
export function useNextPageFetchData<
    DataProps = any,
    Variables = ApolloTypes.OperationVariables
>(
    NextPage: FC<{ data: DataProps }>,
    requestInfo: {
        setKey: (router: NextRouter, user: User) => string;
        setQuery: (
            gql: typeof ApolloTypes.gql,
            router: NextRouter,
            user: User
        ) => ReturnType<typeof ApolloTypes.gql>;
        setOptions?: (
            router: NextRouter,
            user: User
        ) => ApolloTypes.QueryHookOptions<
            QueryResultType<DataProps>,
            Variables
        >;
    }
): NextPageWithConfiguration<{ data: Readonly<DataProps> }> {
    const nextPage: NextPageWithConfiguration<{
        data: Readonly<DataProps>;
    }> = () => {
        const router = useRouter();
        const { user } = useAuth();
        const { setKey, setQuery, setOptions } = requestInfo;
        const { data, loading, error } = useQuery<
            QueryResultType<DataProps>,
            Variables
        >(setQuery(gql, router, user!), setOptions?.(router, user!));
        if (loading)
            return (
                <Center className="flex-col">
                    <Spinner />
                </Center>
            );
        if (error) {
            Util.ApiHandler.errorHandler(error);
            return (
                <Center className="flex-col">
                    <Spinner />
                    <Link href="/">
                        <Button className="bg-primary"> Return Home </Button>
                    </Link>
                </Center>
            );
        }
        if (data) return <NextPage data={data[setKey(router, user!)]} />;
        return (
            <Center className="flex-col">
                <Spinner />
                <Link href="/">
                    <Button className="bg-primary"> Return Home </Button>
                </Link>
            </Center>
        );
    };
    return nextPage;
}

export function useTitle() {
    const { title } = Util.StateManagement.useSelector((state) => state.layout);
    const dispatch = Util.StateManagement.useDispatch();
    function setTitle(title: string, sameHeader?: boolean) {
        useEffect(() => {
            dispatch(Util.StateManagement.setTitle(title));
            if (sameHeader) dispatch(Util.StateManagement.setHeader(title));
        }, []);
    }
    return { title, setTitle };
}

export function useDescription() {
    const { description } = Util.StateManagement.useSelector(
        (state) => state.layout
    );
    const dispatch = Util.StateManagement.useDispatch();
    function setDescription(description: string) {
        useEffect(() => {
            dispatch(Util.StateManagement.setDescription(description));
        }, []);
    }
    return { description, setDescription };
}

export function useHeader() {
    const { header } = Util.StateManagement.useSelector(
        (state) => state.layout
    );
    const dispatch = Util.StateManagement.useDispatch();
    function setHeader(header: string) {
        useEffect(() => {
            dispatch(Util.StateManagement.setHeader(header));
        }, []);
    }
    return { header, setHeader };
}

export function useScripts() {
    const { scripts } = Util.StateManagement.useSelector(
        (state) => state.layout
    );
    const dispatch = Util.StateManagement.useDispatch();
    function setScripts(scripts: string[]) {
        useEffect(() => {
            dispatch(Util.StateManagement.setScripts(scripts));
        }, []);
    }
    return { scripts, setScripts };
}

export function useMeta() {
    const { meta } = Util.StateManagement.useSelector((state) => state.layout);
    const dispatch = Util.StateManagement.useDispatch();
    function setMeta(meta: MetaProps) {
        useEffect(() => {
            dispatch(Util.StateManagement.setMeta(meta));
        }, []);
    }
    return { meta, setMeta };
}
