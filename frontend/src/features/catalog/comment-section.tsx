import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MessageSquare } from "lucide-react";
import { useServiceComments, usePostComment } from "@/hooks/use-services";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/shared/empty-state";
import { formatRelative, initials } from "@/lib/format";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const schema = z.object({
  authorName: z.string().min(1, "Votre nom est requis").max(80),
  content: z.string().min(1, "Votre commentaire est requis").max(2000),
});

type FormValues = z.infer<typeof schema>;

export function CommentSection({ slug }: { slug: string }) {
  const { data: comments, isLoading } = useServiceComments(slug);
  const postComment = usePostComment(slug);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { authorName: "", content: "" },
  });

  const onSubmit = form.handleSubmit((values) => {
    postComment.mutate(values, { onSuccess: () => form.reset() });
  });

  return (
    <div className="space-y-6">
      <h2 className="flex items-center gap-2 text-lg font-semibold">
        <MessageSquare className="size-5 text-primary" />
        Avis des visiteurs
      </h2>

      {isLoading ? (
        <div className="space-y-3">
          <Skeleton className="h-16 w-full rounded-xl" />
          <Skeleton className="h-16 w-full rounded-xl" />
        </div>
      ) : !comments || comments.length === 0 ? (
        <EmptyState
          title="Aucun avis pour le moment"
          description="Soyez la première personne à partager votre expérience."
        />
      ) : (
        <ul className="space-y-4">
          {comments.map((c) => (
            <li key={c.id} className="flex gap-3 rounded-xl border border-border bg-card p-4">
              <Avatar className="size-9 shrink-0">
                <AvatarFallback className="bg-primary/15 text-xs font-semibold text-primary">
                  {initials(c.authorName)}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 space-y-1">
                <div className="flex flex-wrap items-baseline gap-2">
                  <span className="font-semibold">{c.authorName}</span>
                  <span className="text-xs text-muted-foreground">
                    {formatRelative(c.createdAt)}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {c.content}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-border bg-card p-5">
        <h3 className="font-semibold">Laisser un avis</h3>
        <Controller
          name="authorName"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Votre nom</FieldLabel>
              <Input {...field} id={field.name} aria-invalid={fieldState.invalid} />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="content"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Votre commentaire</FieldLabel>
              <Textarea
                {...field}
                id={field.name}
                rows={3}
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Button type="submit" disabled={postComment.isPending}>
          {postComment.isPending && <Spinner />}
          Envoyer
        </Button>
        <p className="text-xs text-muted-foreground">
          Votre avis sera visible après validation par l'équipe.
        </p>
      </form>
    </div>
  );
}
