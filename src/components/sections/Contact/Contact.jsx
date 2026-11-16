// src/sections/Contact/Contact.jsx
import { useRef, useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import emailjs from "@emailjs/browser";
import Reveal from "../../common/Reveal/Reveal";
import "./Contact.css";

/* IDs públicos de EmailJS */
const SERVICE_ID = "service_ed2rlr9";
const TEMPLATE_ID = "template_4tzqzgl";
const PUBLIC_KEY  = "EbEldik7lyNTXM7a4";

export default function Contact() {
  const { t } = useTranslation();
  const formRef = useRef(null);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errMsg, setErrMsg] = useState("");
  const [selectedPackage, setSelectedPackage] = useState("mvp");

  const packageOptions = useMemo(() => {
    return t("contact.packageOptions", { returnObjects: true }) || {
      mvp: "🚀 MVP Launch Sprint (3-4 Semanas)",
      ai: "🤖 AI Agents & Automatización n8n (1-2 Semanas)",
      fractional: "👑 Fractional Tech Lead (Retainer Mensual)",
      enterprise: "🏢 Desarrollo a Medida para Empresas",
      audit: "🔍 Auditoría Técnica & UX Express (72h)",
      custom: "💬 Consulta General / Otro Proyecto"
    };
  }, [t]);

  // Listen to select-package events dispatched from Packages section cards
  useEffect(() => {
    const handleCustomSelect = (e) => {
      if (e.detail && packageOptions[e.detail]) {
        setSelectedPackage(e.detail);
      } else if (e.detail) {
        setSelectedPackage(e.detail);
      }
    };
    window.addEventListener("select-package", handleCustomSelect);
    return () => window.removeEventListener("select-package", handleCustomSelect);
  }, [packageOptions]);

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
    const company = fd.get("company")?.toString().trim() || "";
    const referral = fd.get("referral")?.toString().trim() || "";
    const message = fd.get("message")?.toString().trim();
    const chosenPackageLabel = packageOptions[selectedPackage] || selectedPackage;

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
      company: company || "N/A",
      business_name: company || "N/A",
      referral: referral || "N/A",
      coupon: referral || "N/A",
      project_type: chosenPackageLabel,
      message: `[Modelo / Paquete: ${chosenPackageLabel}]${company ? `\n[Empresa / Negocio: ${company}]` : ""}${referral ? `\n[Cupón / Referido: ${referral}]` : ""}\n\n${message}`,
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
      <div className="container contact-grid-wrapper">
        {/* Left Column: Direct Info */}
        <Reveal variant="fade-up">
          <div className="contact-info-col">
            <div className="tech-eyebrow">
              {t("contact.eyebrow", { defaultValue: "// BOOK A CALL / CONTACT" })}
            </div>
            <h2 id="contact-title" className="section-title">
              {t("contact.title", { defaultValue: "LET'S DISCUSS YOUR NEXT PROJECT" })}
              <span className="dot">.</span>
            </h2>

            <div className="contact-trust-pill">
              <span className="trust-dot"></span>
              <span>{t("contact.trustBadge", { defaultValue: "⚡ RESPONSE TIME < 2H // DIRECT TO SENIOR ENGINEER" })}</span>
            </div>

            <p className="contact-lead-desc">
              {t("contact.subtitle", {
                defaultValue: "Whether you are a startup validating a new product or an established business modernizing engineering and operations with AI, let's talk directly without commercial middlemen."
              })}
            </p>

            <div className="contact-direct-pills">
              <a 
                href="https://wa.me/18293971011?text=Hola%20Whilmis,%20vi%20tu%20portafolio%20y%20me%20gustar%C3%ADa%20conversar%20sobre%20un%20proyecto" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="contact-pill-item"
              >
                <span className="contact-pill-icon">💬</span>
                <div className="contact-pill-meta">
                  <span className="pill-label">WHATSAPP DIRECT (FAST CHAT)</span>
                  <span className="pill-val">+1 829 397 1011</span>
                </div>
              </a>

              <a href="tel:+34607197493" className="contact-pill-item">
                <span className="contact-pill-icon">📞</span>
                <div className="contact-pill-meta">
                  <span className="pill-label">PHONE (SPAIN / EU)</span>
                  <span className="pill-val">+34 607 197 493</span>
                </div>
              </a>

              <a href="mailto:whilmisperez@gmail.com" className="contact-pill-item">
                <span className="contact-pill-icon">✉️</span>
                <div className="contact-pill-meta">
                  <span className="pill-label">EMAIL DIRECT</span>
                  <span className="pill-val">WHILMISPEREZ@GMAIL.COM</span>
                </div>
              </a>
            </div>
          </div>
        </Reveal>

        {/* Right Column: High-tech Form */}
        <Reveal variant="fade-up" delay={80}>
          <div className="contact-form-card">
            <div className="contact-form-header">
              <span className="form-indicator-dot"></span>
              <span className="form-header-tag">SYS://PROJECT_ENGAGEMENT_DISPATCH</span>
            </div>

            <form ref={formRef} className="contact-form" onSubmit={onSubmit} noValidate>
              {/* honeypot invisible */}
              <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hp" />

              {/* Package Selector Pills */}
              <div className="contact-package-selector-block">
                <span className="field-label">
                  {t("contact.packageSelectorTitle", { defaultValue: "SELECT SERVICE OR PACKAGE:" })}
                </span>
                <div className="contact-package-chips-grid">
                  {Object.entries(packageOptions).map(([key, label]) => {
                    const isSelected = selectedPackage === key;
                    return (
                      <button
                        key={key}
                        type="button"
                        className={`contact-package-chip ${isSelected ? "active" : ""}`}
                        onClick={() => setSelectedPackage(key)}
                        aria-pressed={isSelected}
                      >
                        <span className="chip-indicator">
                          {isSelected && <span className="chip-indicator-dot"></span>}
                        </span>
                        <span className="chip-label">{label}</span>
                      </button>
                    );
                  })}
                </div>
                <input
                  type="hidden"
                  name="project_type"
                  value={packageOptions[selectedPackage] || selectedPackage}
                />
              </div>

              <div className="contact-fields-row">
                <label className="contact-field-group">
                  <span className="field-label">{t("contact.form.name", { defaultValue: "FULL NAME" })} *</span>
                  <input name="name" type="text" placeholder="John Doe" required />
                </label>

                <label className="contact-field-group">
                  <span className="field-label">{t("contact.form.phone", { defaultValue: "EMAIL / PHONE" })} *</span>
                  <input name="phone" type="text" placeholder="john@company.com" />
                </label>
              </div>

              <div className="contact-fields-row">
                <label className="contact-field-group">
                  <div className="field-label-wrapper">
                    <span className="field-label">
                      {t("contact.form.company", { defaultValue: "EMPRESA / NEGOCIO" })}
                    </span>
                    <span className="field-badge-optional">
                      {t("contact.form.optional", { defaultValue: "OPCIONAL" })}
                    </span>
                  </div>
                  <input
                    name="company"
                    type="text"
                    placeholder="Ej. Acme Corp, Startup..."
                  />
                </label>

                <label className="contact-field-group">
                  <div className="field-label-wrapper">
                    <span className="field-label">
                      {t("contact.form.referral", { defaultValue: "CUPÓN / REFERIDO" })}
                    </span>
                    <span className="field-badge-optional">
                      {t("contact.form.optional", { defaultValue: "OPCIONAL" })}
                    </span>
                  </div>
                  <input
                    name="referral"
                    type="text"
                    placeholder="Ej. HORMESIS2026, VIP..."
                    className="contact-input-referral"
                    autoCapitalize="characters"
                  />
                </label>
              </div>

              <label className="contact-field-group">
                <span className="field-label">{t("contact.form.message", { defaultValue: "PROJECT BRIEF / MESSAGE" })}</span>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Cuéntame sobre tu proyecto, objetivos técnicos, plazos estimados o retos de arquitectura..."
                  required
                ></textarea>
              </label>

              <button className="btn-primary contact-submit-btn" type="submit" disabled={status === "sending"}>
                {status === "sending"
                  ? t("contact.form.sending", { defaultValue: "SENDING IN PROGRESS..." })
                  : t("contact.form.send", { defaultValue: "SEND MESSAGE" }) + " >"}
              </button>

              <div className="form-status" aria-live="polite">
                {status === "success" && (
                  <p className="ok">
                    {t("contact.form.sent", {
                      defaultValue: "Message delivered successfully. I will get back to you shortly!"
                    })}
                  </p>
                )}
                {status === "error" && <p className="err">{errMsg}</p>}
              </div>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
