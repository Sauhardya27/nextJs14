"use client";
import { usePathname } from "next/navigation";
import styles from "./navLink.module.css";
import Link from "next/link";

const NavLink = ({item}) => {
	const pathName = usePathname();
  return (
	<Link href={item.path} key={item.title} className={`${styles.container} ${pathName === item.path && styles.active}`}> 
	{/* Apply "styles.active" class if the fetched pathname matches with the pathname in the Links array */}
		{item.title}
	</Link>
  )
}

export default NavLink;