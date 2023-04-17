import Image from 'next/image'
import Link from 'next/link'
import styles from './Card.module.css'

const Card = (props) => {
  return (
    <Link
      href={props.href}
      className={styles.cardLink}>
      <div className={`glass ${styles.cardContainer}`}>
        <div className={styles.cardTextWrapper}>
          <h2 className={styles.cardHeader}>{props.name}</h2>
          <Image 
            src='/static/icons/forward-arrow.svg'
            width={24}
            height={24}
            alt='Forward arrow'/>
        </div>
        <div className={styles.cardImgWrapper}>
          <Image
            src={props.imgSrc}
            width={260}
            height={160} 
            alt={`Image of ${props.name} shop`}
            className={styles.cardImg}/>
        </div>
      </div>
    </Link>
    
  )
}

export default Card