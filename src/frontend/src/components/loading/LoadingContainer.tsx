import LoadingSpinner from "./LoadingSpinner"

const LoadingContainer = ({ children, loading }: {children: React.ReactNode; loading: boolean}) => {
    return (
        <>
            {loading ? (
                <section className="w-full flex justify-center items-center h-64">
                    <LoadingSpinner />
                </section>
            ) : (
                children
            )}
        </>
    )
}

export default LoadingContainer;