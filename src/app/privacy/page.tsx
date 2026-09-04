import type { Metadata } from "next";
import StickyHeader from "@/components/StickyHeader";
import Footer from "@/components/Footer";
import { contactEmail } from "@/data/content";

const description =
  "Какие данные собирает сайт Школы GDD, зачем они нужны, сколько хранятся и как их удалить.";

export const metadata: Metadata = {
  title: "Политика конфиденциальности",
  description,
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Политика конфиденциальности | Школа GDD",
    description,
    url: "/privacy",
    images: [{ url: "/SEO.webp", width: 1200, height: 630, alt: "Школа GDD" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Политика конфиденциальности | Школа GDD",
    description,
    images: ["/SEO.webp"],
  },
};

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-fluid-lg font-bold leading-tight text-foreground">
        {title}
      </h2>
      <div className="flex flex-col gap-3 text-fluid-base leading-relaxed text-foreground/70">
        {children}
      </div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <>
      <StickyHeader />
      <main id="main" className="bg-white px-6 py-32 text-foreground">
        <article className="mx-auto flex max-w-[720px] flex-col gap-10">
          <header className="flex flex-col gap-3">
            <h1 className="text-fluid-3xl font-bold leading-tight">
              Политика конфиденциальности
            </h1>
            <p className="text-fluid-sm text-foreground/50">
              Обновлено 17 июля 2026 года
            </p>
          </header>

          <Section title="Кто обрабатывает ваши данные">
            <p>
              Данные собирает Алла Довгалюк — физическое лицо, автор и
              преподаватель Школы GDD. Связаться можно по адресу{" "}
              <a
                href={`mailto:${contactEmail}`}
                className="font-medium text-brand-orange underline underline-offset-4"
              >
                {contactEmail}
              </a>
              .
            </p>
          </Section>

          <Section title="Какие данные мы собираем">
            <p>
              Когда вы отправляете форму записи, мы получаем то, что вы в ней
              указали: имя, электронную почту, ник в Telegram и текст вашего
              вопроса, если вы его написали. Вместе с этим приходит выбранный
              курс и вариант оплаты.
            </p>
            <p>
              Больше ничего. Мы не собираем данные скрытно, не покупаем их на
              стороне и не просим ничего, что не нужно для ответа на вашу
              заявку.
            </p>
          </Section>

          <Section title="Зачем они нужны">
            <p>
              Только чтобы ответить вам и обсудить участие в курсе. Мы не
              рассылаем рекламу, не передаём контакты третьим лицам для
              маркетинга и не продаём их.
            </p>
          </Section>

          <Section title="Кому они передаются">
            <p>
              Заявка приходит в Telegram — сообщение уходит через сервис
              Telegram и попадает в личный чат Аллы. Значит, данные проходят
              через инфраструктуру Telegram (Telegram FZ-LLC, ОАЭ).
            </p>
            <p>
              Сам сайт работает на хостинге Vercel Inc. (США), поэтому запросы к
              сайту обрабатываются на их серверах.
            </p>
            <p>Других получателей нет.</p>
          </Section>

          <Section title="Сколько мы их храним">
            <p>
              Шесть месяцев с момента получения заявки. После этого сообщение с
              вашими данными удаляется из переписки.
            </p>
            <p>
              Если вы попросите удалить их раньше — удалим раньше, без вопросов
              и объяснений с вашей стороны.
            </p>
          </Section>

          <Section title="Файлы cookie и статистика">
            <p>
              Сайт не использует файлы cookie — ни свои, ни рекламные, ни
              чьи-либо ещё. Поэтому вы и не видите здесь надоедливого баннера про
              согласие.
            </p>
            <p>
              Мы смотрим обезличенную статистику посещений через Vercel Web
              Analytics: сколько людей открыли страницу и с какого устройства.
              Этот сервис не ставит cookie и не собирает данные, по которым можно
              узнать конкретного человека.
            </p>
          </Section>

          <Section title="Ваши права">
            <p>Вы в любой момент можете попросить нас:</p>
            <ul className="flex list-disc flex-col gap-2 pl-5">
              <li>показать, какие ваши данные у нас есть;</li>
              <li>исправить их, если что-то указано неверно;</li>
              <li>удалить их полностью;</li>
              <li>отозвать согласие на обработку.</li>
            </ul>
            <p>
              Для этого достаточно написать на{" "}
              <a
                href={`mailto:${contactEmail}`}
                className="font-medium text-brand-orange underline underline-offset-4"
              >
                {contactEmail}
              </a>
              . Мы ответим в течение 30 дней, но обычно быстрее.
            </p>
          </Section>

          <Section title="Изменения в политике">
            <p>
              Если что-то поменяется, мы обновим эту страницу и дату наверху.
              Загляните сюда, если давно не заходили.
            </p>
          </Section>
        </article>
      </main>
      <Footer />
    </>
  );
}
