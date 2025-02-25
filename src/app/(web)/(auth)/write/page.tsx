'use client';
import { useSession } from "next-auth/react"

const Page = () => {
  const { data: session } = useSession()
  if(!session || !session.user || !session.user.name) {
    return <div>404</div>
  }
  return (
    <div>page</div>
  )
}

export default Page