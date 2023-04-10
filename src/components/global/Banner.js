import utilStyles from "../../styles/utils.module.css"
import styles from "./Banner.module.css"

 const Banner = (props) => {
  return (
    <section className={styles.container}>
      <h1 className={`${utilStyles.heading2Xl} ${styles.title}`}>
        <span className={styles.spanA}>
          { props.titleA }
        </span>
        <span className={styles.spanB}>
          { props.titleB }
        </span>
      </h1>
      <p className={`${styles.subtitle} ${utilStyles.headingLg}`}>
        { props.subtitle }
      </p>
      <button 
        className={styles.btn}
        onClick={props.handleOnClick}>
        { props.btnText }
      </button>
    </section>
  )
}

export default Banner