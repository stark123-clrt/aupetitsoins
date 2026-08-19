"use server";

import { prisma } from "@/lib/prisma";

export interface ContactFormState {
  error?: string;
  success?: boolean;
}

export async function submitContactRequest(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const fullName = String(formData.get("fullName") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const desiredCategory = String(formData.get("desiredCategory") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!fullName || !phone || !message) {
    return { error: "Merci de renseigner votre nom, votre téléphone et votre message." };
  }

  await prisma.contactRequest.create({
    data: { fullName, phone, email, desiredCategory, message },
  });

  return { success: true };
}
