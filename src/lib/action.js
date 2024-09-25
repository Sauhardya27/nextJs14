"use server"
import { revalidatePath } from "next/cache";
import { Post } from "./models";
import { connectToDb } from "./utils";
import { User } from '@/lib/models';
import bcrypt from 'bcryptjs';
import { signIn } from "next-auth/react";

export const addPost = async (formData) => {
	// const title = formData.get("title");
	// const desc = formData.get("desc");
	// const slug = formData.get("slug");

	const { title, desc, slug, userId } = Object.fromEntries(formData);

	try {
		connectToDb();
		const newPost = new Post({
			title,
			desc,
			slug,
			userId,
		});

		await newPost.save();
		console.log("saved to db")
		revalidatePath("/blog")
	} catch (err) {
		console.log(err);
		return { error: "Something went wrong!" }
	}
}

export const deletePost = async (formData) => {

	const { id } = Object.fromEntries(formData);

	try {
		connectToDb();
		await Post.findByIdAndDelete(id);
		console.log("deleted from db")
		revalidatePath("/blog")
	} catch (err) {
		console.log(err);
		return { error: "Something went wrong!" }
	}
}

export const register = async (previousState, formData) => {
	const { username, email, password, img, passwordRepeat } = Object.fromEntries(formData);

	if (password !== passwordRepeat) {
		return { error: "Passwords don't match!" }
	}

	try {
		connectToDb();
		const user = await User.findOne({ username });

		if (user) {
			return { error: "Username already exists!" }
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newUser = new User({
			username,
			email,
			password: hashedPassword,
			img,
		});

		await newUser.save();
		console.log("saved to db")
		return { success: true }
	} catch (err) {
		console.log(err);
		return { error: "Something went wrong!" }
	}
}

export const login = async (previousState, formData) => {
	const { username, password } = Object.fromEntries(formData);

	try {
		const result = await signIn("credentials", {
			username,
			password,
			redirect: false, // Prevent automatic redirect
		});

		if (result.error) {
			return { error: "Invalid username or password" };
		}

		// If we reach here, login was successful
		return { success: true };
	} catch (err) {
		console.error(err);
		return { error: "An unexpected error occurred. Please try again." };
	}
}