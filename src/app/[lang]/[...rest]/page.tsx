import { notFound } from "next/navigation";
/** Unknown URLs under a language render the translated not-found page. */
export default function CatchAll() {
  notFound();
}
