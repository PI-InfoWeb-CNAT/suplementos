'use client';

import { FC, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import LoadingSpinner from "@/components/loading/LoadingSpinner";

export function withAuth<P extends object>(WrappedComponent: FC<P>) {
    const ComponentWithAuth: FC<P> = (props) => {
        const { isLogged, isLoggingOut, loading } = useAuth();
        const router = useRouter();
        const pathname = usePathname();

        useEffect(() => {
            if (!loading && !isLogged && !isLoggingOut) {
                router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
            }
        }, [loading, isLogged, isLoggingOut, router, pathname]);

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

export default withAuth;