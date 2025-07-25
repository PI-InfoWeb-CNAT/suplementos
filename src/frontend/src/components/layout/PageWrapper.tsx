import Topbar from "./Topbar";

export default function PageWrapper({ children, pageName }: { children: React.ReactNode; pageName: string }) {
  return (
    <div className="flex-1 flex flex-col gap-15">
        <Topbar page={pageName} />
        <main className="flex-1 flex flex-col mb-sm:gap-10 gap-7">
            {children}
        </main>
    </div>
  );
}
