import Image from 'next/image'

export default function NextImg(props) {
  return (
    <figure className={props.class}>
      <Image
        src={props.src}
        width={props.width}
        height={props.height}
        quality={props.quality}
      />
    </figure>
  )
}