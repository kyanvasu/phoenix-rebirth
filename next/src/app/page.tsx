import { useServerContext } from '@kanvas/phoenix'

export default function Home() {
  const { sdk } = useServerContext();

  console.log(sdk);

  return (
    <></>
  )
}
