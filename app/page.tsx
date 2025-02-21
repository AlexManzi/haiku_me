import Landing from "./ui/landing";
import { options } from "./api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";


export default async function Home() {

  const session = await getServerSession(options);

  return (
    <>
    <Landing user={session} />
    </>
    
  )
}


