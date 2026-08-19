"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { approveComment, deleteComment } from "@/actions/moderation";

export function CommentActions({ id, pending: isPending }: { id: string; pending: boolean }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function handleApprove() {
    startTransition(async () => {
      await approveComment(id);
      router.refresh();
    });
  }

  function handleDelete() {
    if (!confirm("Supprimer cet avis ?")) return;
    startTransition(async () => {
      await deleteComment(id);
      router.refresh();
    });
  }

  return (
    <div className="flex shrink-0 flex-col gap-2">
      {isPending && (
        <button
          type="button"
          onClick={handleApprove}
          disabled={pending}
          className="cursor-pointer rounded-full bg-foreground px-5 py-2.75 text-[14px] font-medium text-background disabled:opacity-60"
        >
          Approuver
        </button>
      )}
      <button
        type="button"
        onClick={handleDelete}
        disabled={pending}
        className="cursor-pointer rounded-full border border-danger/35 px-5 py-2.5 text-[14px] text-danger disabled:opacity-60"
      >
        Supprimer
      </button>
    </div>
  );
}
