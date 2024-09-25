"use client"
import { useSession, signIn } from "next-auth/react"
import LoginForm from "@/components/loginForm/loginForm";
import styles from "./login.module.css"

export default function LoginPage() {
  const { data: session, status } = useSession()
  console.log("Session status:", status);
  console.log("Session data:", session);
  // if (session) {
  //   return (
  //     <div>
  //       Signed in as {session.user.email} <br/>
  //       <button onClick={() => signOut()}>Sign out</button>
  //     </div>
  //   )
  // }
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <button className={styles.github} onClick={() => signIn("github")}>Login with Github</button>
        <LoginForm />
      </div>
    </div>
  )
}