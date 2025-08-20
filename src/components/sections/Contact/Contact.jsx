// src/sections/Contact/Contact.jsx
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import emailjs from "@emailjs/browser";
import Reveal from "../../common/Reveal/Reveal";
import "./Contact.css";

/* Reemplaza por tus IDs públicos de EmailJS */
const SERVICE_ID = "service_ed2rlr9";
const TEMPLATE_ID = "template_4tzqzgl";
const PUBLIC_KEY  = "EbEldik7lyNTXM7a4";

export default function Contact() {
  const { t } = useTranslation();
  const formRef = useRef(null);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errMsg, setErrMsg] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrMsg("");

    const fd = new FormData(formRef.current);

    // Honeypot anti-spam
    if (fd.get("website")) {
      setStatus("success");
      formRef.current.reset();
      return;
    }

    const name = fd.get("name")?.toString().trim();
    const phone = fd.get("phone")?.toString().trim();
    const message = fd.get("message")?.toString().trim();

    // ✅ Usa defaultValue para evitar que se muestre la clave sin traducir
    if (!name || !message || message.length < 10) {
      setStatus("error");
      setErrMsg(
        t("contact.form.validation", {
          defaultValue: "Por favor escribe tu nombre y un mensaje (10+ caracteres)."
        })
      );
      return;
    }

    const templateParams = {
      name,
      phone,
      message,
      page: window.location.href,
      date: new Date().toLocaleString()
    };

    try {
      setStatus("sending");
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, { publicKey: PUBLIC_KEY });
      setStatus("success");
      formRef.current.reset();
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrMsg(
        t("contact.form.failed", {
          defaultValue: "No se pudo enviar. Intenta más tarde."
        })
      );
    }
  };

  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <div className="container contact-grid">
        <Reveal variant="fade-up">
          <div className="contact-copy">
            <h2 id="contact-title" className="section-title">{t("contact.title")}</h2>
            <p className="section-sub">{t("contact.subtitle")}</p>
            <p className="section-desc">{t("contact.text")}</p>

            <ul className="contact-list">
              <li><span className="icon">📞</span><span>{t("contact.phoneLabel")}: <strong>+34 607 197 493</strong></span></li>
              <li><span className="icon">✉️</span><span>{t("contact.emailLabel")}: <strong>whilmisweb@gmail.com</strong></span></li>
            </ul>
          </div>
        </Reveal>

        <Reveal variant="fade-up" delay={80}>
          <form ref={formRef} className="contact-form" onSubmit={onSubmit} noValidate>
            {/* honeypot invisible */}
            <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hp" />

            <label className="field">
              <span>{t("contact.form.name")}</span>
              <input name="name" type="text" placeholder="John Doe" required />
            </label>

            <label className="field">
              <span>{t("contact.form.phone")}</span>
              <input name="phone" type="tel" placeholder="+34 600 000 000" />
            </label>

            <label className="field">
              <span>{t("contact.form.message")}</span>
              <textarea name="message" rows={6} placeholder="Cuéntame sobre tu proyecto…" required></textarea>
            </label>

            <button className="btn-send" type="submit" disabled={status === "sending"}>
              {status === "sending" ? t("contact.form.sending", { defaultValue: "Enviando…" }) : t("contact.form.send", { defaultValue: "Enviar" })}
            </button>

            <div className="form-status" aria-live="polite">
              {status === "success" && <p className="ok">{t("contact.form.sent", { defaultValue: "Mensaje enviado. ¡Gracias!" })}</p>}
              {status === "error"   && <p className="err">{errMsg}</p>}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
