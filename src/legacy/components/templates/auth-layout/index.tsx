interface Props extends React.PropsWithChildren {
  backgroundImage: React.ReactNode;
}
export default function AuthLayout({ children, backgroundImage }: Props) {
  return (
    <>
      <aside className="relative w-full md:w-1/2 h-[50vh] md:h-screen">
        {backgroundImage}
      </aside>

      <main className="flex flex-col items-center justify-center w-full md:w-1/2">
        <article className="w-[400px] flex flex-col rounded-md p-6 border border-base-neutral-grey-40">
          {children}
        </article>
      </main>
    </>
  );
}
