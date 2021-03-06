import Link from 'next/link'

export default function Btn(props) {
  if(props.link){
    return (
      <Link href={props.href}>
        <a className={`outline-none inline-block bg-blue-500 hover:bg-blue-700 hover:no-underline text-white font-bold py-2 px-4 rounded shadow-md ${props.class}`}>{props.text}</a>
      </Link>
    )
  } else {
    return (
      <button className={`outline-none bg-pink-500 hover:bg-pink-700 hover:no-underline text-white font-bold py-2 px-4 rounded shadow-md ${props.class}`} onClick={props.click}>{props.text}</button>
    )
  }
}