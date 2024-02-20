import styles from "./singlePost.module.css"
import Image from "next/image"

const SinglePostPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image src="https://images.pexels.com/photos/9561829/pexels-photo-9561829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" fill className={styles.img} />
      </div>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>Title</h1>
        <div className={styles.detail}>
          <Image src="https://images.pexels.com/photos/9561829/pexels-photo-9561829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" width={50} height={50} className={styles.avatar} />
          <div className={styles.detailText}>
            <span className={styles.detailTitle}>Author</span>
            <span className={styles.detailValue}>Terry Jefferson</span>
          </div>
          <div className={styles.detailText}>
            <span className={styles.detailTitle}>Published</span>
            <span className={styles.detailValue}>20.02.24</span>
          </div>
        </div>
        <div className={styles.content}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit aut quod voluptas cupiditate. Quam eius maxime atque autem velit consequatur harum sequi ipsa, magnam veritatis hic asperiores nulla voluptas illum.</div>
      </div>
    </div>
  )
}

export default SinglePostPage