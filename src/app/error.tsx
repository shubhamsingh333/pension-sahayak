"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="shell py-20">
      <h1 className="page-title">Something interrupted this page.</h1>
      <p className="my-5 text-slate-600">
        Please try again. Your saved demo grievances remain in your local
        database.
      </p>
      <button className="btn" onClick={reset}>
        Try again
      </button>
    </div>
  );
}
