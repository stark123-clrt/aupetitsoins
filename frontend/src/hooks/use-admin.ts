import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  approveComment,
  createService,
  deleteComment,
  deleteMedia,
  deleteService,
  getAdminComments,
  getAdminServices,
  toggleService,
  updateService,
  uploadMedia,
  type ServiceInput,
} from "@/api/admin.api";
import { queryKeys } from "./keys";

function invalidateServices(qc: ReturnType<typeof useQueryClient>) {
  qc.invalidateQueries({ queryKey: queryKeys.adminServices() });
  qc.invalidateQueries({ queryKey: ["services"] });
  qc.invalidateQueries({ queryKey: ["service"] });
}

export function useAdminServices() {
  return useQuery({
    queryKey: queryKeys.adminServices(),
    queryFn: getAdminServices,
  });
}

export function useCreateService() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: ServiceInput) => createService(input),
    onSuccess: () => {
      invalidateServices(qc);
      toast.success("Service créé");
    },
    onError: (e: Error) => toast.error(e.message),
  });
}

export function useUpdateService() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: Partial<ServiceInput> }) =>
      updateService(id, input),
    onSuccess: () => {
      invalidateServices(qc);
      toast.success("Service mis à jour");
    },
    onError: (e: Error) => toast.error(e.message),
  });
}

export function useDeleteService() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteService(id),
    onSuccess: () => {
      invalidateServices(qc);
      toast.success("Service supprimé");
    },
    onError: (e: Error) => toast.error(e.message),
  });
}

export function useToggleService() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, active }: { id: string; active: boolean }) =>
      toggleService(id, active),
    onSuccess: () => {
      invalidateServices(qc);
      toast.success("Statut du service modifié");
    },
    onError: (e: Error) => toast.error(e.message),
  });
}

export function useUploadMedia() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ serviceId, file }: { serviceId: string; file: File }) =>
      uploadMedia(serviceId, file),
    onSuccess: () => {
      invalidateServices(qc);
      toast.success("Média ajouté");
    },
    onError: (e: Error) => toast.error(e.message),
  });
}

export function useDeleteMedia() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteMedia(id),
    onSuccess: () => {
      invalidateServices(qc);
      toast.success("Média supprimé");
    },
    onError: (e: Error) => toast.error(e.message),
  });
}

export function useAdminComments() {
  return useQuery({
    queryKey: queryKeys.adminComments(),
    queryFn: getAdminComments,
  });
}

export function useApproveComment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => approveComment(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.adminComments() });
      qc.invalidateQueries({ queryKey: ["service-comments"] });
      toast.success("Commentaire approuvé");
    },
    onError: (e: Error) => toast.error(e.message),
  });
}

export function useDeleteComment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteComment(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.adminComments() });
      qc.invalidateQueries({ queryKey: ["service-comments"] });
      toast.success("Commentaire supprimé");
    },
    onError: (e: Error) => toast.error(e.message),
  });
}
