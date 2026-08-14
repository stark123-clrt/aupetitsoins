import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  type CommentInput,
  getService,
  getServiceComments,
  getServices,
  postServiceComment,
} from "@/api/services.api";
import { queryKeys } from "./keys";

export function useServices(category?: string) {
  return useQuery({
    queryKey: queryKeys.services(category),
    queryFn: () => getServices(category),
  });
}

export function useService(slug: string) {
  return useQuery({
    queryKey: queryKeys.service(slug),
    queryFn: () => getService(slug),
    enabled: !!slug,
  });
}

export function useServiceComments(slug: string) {
  return useQuery({
    queryKey: queryKeys.serviceComments(slug),
    queryFn: () => getServiceComments(slug),
    enabled: !!slug,
  });
}

export function usePostComment(slug: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: CommentInput) => postServiceComment(slug, input),
    onSuccess: () => {
      toast.success("Merci ! Votre commentaire sera visible après validation.");
    },
    onError: (e: Error) => toast.error(e.message),
  });
}
