import Link from "next/link";
export default function NotFound() {
  return (
    <div className="shell py-20">
      <p className="eyebrow">404</p>
      <h1 className="page-title">Let’s get you back on track.</h1>
      <p className="my-5 text-slate-600">This page could not be found.</p>
      <Link href="/pension-help" className="btn">
        Explore pension help
      </Link>
    </div>
  );
}
