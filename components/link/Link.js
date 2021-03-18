import Link from "next/link";

export function NextLink(props) {
  return (
    <Link href={props.href}>
      <a className={props.class}>{props.text}</a>
    </Link>
  );
}
