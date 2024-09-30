import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import styles from "./loginForm.module.css";

const LoginForm = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(""); // Clear any existing errors
    const formData = new FormData(event.target);
    const result = await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirect: false,
    });

    if (result.error) {
      // Set the error message to be displayed
      setError(result.error);
    } else {
      // Redirect on success
      router.push("/");
      router.refresh();
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input type="text" placeholder="username" name="username" required />
      <input type="password" placeholder="password" name="password" required />
      <button type="submit">Login</button>
      {error && <div>{error}</div>}
      <Link href="/register">{"Don't have an account?"} <b>Register</b></Link>
    </form>
  );
};

export default LoginForm;