"use server";

/**
 * Server action that ships booking-form submissions to Telegram. Reads the
 * bot token + chat id from env vars (`TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`)
 * and POSTs to the Bot API's `sendMessage` endpoint. Runs server-side only —
 * the token never reaches the browser.
 *
 * Returns `{ ok: true }` on success or `{ ok: false, error }` on failure;
 * the client uses that to flip between success / error UI without exposing
 * any infra detail.
 */

export type BookingPayload = {
  course: string;
  parts: number;
  priceValue: number;
  currency: string;
  name: string;
  email: string;
  telegram: string;
  note: string;
};

// Russian noun declension for "часть": 1 часть, 2–4 части, 5+ частей.
// Handles the 11–14 exception range.
const pluralizeParts = (n: number) => {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod100 >= 11 && mod100 <= 14) return "частей";
  if (mod10 === 1) return "часть";
  if (mod10 >= 2 && mod10 <= 4) return "части";
  return "частей";
};

const paymentLine = (p: BookingPayload) => {
  const total = `${p.currency}${p.priceValue}`;
  if (p.parts <= 1) {
    return `Оплата: целиком, ${total}`;
  }
  const perPart = Math.round(p.priceValue / p.parts);
  return `Оплата: ${p.parts} ${pluralizeParts(p.parts)} по ${p.currency}${perPart} (итого ${total})`;
};

const linesFromPayload = (p: BookingPayload) => {
  const out = [
    "🎓 Новая заявка на курс",
    "",
    `Курс: ${p.course}`,
    paymentLine(p),
    "",
    `Имя: ${p.name}`,
    `Email: ${p.email}`,
    `Telegram: ${p.telegram}`,
  ];
  if (p.note.trim()) {
    out.push("", "Вопросы:", p.note.trim());
  }
  return out.join("\n");
};

export async function submitBooking(
  payload: BookingPayload
): Promise<{ ok: true } | { ok: false; error: string }> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    return {
      ok: false,
      error:
        "Сервер не настроен. Свяжитесь с нами напрямую через Telegram или email.",
    };
  }

  try {
    const res = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: linesFromPayload(payload),
          // No parse_mode — keep raw text so user-supplied notes can't break
          // markdown / HTML rendering on Telegram's side.
          disable_web_page_preview: true,
        }),
      }
    );

    if (!res.ok) {
      const detail = await res.text().catch(() => res.statusText);
      console.error("Telegram sendMessage failed:", res.status, detail);
      return {
        ok: false,
        error: "Не удалось отправить заявку. Попробуйте ещё раз через минуту.",
      };
    }
    return { ok: true };
  } catch (err) {
    console.error("Telegram sendMessage threw:", err);
    return {
      ok: false,
      error: "Не удалось отправить заявку. Попробуйте ещё раз через минуту.",
    };
  }
}
