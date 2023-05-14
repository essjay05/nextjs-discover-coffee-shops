import Link from "next/link"
import styles from "./Footer.module.css"

const Footer = () => {
  return (
    <footer
      className={styles.footer}>
      <Link 
        target={`_blank`} 
        href={`https://www.joyserquina.com`}
        className={styles.copyright}>
        Joy of All Trades &copy; 2023
      </Link>
    </footer>
  )
}

export default Footer