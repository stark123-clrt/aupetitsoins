import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { formatDateLong, stars } from "@/lib/format";
import { CommentActions } from "@/components/admin/comment-actions";

export default async function AdminAvisPage({
  searchParams,
}: PageProps<"/admin/avis">) {
  await requireAdmin();
  const params = await searchParams;
  const tab = params.tab === "approved" ? "approved" : "pending";

  const comments = await prisma.comment.findMany({
    orderBy: { createdAt: "desc" },
    include: { service: true },
  });
  const pending = comments.filter((c) => !c.approved);
  const approved = comments.filter((c) => c.approved);
  const list = tab === "pending" ? pending : approved;

  return (
    <div>
      <h1 className="text-[36px] sm:text-[40px]">Modération des avis</h1>
      <p className="mt-2.5 text-[15.5px] text-muted">
        {pending.length} avis en attente · {approved.length} publiés sur le site
      </p>

      <div className="mt-6.5 flex gap-2.5 border-b border-border pb-5">
        <TabLink href="/admin/avis?tab=pending" active={tab === "pending"}>
          En attente · {pending.length}
        </TabLink>
        <TabLink href="/admin/avis?tab=approved" active={tab === "approved"}>
          Approuvés · {approved.length}
        </TabLink>
      </div>

      <div className="mt-6.5 flex flex-col gap-4">
        {list.length === 0 ? (
          <div className="rounded-[18px] border border-dashed border-input bg-surface px-11 py-11 text-center text-[15.5px] text-muted">
            Aucun avis dans cette liste.
          </div>
        ) : (
          list.map((c) => (
            <article
              key={c.id}
              className="rounded-[18px] border border-border bg-surface p-6.5"
            >
              <div className="flex items-start justify-between gap-6">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-[16.5px] font-medium">{c.authorName}</span>
                    <span
                      className={
                        "rounded-full px-2.75 py-1 text-[12.5px] " +
                        (c.approved
                          ? "bg-success-bg text-success-fg"
                          : "bg-pending-bg text-pending-fg")
                      }
                    >
                      {c.approved ? "Publié" : "En attente"}
                    </span>
                  </div>
                  <div className="mt-1.5 text-[13.5px] text-muted-2">
                    {c.service.title} · {formatDateLong(c.createdAt)}
                  </div>
                  <div className="mt-2.5 tracking-[0.06em] text-accent">
                    {stars(c.rating)}
                  </div>
                  <p className="mt-3 max-w-[640px] text-[16px] leading-relaxed text-foreground-soft">
                    {c.content}
                  </p>
                </div>
                <CommentActions id={c.id} pending={!c.approved} />
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}

function TabLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={
        "rounded-full border px-4.5 py-2.5 text-[14.5px] " +
        (active
          ? "border-foreground bg-foreground text-background"
          : "border-input text-foreground-soft")
      }
    >
      {children}
    </Link>
  );
}
