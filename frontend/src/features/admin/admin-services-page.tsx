import { useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Film, Pencil, Plus, Trash2, Upload } from "lucide-react";
import type { ServiceCategory, ServiceDetail } from "@/types";
import type { ServiceInput } from "@/api/admin.api";
import {
  useAdminServices,
  useCreateService,
  useDeleteMedia,
  useDeleteService,
  useToggleService,
  useUpdateService,
  useUploadMedia,
} from "@/hooks/use-admin";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { EmptyState } from "@/components/shared/empty-state";
import { ErrorState } from "@/components/shared/error-state";
import { CATEGORY_LABELS, computeTtcCents, formatDuration, formatPrice } from "@/lib/format";

const CATEGORIES: ServiceCategory[] = ["MENAGE", "GARDE_ENFANT", "AIDE_ADMIN"];

const schema = z.object({
  title: z.string().min(2, "Le titre est requis"),
  description: z.string().min(5, "La description est requise"),
  category: z.enum(["MENAGE", "GARDE_ENFANT", "AIDE_ADMIN"]),
  priceHtEuros: z.coerce.number().positive("Prix invalide"),
  vatRate: z.coerce.number().min(0).max(100),
  durationMinutes: z.coerce.number().int().positive("Durée invalide"),
  active: z.boolean(),
});

type FormValues = z.input<typeof schema>;

function toInput(v: z.output<typeof schema>): ServiceInput {
  return {
    title: v.title,
    description: v.description,
    category: v.category,
    priceHtCents: Math.round(v.priceHtEuros * 100),
    vatRate: v.vatRate,
    durationMinutes: v.durationMinutes,
    active: v.active,
  };
}

function MediaManager({ service }: { service: ServiceDetail }) {
  const upload = useUploadMedia();
  const remove = useDeleteMedia();
  const fileInput = useRef<HTMLInputElement>(null);

  const handleFile = (file: File | undefined) => {
    if (!file) return;
    upload.mutate({ serviceId: service.id, file });
    if (fileInput.current) fileInput.current.value = "";
  };

  return (
    <div className="space-y-3">
      <FieldLabel>Photos & vidéos</FieldLabel>
      {service.media.length > 0 && (
        <div className="grid grid-cols-4 gap-2">
          {service.media.map((m) => (
            <div key={m.id} className="group relative aspect-square overflow-hidden rounded-lg border border-border bg-accent">
              {m.type === "PHOTO" ? (
                <img src={m.url} alt="" className="h-full w-full object-cover" />
              ) : (
                <span className="flex h-full w-full items-center justify-center">
                  <Film className="size-6 text-muted-foreground" />
                </span>
              )}
              <button
                type="button"
                onClick={() => remove.mutate(m.id)}
                className="absolute right-1 top-1 flex size-6 items-center justify-center rounded-full bg-destructive text-destructive-foreground opacity-0 transition-opacity group-hover:opacity-100"
                aria-label="Supprimer"
              >
                <Trash2 className="size-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
      <input
        ref={fileInput}
        type="file"
        accept="image/jpeg,image/png,image/webp,video/mp4,video/webm,video/quicktime"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={upload.isPending}
        onClick={() => fileInput.current?.click()}
      >
        {upload.isPending ? <Spinner /> : <Upload className="size-4" />}
        Ajouter un fichier
      </Button>
    </div>
  );
}

function ServiceDialog({
  service,
  open,
  onOpenChange,
}: {
  service: ServiceDetail | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const create = useCreateService();
  const update = useUpdateService();
  const isEdit = !!service;

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: service
      ? {
          title: service.title,
          description: service.description,
          category: service.category,
          priceHtEuros: service.priceHtCents / 100,
          vatRate: service.vatRate,
          durationMinutes: service.durationMinutes,
          active: service.active,
        }
      : {
          title: "",
          description: "",
          category: "MENAGE",
          priceHtEuros: 0,
          vatRate: 10,
          durationMinutes: 120,
          active: true,
        },
  });

  const onSubmit = form.handleSubmit((values) => {
    const input = toInput(values as z.output<typeof schema>);
    const done = () => onOpenChange(false);
    if (isEdit && service) {
      update.mutate({ id: service.id, input }, { onSuccess: done });
    } else {
      create.mutate(input, { onSuccess: done });
    }
  });

  const pending = create.isPending || update.isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Modifier le service" : "Nouveau service"}</DialogTitle>
          <DialogDescription>
            Renseignez les informations de la prestation. Le prix TTC est calculé
            automatiquement.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <Controller
            name="title"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Titre</FieldLabel>
                <Input {...field} id={field.name} aria-invalid={fieldState.invalid} />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Controller
            name="description"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                <Textarea {...field} id={field.name} rows={3} aria-invalid={fieldState.invalid} />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Controller
            name="category"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Catégorie</FieldLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id={field.name} aria-invalid={fieldState.invalid}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((c) => (
                      <SelectItem key={c} value={c}>
                        {CATEGORY_LABELS[c]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Controller
              name="priceHtEuros"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Prix HT (€)</FieldLabel>
                  <Input
                    type="number"
                    step="0.01"
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    value={field.value as number}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name="vatRate"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>TVA (%)</FieldLabel>
                  <Input
                    type="number"
                    step="0.1"
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    value={field.value as number}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name="durationMinutes"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Durée (min)</FieldLabel>
                  <Input
                    type="number"
                    step="15"
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    value={field.value as number}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </div>
          <Controller
            name="active"
            control={form.control}
            render={({ field }) => (
              <Field orientation="horizontal">
                <Switch
                  id={field.name}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                <FieldLabel htmlFor={field.name}>Service actif</FieldLabel>
              </Field>
            )}
          />

          {isEdit && service ? (
            <MediaManager service={service} />
          ) : (
            <p className="text-xs text-muted-foreground">
              Enregistrez le service pour pouvoir ajouter des photos et vidéos.
            </p>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Fermer
            </Button>
            <Button type="submit" disabled={pending}>
              {pending && <Spinner />}
              {isEdit ? "Enregistrer" : "Créer le service"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function AdminServicesPage() {
  const { data, isLoading, isError, refetch } = useAdminServices();
  const toggle = useToggleService();
  const deleteService = useDeleteService();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<ServiceDetail | null>(null);

  const openCreate = () => {
    setEditing(null);
    setDialogOpen(true);
  };
  const openEdit = (service: ServiceDetail) => {
    setEditing(service);
    setDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Services</h1>
          <p className="text-muted-foreground">
            Gérez votre catalogue de prestations, photos et vidéos.
          </p>
        </div>
        <Button onClick={openCreate}>
          <Plus className="size-4" />
          Nouveau service
        </Button>
      </div>

      {isLoading ? (
        <Skeleton className="h-64 w-full rounded-2xl" />
      ) : isError ? (
        <ErrorState onRetry={() => refetch()} />
      ) : !data || data.length === 0 ? (
        <EmptyState
          title="Aucun service"
          description="Créez votre première prestation pour la présenter aux visiteurs."
          action={
            <Button onClick={openCreate}>
              <Plus className="size-4" />
              Nouveau service
            </Button>
          }
        />
      ) : (
        <Card className="overflow-hidden rounded-2xl p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service</TableHead>
                <TableHead>Catégorie</TableHead>
                <TableHead>Durée</TableHead>
                <TableHead className="text-right">Prix TTC</TableHead>
                <TableHead className="text-center">Médias</TableHead>
                <TableHead className="text-center">Actif</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((s) => (
                <TableRow key={s.id}>
                  <TableCell className="font-medium">{s.title}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="rounded-full">
                      {CATEGORY_LABELS[s.category]}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDuration(s.durationMinutes)}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {formatPrice(computeTtcCents(s.priceHtCents, s.vatRate))}
                  </TableCell>
                  <TableCell className="text-center text-muted-foreground">
                    {s.media.length}
                  </TableCell>
                  <TableCell className="text-center">
                    <Switch
                      checked={s.active}
                      disabled={toggle.isPending}
                      onCheckedChange={(active) => toggle.mutate({ id: s.id, active })}
                      aria-label="Activer/désactiver"
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="sm" onClick={() => openEdit(s)}>
                        <Pencil className="size-4" />
                        Modifier
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                            <Trash2 className="size-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Supprimer ce service ?</AlertDialogTitle>
                            <AlertDialogDescription>
                              « {s.title} » et tous ses médias associés seront définitivement supprimés.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Annuler</AlertDialogCancel>
                            <AlertDialogAction onClick={() => deleteService.mutate(s.id)}>
                              Supprimer
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}

      <ServiceDialog
        key={editing?.id ?? "new"}
        service={editing}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  );
}
