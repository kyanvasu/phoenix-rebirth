import { Atoms } from '@kanvas/phoenix';

interface CardProps {
  title: string;
  subtitle?: string;
  icon: JSX.Element;
  amount: number;
}

export function DashboardCard(props: CardProps) {
  const { title, subtitle, amount, icon } = props;

  return (
    <article className='grid p-5 border rounded-md grid-row-2 shadow-elevation-1 border-base-neutral-grey-30'>
      <section className='flex flex-row gap-x-3'>
        <Atoms.CardButton icon={icon} />

        <aside className='cols-span-2'>
          <Atoms.Body.One className='text-base-neutral-grey-80'>
            {title}
          </Atoms.Body.One>
          <Atoms.Body.Three className='text-base-neutral-grey-80'>
            {subtitle}
          </Atoms.Body.Three>
          <Atoms.Heading.One className='font-bold text-base-neutral-grey-100'>
            {amount.toString()}
          </Atoms.Heading.One>
        </aside>
      </section>

      <div className='flex flex-row items-center justify-between col-span-2 hover:cursor-pointer'>
        <Atoms.Body.Two className='text-base-neutral-grey-100'>
          View All
        </Atoms.Body.Two>

        <Atoms.Button.Link size='small'>
          <Atoms.Icons.ChevronRight />
        </Atoms.Button.Link>
      </div>
    </article>
  );
}
