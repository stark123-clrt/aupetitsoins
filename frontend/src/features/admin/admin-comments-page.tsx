import { Check, Trash2 } from "lucide-react";
import {
  useAdminComments,
  useApproveComment,
  useDeleteComment,
} from "@/hooks/use-admin";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/shared/empty-state";
import { ErrorState } from "@/components/shared/error-state";
import { formatDateTime } from "@/lib/format";

export function AdminCommentsPage() {
  const { data, isLoading, isError, refetch } = useAdminComments();
  const approve = useApproveComment();
  const remove = useDeleteComment();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Avis</h1>
        <p className="text-muted-foreground">
          Validez ou supprimez les commentaires laissés par les visiteurs.
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          <Skeleton className="h-24 w-full rounded-2xl" />
          <Skeleton className="h-24 w-full rounded-2xl" />
        </div>
      ) : isError ? (
        <ErrorState onRetry={() => refetch()} />
      ) : !data || data.length === 0 ? (
        <EmptyState
          title="Aucun avis"
          description="Les commentaires laissés sur vos services apparaîtront ici."
        />
      ) : (
        <div className="space-y-3">
          {data.map((c) => (
            <Card key={c.id} className="rounded-2xl p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0 space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold">{c.authorName}</span>
                    <Badge variant={c.approved ? "default" : "secondary"} className="rounded-full">
                      {c.approved ? "Approuvé" : "En attente"}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {formatDateTime(c.createdAt)}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {c.content}
                  </p>
                </div>
                <div className="flex shrink-0 gap-2">
                  {!c.approved && (
                    <Button size="sm" onClick={() => approve.mutate(c.id)} disabled={approve.isPending}>
                      <Check className="size-4" />
                      Approuver
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-destructive hover:text-destructive"
                    onClick={() => remove.mutate(c.id)}
                    disabled={remove.isPending}
                  >
                    <Trash2 className="size-4" />
                    Supprimer
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
