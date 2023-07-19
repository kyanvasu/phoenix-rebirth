import React from 'react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className='flex flex-col md:flex-row'>
        <aside className='relative w-full md:w-1/2 h-[50vh] md:h-screen'>
          <div className='h-full w-full bg-gray-600'></div>
        </aside>

        <main className='flex flex-col items-center justify-center w-full md:w-1/2'>
          <article className='w-[400px] flex flex-col rounded-md p-6 border border-base-neutral-grey-40'>
            {children}
          </article>
        </main>
      </body>
    </html>
  );
}
