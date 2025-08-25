'use client';

import { FC, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import LoadingSpinner from "@/components/loading/LoadingSpinner";

export function withAuth<P extends object>(WrappedComponent: FC<P>) {
    const ComponentWithAuth: FC<P> = (props) => {
        const { isLogged, loading } = useAuth();
        const router = useRouter();

        useEffect(() => {
            if (!loading && !isLogged) {
                router.push("/login");
            }
        }, [loading, isLogged, router]);

        if (loading || (!loading && !isLogged)) {
            return (
                <div className="flex justify-center items-center h-screen">
                    <LoadingSpinner />
                </div>
            );
        }

        return <WrappedComponent {...props} />;
    };

    return ComponentWithAuth;
}
