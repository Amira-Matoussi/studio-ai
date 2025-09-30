"use client";
import React from "react";
import {
  Typography,
  Card,
  CardBody,
  Button,
  Input,
  Textarea,
} from "@material-tailwind/react";
import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  ClockIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/solid";
import { useLanguage } from "@/contexts/LanguageContext";

const TRANSLATIONS = {
  en: {
    title: "Let's Connect",
    subtitle: "Whether you're looking to implement AI solutions, need consultation, or want to partner with us, we'd love to hear from you.",
    contactInfo: {
      location: "Our Location",
      phone: "Phone",
      email: "Email",
      hours: "Business Hours"
    },
    contactDetails: {
      address: ["8 T PLACE HENRI D'ASTIER, 94220 CHARENTON-LE-PONT, FRANCE"],
      phone: ["tel:0744318080"],
      email: ["General: contact@studio-ai.fr"],
      hours: ["Mon-Fri: 9:00 AM - 6:00 PM PST", "Sat: 10:00 AM - 4:00 PM PST", "Sun: Closed"]
    },
    form: {
      title: "Send us a Message",
      name: "Name",
      email: "Email",
      company: "Company",
      message: "Message",
      optional: "(Optional)",
      required: "*",
      namePlaceholder: "Your full name",
      emailPlaceholder: "your.email@company.com",
      companyPlaceholder: "Your company name",
      messagePlaceholder: "Tell us about your AI needs and how we can help...",
      sendButton: "Send Message",
      sending: "Sending...",
      footer: "Required fields. We typically respond within 24 hours during business days."
    },
    success: {
      title: "Message Sent Successfully!",
      message: "Thank you for reaching out. We'll get back to you within 24 hours."
    }
  },
  fr: {
    title: "Restons en Contact",
    subtitle: "Que vous cherchiez à implémenter des solutions IA, ayez besoin de consultation ou souhaitiez devenir partenaire, nous serions ravis de vous entendre.",
    contactInfo: {
      location: "Notre Localisation",
      phone: "Téléphone",
      email: "E-mail",
      hours: "Horaires d'Ouverture"
    },
    contactDetails: {
      address: ["8 T PLACE HENRI D'ASTIER, 94220 CHARENTON-LE-PONT, FRANCE"],
      phone: ["tel:0744318080"],
      email: ["Général: contact@studio-ai.fr"],
      hours: ["Lun-Ven: 9h00 - 18h00 PST", "Sam: 10h00 - 16h00 PST", "Dim: Fermé"]
    },
    form: {
      title: "Envoyez-nous un Message",
      name: "Nom",
      email: "E-mail",
      company: "Entreprise",
      message: "Message",
      optional: "(Optionnel)",
      required: "*",
      namePlaceholder: "Votre nom complet",
      emailPlaceholder: "votre.email@entreprise.com",
      companyPlaceholder: "Nom de votre entreprise",
      messagePlaceholder: "Parlez-nous de vos besoins en IA et comment nous pouvons vous aider...",
      sendButton: "Envoyer le Message",
      sending: "Envoi en cours...",
      footer: "Champs obligatoires. Nous répondons généralement sous 24 heures pendant les jours ouvrables."
    },
    success: {
      title: "Message Envoyé avec Succès!",
      message: "Merci de nous avoir contactés. Nous vous répondrons dans les 24 heures."
    }
  }
};

export function Contact() {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language];
  
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<'idle' | 'success' | 'error'>('idle');

  const CONTACT_INFO = [
    {
      icon: MapPinIcon,
      title: t.contactInfo.location,
      details: t.contactDetails.address
    },
    {
      icon: PhoneIcon,
      title: t.contactInfo.phone,
      details: t.contactDetails.phone
    },
    {
      icon: EnvelopeIcon,
      title: t.contactInfo.email,
      details: t.contactDetails.email
    },
    {
      icon: ClockIcon,
      title: t.contactInfo.hours,
      details: t.contactDetails.hours
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, language }),
      });

      if (res.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", company: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="px-8 pt-8 pb-32">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Contact Information */}
          <div className="space-y-6">
            <div className="mb-8">
              {/* @ts-ignore */}
              <Typography variant="h2" className="mb-4 text-black font-bold">
                {t.title}
              </Typography>
              {/* @ts-ignore */}
              <Typography className="text-gray-600 text-lg leading-relaxed">
                {t.subtitle}
              </Typography>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {CONTACT_INFO.map(({ icon: Icon, title, details }, idx) => (
                <div key={idx} className="group">
                  {/* @ts-ignore */}
                  <Card className="h-full border-0 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white/80 backdrop-blur-sm">
                    {/* @ts-ignore */}
                    <CardBody className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-lg bg-black shadow-lg hover:bg-gray-900 transition-colors duration-200">
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          {/* @ts-ignore */}
                          <Typography variant="h6" className="mb-2 text-gray-900 font-semibold">
                            {title}
                          </Typography>
                          <div className="space-y-1">
                            {details.map((detail, detailIdx) => (
                              /* @ts-ignore */
                              <Typography key={detailIdx} className="text-gray-600 text-sm leading-relaxed">
                                {detail}
                              </Typography>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          {/* @ts-ignore */}
          <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
            {/* @ts-ignore */}
            <CardBody className="p-8">
              {submitStatus === 'success' ? (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                    <CheckCircleIcon className="w-8 h-8 text-green-600" />
                  </div>
                  {/* @ts-ignore */}
                  <Typography variant="h5" className="mb-2 text-gray-900">
                    {t.success.title}
                  </Typography>
                  {/* @ts-ignore */}
                  <Typography className="text-gray-600">
                    {t.success.message}
                  </Typography>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* @ts-ignore */}
                  <Typography variant="h5" className="mb-6 text-gray-900 font-bold">
                    {t.form.title}
                  </Typography>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block mb-2">
                        {/* @ts-ignore */}
                        <Typography variant="small" className="font-semibold text-gray-900">
                          {t.form.name} <span className="text-red-500 ml-1">{t.form.required}</span>
                        </Typography>
                      </label>
                      {/* @ts-ignore */}
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder={t.form.namePlaceholder}
                        required
                        className="!border-gray-300 focus:!border-blue-500 !text-gray-900"
                        labelProps={{ className: "hidden" }}
                        containerProps={{ className: "!min-w-0" }}
                      />
                    </div>
                    <div>
                      <label className="block mb-2">
                        {/* @ts-ignore */}
                        <Typography variant="small" className="font-semibold text-gray-900">
                          {t.form.email} <span className="text-red-500 ml-1">{t.form.required}</span>
                        </Typography>
                      </label>
                      {/* @ts-ignore */}
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder={t.form.emailPlaceholder}
                        required
                        className="!border-gray-300 focus:!border-blue-500 !text-gray-900"
                        labelProps={{ className: "hidden" }}
                        containerProps={{ className: "!min-w-0" }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block mb-2">
                      {/* @ts-ignore */}
                      <Typography variant="small" className="font-semibold text-gray-900">
                        {t.form.company} <span className="text-gray-400 text-xs">{t.form.optional}</span>
                      </Typography>
                    </label>
                    {/* @ts-ignore */}
                    <Input
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder={t.form.companyPlaceholder}
                      className="!border-gray-300 focus:!border-blue-500 !text-gray-900"
                      labelProps={{ className: "hidden" }}
                      containerProps={{ className: "!min-w-0" }}
                    />
                  </div>

                  <div>
                    <label className="block mb-2">
                      {/* @ts-ignore */}
                      <Typography variant="small" className="font-semibold text-gray-900">
                        {t.form.message} <span className="text-red-500 ml-1">{t.form.required}</span>
                      </Typography>
                    </label>
                    {/* @ts-ignore */}
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder={t.form.messagePlaceholder}
                      rows={5}
                      required
                      className="!border-gray-300 focus:!border-blue-500 !text-gray-900"
                      labelProps={{ className: "hidden" }}
                      containerProps={{ className: "!min-w-0" }}
                    />
                  </div>

                  {/* @ts-ignore */}
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 text-base font-semibold transition-colors duration-200 disabled:opacity-50 shadow-lg rounded-xl" 
                    size="lg"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        {t.form.sending}
                      </div>
                    ) : (
                      t.form.sendButton
                    )}
                  </Button>

                  {/* @ts-ignore */}
                  <Typography variant="small" className="text-gray-500 text-center leading-relaxed">
                    <span className="text-red-500">{t.form.required}</span> {t.form.footer}
                  </Typography>
                </form>
              )}
            </CardBody>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default Contact;