// import { auth } from "@/lib/auth";
// import { signIn } from "next-auth/react";
import { handleGithubLogin } from "@/lib/action";

const LoginPage = async () => {
  
  return (
    <div>
      <form action={handleGithubLogin}>
        <button>Login with Github</button>
      </form>
    </div>
  )
}

export default LoginPage