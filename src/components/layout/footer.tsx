import Link from "next/link";
export function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-white">
      <div className="shell py-9 flex flex-col gap-6 md:flex-row md:justify-between">
        <div>
          <p className="font-bold text-lg">
            A little guidance. A clearer next step.
          </p>
          <p className="mt-2 text-sm text-slate-500 max-w-xl">
            DAD Day prototype · Demo only. Not an official government service.
            Workflows are illustrative and do not determine eligibility or
            submit official applications.
          </p>
        </div>
        <div className="flex gap-5 text-sm font-semibold">
          <Link href="/about">About this demo</Link>
          <Link href="/grievance">Get help</Link>
        </div>
      </div>
    </footer>
  );
}
