import Image from "next/image";
import styles from "./page.module.css";
import Landing from "./ui/landing";
import { options } from "./api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

interface HomeProps {
  user: object;
}

export default async function Home({ user }: HomeProps ) {

  const session = await getServerSession(options);
  console.log("session", session)

  return (
    <>
    <Landing user={session} />
    </>
    
  )
}


