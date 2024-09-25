"use client"
import { useSession, signIn, signOut } from "next-auth/react"

export default function LoginPage() {
  const { data: session, status } = useSession()
  console.log("Session status:", status);
  console.log("Session data:", session);
  if (session) {
    return (
      <div>
        Signed in as {session.user.email} <br/>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    )
  }
  return (
    <div>
      <button onClick={() => signIn("github")}>Login with Github</button>
    </div>
  )
}