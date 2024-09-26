"use client"
import { useFormState } from "react-dom";
import styles from "./loginForm.module.css"
import { login } from "@/lib/action";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import { signIn } from "next-auth/react";

const LoginForm = () => {
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const result = await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirect: false,
    });

    if (result.error) {
      // Handle error (e.g., show error message)
      console.error(result.error);
    } else {
      // Redirect on success
      router.push("/");
      router.refresh();
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input type="text" placeholder="username" name="username" />
      <input type="password" placeholder="password" name="password" />
      <button type="submit">Login</button>
      <Link href="/register">{"Don't have an account?"} <b>Register</b></Link>
    </form>
  )
}

export default LoginForm