import styles from "./postCard.module.css"
import Image from "next/image"
import Link from "next/link"

const PostCard = () => {
  return (
	<div className={styles.container}>
		<div className={styles.top}>
			<div className={styles.imgContainer}>
				<Image src="https://images.pexels.com/photos/9561829/pexels-photo-9561829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" fill className={styles.img} />
			</div>
			<span className={styles.date}>20.02.2024</span>
		</div>
		<div className={styles.bottom}>
			<h1 className={styles.title}>Title</h1>
			<p className={styles.desc}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi praesentium assumenda illum eos at vel iusto quasi vero fugiat natus.</p>
			<Link className={styles.link} href="/blog/post"> READ MORE</Link>
		</div>
	</div>
  )
}

export default PostCard