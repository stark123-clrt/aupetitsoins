import "server-only";
import { Resend } from "resend";

/**
 * L'envoi d'e-mail est optionnel : sans clé configurée, le site continue de
 * fonctionner et les demandes restent consultables en base. On ne veut jamais
 * qu'un incident côté fournisseur fasse perdre une demande à un visiteur.
 */
function getClient(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  return key ? new Resend(key) : null;
}

const FROM = process.env.MAIL_FROM ?? "Aux Petits Soins <contact@aupetit-soin.fr>";
const TO = process.env.CONTACT_EMAIL ?? "contact@aupetit-soin.fr";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export interface ContactNotification {
  fullName: string;
  phone: string;
  email: string;
  desiredCategory: string;
  message: string;
}

/**
 * Prévient Aïssata qu'une demande vient d'arriver.
 * Renvoie false si l'envoi n'a pas pu se faire, sans jamais lever d'exception.
 */
export async function sendContactNotification(
  data: ContactNotification
): Promise<boolean> {
  const resend = getClient();
  if (!resend) {
    console.warn("RESEND_API_KEY absente : notification non envoyée.");
    return false;
  }

  const category = data.desiredCategory || "Non précisée";
  const email = data.email || "Non communiqué";

  const lines = [
    ["Nom", data.fullName],
    ["Téléphone", data.phone],
    ["E-mail", email],
    ["Prestation souhaitée", category],
  ];

  const html = `
    <div style="font-family:system-ui,-apple-system,'Segoe UI',sans-serif;color:#1f3d30;max-width:560px">
      <h2 style="margin:0 0 4px;font-size:20px">Nouvelle demande de prestation</h2>
      <p style="margin:0 0 20px;color:#7a6a55;font-size:14px">
        Reçue depuis le formulaire de contact du site.
      </p>
      <table style="border-collapse:collapse;width:100%;font-size:15px">
        ${lines
          .map(
            ([label, value]) => `
          <tr>
            <td style="padding:8px 12px 8px 0;color:#7a6a55;white-space:nowrap">${label}</td>
            <td style="padding:8px 0"><strong>${escapeHtml(value)}</strong></td>
          </tr>`
          )
          .join("")}
      </table>
      <div style="margin-top:20px;padding:16px;background:#f7f3ec;border-radius:12px">
        <div style="color:#7a6a55;font-size:13px;margin-bottom:6px">Message</div>
        <div style="white-space:pre-wrap;font-size:15px;line-height:1.6">${escapeHtml(
          data.message
        )}</div>
      </div>
    </div>`;

  const text = [
    "Nouvelle demande de prestation",
    "",
    ...lines.map(([label, value]) => `${label} : ${value}`),
    "",
    "Message :",
    data.message,
  ].join("\n");

  try {
    const { error } = await resend.emails.send({
      from: FROM,
      to: [TO],
      subject: `Demande de ${data.fullName} — ${category}`,
      html,
      text,
      // Permet de répondre directement au visiteur depuis sa boîte mail.
      ...(data.email ? { replyTo: data.email } : {}),
    });

    if (error) {
      console.error("Envoi de la notification échoué :", error);
      return false;
    }
    return true;
  } catch (err) {
    console.error("Envoi de la notification échoué :", err);
    return false;
  }
}
