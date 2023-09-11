import { DashboardCard } from '@/components/molecules/dashboard-card';
import { Atoms } from '@kanvas/phoenix';

export default function DashboardPage() {
  return (
    <section className='flex flex-col h-full px-12 py-6 gap-y-3 bg-base-neutral-grey-10'>
      <Atoms.Heading.Three className='font-bold'>Dashboard</Atoms.Heading.Three>

      <article>
        <section className='grid grid-cols-3 gap-x-6'>
          <DashboardCard
            title={'Leads Created'}
            icon={<Atoms.Icons.Briefcase />}
            amount={1000}
          />
          <DashboardCard
            title={'Leads Closed'}
            icon={<Atoms.Icons.Briefcase />}
            amount={300}
          />
          <DashboardCard
            title={'Agents Sponsored'}
            icon={<Atoms.Icons.Users />}
            amount={50}
            variant='primary'
          />
        </section>
      </article>
    </section>
  );
}
