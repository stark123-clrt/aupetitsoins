"use server";

import { prisma } from "@/lib/prisma";
import { sendContactNotification } from "@/lib/mail";

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

  // La base fait foi : on enregistre d'abord, on notifie ensuite. Si l'e-mail
  // échoue, la demande n'est pas perdue pour autant.
  await prisma.contactRequest.create({
    data: { fullName, phone, email, desiredCategory, message },
  });

  await sendContactNotification({
    fullName,
    phone,
    email,
    desiredCategory,
    message,
  });

  return { success: true };
}
