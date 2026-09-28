import Link from "next/link";
import {
  HeartHandshake,
  Wallet,
  FileCheck2,
  FileText,
  UserRound,
  ArrowUpRight,
} from "lucide-react";
import type { Workflow } from "@/lib/workflows";
const icons = {
  heart: HeartHandshake,
  wallet: Wallet,
  check: FileCheck2,
  file: FileText,
  user: UserRound,
};
export function ServiceCard({
  service,
  index,
}: {
  service: Workflow;
  index: number;
}) {
  const Icon = icons[service.icon];
  return (
    <Link href={"/pension-help/" + service.slug} className="service-card group">
      <div className="flex justify-between items-start">
        <span className="icon-tile">
          <Icon size={25} />
        </span>
        <span className="text-xs font-medium text-slate-400">0{index + 1}</span>
      </div>
      <h3 className="mt-6 text-xl font-semibold tracking-tight">
        {service.title}
      </h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">
        {service.description}
      </p>
      <div className="mt-6 flex items-center justify-between text-xs font-semibold text-teal-800">
        <span>{service.tag}</span>
        <ArrowUpRight
          size={19}
          className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
        />
      </div>
    </Link>
  );
}
