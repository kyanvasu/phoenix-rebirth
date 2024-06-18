export function TContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="flow-root">
      <div className="-mx-4 -my-2 overflow-x sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="ring-1 shadow-elevation-1 ring-black ring-opacity-5 sm:rounded-lg">
            <table className="min-w-full divide-y divide-base-neutral-grey-30 border-base-neutral-grey-20 ">
              {children}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
