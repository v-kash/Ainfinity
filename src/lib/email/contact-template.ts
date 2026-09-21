import { site } from "@/lib/site";

export type ContactSubmission = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  services: string[];
  budget?: string;
  message?: string;
};

/** Content-ID of the inline logo attachment (the navbar logo, rendered to PNG — Gmail and Outlook block SVG). */
export const LOGO_CID = "aarambh-logo";

const ACCENT = "#fd5a02";

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function layout(title: string, body: string) {
  return `<!doctype html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escape(title)}</title></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#0a0a0a;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:32px 16px;">
<tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden;">
<tr><td style="padding:32px 32px 24px;border-bottom:3px solid ${ACCENT};">
<img src="cid:${LOGO_CID}" width="140" alt="${escape(site.name)}" style="display:block;border:0;height:auto;">
</td></tr>
<tr><td style="padding:32px;">${body}</td></tr>
<tr><td style="padding:20px 32px;background:#fafafa;font-size:12px;color:#71717a;">
${escape(site.name)} · ${escape(site.contact.address)} · <a href="mailto:${site.contact.email}" style="color:${ACCENT};text-decoration:none;">${escape(site.contact.email)}</a>
</td></tr>
</table>
</td></tr>
</table>
</body></html>`;
}

function row(label: string, value?: string) {
  if (!value) return "";
  return `<tr><td style="padding:10px 0;border-bottom:1px solid #eee;font-size:13px;color:#71717a;width:120px;vertical-align:top;">${label}</td>
<td style="padding:10px 0;border-bottom:1px solid #eee;font-size:15px;">${escape(value)}</td></tr>`;
}

/** Sent to the team inbox. */
export function teamEmail(d: ContactSubmission) {
  const body = `
<h1 style="margin:0 0 8px;font-size:22px;">New enquiry from ${escape(d.name)}</h1>
<p style="margin:0 0 24px;color:#71717a;font-size:14px;">Submitted through the website contact form. Reply to this email to answer them directly.</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
${row("Name", d.name)}${row("Email", d.email)}${row("Phone", d.phone)}${row("Company", d.company)}
${row("Services", d.services.join(", "))}${row("Budget", d.budget)}
</table>
${d.message ? `<p style="margin:24px 0 8px;font-size:13px;color:#71717a;">Project details</p>
<div style="padding:16px;background:#fafafa;border-left:3px solid ${ACCENT};border-radius:4px;font-size:15px;line-height:1.6;white-space:pre-wrap;">${escape(d.message)}</div>` : ""}`;
  return { subject: `New enquiry: ${d.name}${d.company ? ` (${d.company})` : ""}`, html: layout("New enquiry", body) };
}

/** Confirmation sent back to the visitor. */
export function confirmationEmail(d: ContactSubmission) {
  const body = `
<h1 style="margin:0 0 16px;font-size:22px;">Thanks, ${escape(d.name.split(" ")[0])}.</h1>
<p style="margin:0 0 16px;font-size:15px;line-height:1.6;">We've received your message and will reply within one working day with questions, ideas and an honest estimate.</p>
${d.services.length ? `<p style="margin:0 0 16px;font-size:15px;line-height:1.6;">You asked about: <strong>${escape(d.services.join(", "))}</strong>.</p>` : ""}
<p style="margin:0;font-size:15px;line-height:1.6;">Talk soon,<br>The ${escape(site.name)} team</p>`;
  return { subject: `We got your message — ${site.name}`, html: layout("Thanks for reaching out", body) };
}
