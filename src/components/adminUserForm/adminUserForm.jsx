"use client"
import styles from './adminUserForm.module.css'
import { useFormState } from "react-dom";
import { addUser } from '@/lib/action';

const AdminUserForm = () => {
	const [state, formAction] = useFormState(addUser, undefined);
	return (
		<form action={formAction} className={styles.form}>
			<h1>Add New User</h1>
			<input type="text" placeholder="Username" name="username" />
			<input type="text" placeholder="Email" name="email" />
			<input type="password" placeholder="Password" name="password" />
			<input type="text" placeholder="Img" name="img" />
			<select name="isAdmin">
				<option value="false">Is Admin?</option>
				<option value="false">No</option>
				<option value="true">Yes</option>
			</select>
			<button>Add</button>
			{state && state.error}
		</form>
	)
}

export default AdminUserForm