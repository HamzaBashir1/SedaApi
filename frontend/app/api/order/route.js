// Receives orders from the website form.
//
// Delivery (set in .env.local or in Vercel project settings):
//   RESEND_API_KEY + ORDER_TO_EMAIL  -> sends an email through Resend (resend.com)
//   ORDER_WEBHOOK_URL                -> posts the order as JSON (Slack, Zapier, Make, your backend…)
// You can set both. If neither is set, the order is printed to the server log in development,
// and the form asks the visitor to email it instead in production.

const MAX = { message: 5000, short: 200 };

function clean(v, max = MAX.short) {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  // Spam trap: real visitors never fill this hidden field.
  if (clean(body.website)) return Response.json({ ok: true });

  const order = {
    kind: body.kind === "partner" ? "partner" : "project",
    services: Array.isArray(body.services) ? body.services.map((s) => clean(s)).filter(Boolean).slice(0, 10) : [],
    model: clean(body.model),
    budget: clean(body.budget),
    timeline: clean(body.timeline),
    industry: clean(body.industry),
    link: clean(body.link, 500),
    message: clean(body.message, MAX.message),
    name: clean(body.name),
    company: clean(body.company),
    email: clean(body.email),
    phone: clean(body.phone),
    country: clean(body.country),
    receivedAt: new Date().toISOString(),
  };

  if (!order.name || !/^\S+@\S+\.\S+$/.test(order.email) || !order.services.length || order.message.length < 10) {
    return Response.json({ ok: false, error: "Missing required fields" }, { status: 422 });
  }

  const subject = `${order.kind === "partner" ? "Partner request" : "New order"}: ${order.services.join(", ")} – ${order.name}`;
  const text = [
    subject, "",
    `Services: ${order.services.join(", ")}`, `Way to work: ${order.model}`, `Budget: ${order.budget}`,
    `Start: ${order.timeline}`, `Industry: ${order.industry}`, `Brief link: ${order.link || "-"}`, "",
    `Name: ${order.name}`, `Company: ${order.company || "-"}`, `Email: ${order.email}`,
    `Phone: ${order.phone || "-"}`, `Country: ${order.country}`, "", "Project:", order.message,
  ].join("\n");

  const tasks = [];

  if (process.env.RESEND_API_KEY && process.env.ORDER_TO_EMAIL) {
    tasks.push(
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: process.env.ORDER_FROM_EMAIL || "SEDAAPI Website <onboarding@resend.dev>",
          to: process.env.ORDER_TO_EMAIL.split(",").map((s) => s.trim()),
          reply_to: order.email,
          subject,
          text,
        }),
      })
    );
  }

  if (process.env.ORDER_WEBHOOK_URL) {
    tasks.push(
      fetch(process.env.ORDER_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, order }),
      })
    );
  }

  if (!tasks.length) {
    console.log("[order] No delivery configured. Order received:\n" + text);
    if (process.env.NODE_ENV === "production") {
      return Response.json({ ok: false, error: "Delivery not configured" }, { status: 503 });
    }
    return Response.json({ ok: true, delivered: false });
  }

  const results = await Promise.allSettled(tasks);
  const delivered = results.some((r) => r.status === "fulfilled" && r.value.ok);
  if (!delivered) {
    console.error("[order] Delivery failed", results);
    return Response.json({ ok: false, error: "Delivery failed" }, { status: 502 });
  }
  return Response.json({ ok: true });
}
