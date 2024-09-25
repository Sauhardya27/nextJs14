"use client"
import { useSession, signIn, signOut } from "next-auth/react"
import { login } from "@/lib/action";

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
    <div>
      <button onClick={() => signIn("github")}>Login with Github</button>
      <form action={login}>
        <input type="text" placeholder="username" name="username" />
        <input type="password" placeholder="password" name="password" />
        <button>Login with Credentials</button>
      </form>
    </div>
  )
}