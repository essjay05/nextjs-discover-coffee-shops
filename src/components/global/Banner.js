import utilStyles from "../../styles/utils.module.css"
import styles from "./Banner.module.css"

 const Banner = ({ titleA, titleB, subtitle }) => {
  return (
    <section className={styles.container}>
      <h1 className={`${utilStyles.heading2Xl} ${styles.title}`}>
        <span className={styles.titleA}>
          { titleA }
        </span>
        <span className={styles.titleB}>
          { titleB }
        </span>
      </h1>
      <p className={`${styles.subtitle} ${utilStyles.headingLg}`}>
        { subtitle }
      </p>
      <button>View stores nearby</button>
    </section>
  )
}

export default Banner