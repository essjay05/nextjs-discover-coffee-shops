import Image from 'next/image'
import Link from 'next/link'
import styles from './Card.module.css'

const Card = (props) => {
  return (
    <Link
      href={props.href}>
      <div className={styles.cardContainer}>
        <h2>{props.name}</h2>
        <Image
          src={props.imgSrc}
          width={260}
          height={160} 
          alt={`Image of ${props.name} shop`}/>
      </div>
    </Link>
    
  )
}

export default Card