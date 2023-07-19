import { useServerContext, Organism } from '@kanvas/phoenix'



export default function Home() {
  const { sdk } = useServerContext();

  return (
    <Organism.Sidebar />
  )
}
