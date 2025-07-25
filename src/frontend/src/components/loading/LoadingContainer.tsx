import LoadingSpinner from "./LoadingSpinner"

const LoadingContainer = ({ children, loading }: {children: React.ReactNode; loading: boolean}) => {
    return (
        <>
            {loading ? (
                <section className="flex justify-center items-center h-64">
                    <LoadingSpinner />
                </section>
            ) : (
                children
            )}
        </>
    )
}

export default LoadingContainer;