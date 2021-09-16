import style from './Loader.module.css'
import spiner from './spiner.svg'

export const Loader = ({ size }) => {
  return (
      <img
        className={`${style.loader} ${size ? style[size] : ''}`}
        src={spiner}
        alt=""
      />
  )
}
