import styles from "./home.module.css";
import Image from "next/image";
import Link from "next/link";

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>Empowering Creativity with Thoughtful Solutions</h1>
        <p className={styles.desc}>
          Unleash your creativity with Nimble Concepts, where fresh ideas spark transformation. Experience the power of innovation and watch your vision come to life.
        </p>
        <div className={styles.buttons}>
          <Link href="/about">
            <button className={`${styles.button} ${styles.learnMoreButton}`}>Learn More</button>
          </Link>
          <Link href="/contact">
            <button className={`${styles.button} ${styles.contactButton}`}>Contact</button>
          </Link>
        </div>
        <div className={styles.brands}>
          <Image src="/brands.png" alt="" fill className={styles.brandImg} />
        </div>
      </div>
      <div className={styles.imgContainer}>
        <Image src="/hero.gif" alt="" fill className={styles.heroImg} unoptimized />
      </div>
    </div>
  );
};

export default Home;