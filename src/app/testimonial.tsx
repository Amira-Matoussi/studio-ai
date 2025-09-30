"use client";

import Image from "next/image";
import { Typography, Card, CardBody, Avatar } from "@material-tailwind/react";
import { useLanguage } from "@/contexts/LanguageContext";

const TRANSLATIONS = {
  en: {
    badge: "SUCCESS STORY",
    title: "Healthcare AI Revolution",
    description: "Our AI-powered diagnostic system has transformed patient care by reducing diagnosis time by 75% and improving accuracy by 40%. This breakthrough is now helping healthcare providers worldwide.",
    features: [
      "Deployed in 15+ countries worldwide",
      "FDA approved and certified"
    ],
    clientName: "Dr. Sarah Chen",
    clientRole: "Chief Medical Officer @MedTech Solutions"
  },
  fr: {
    badge: "HISTOIRE DE SUCCÈS",
    title: "Révolution de l'IA en Santé",
    description: "Notre système de diagnostic alimenté par l'IA a transformé les soins aux patients en réduisant le temps de diagnostic de 75% et en améliorant la précision de 40%. Cette percée aide maintenant les prestataires de soins de santé du monde entier.",
    features: [
      "Déployé dans plus de 15 pays dans le monde",
      "Approuvé et certifié par la FDA"
    ],
    clientName: "Dr. Sarah Chen",
    clientRole: "Directrice Médicale @MedTech Solutions"
  }
};

function TESTIMONIAL() {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language];

  return (
    <section className="px-8 py-40">
      <div className="container mx-auto">
        {/* @ts-ignore */}
        <Card color="transparent" shadow={false} className="">
          {/* @ts-ignore */}
          <CardBody className="col-span-full gap-10 place-items-center overflow-visible grid grid-cols-1 lg:grid-cols-4">
            <div className="w-full xl:w-[600px] flex items-center overflow-hidden rounded-xl justify-center col-span-2 h-full">
              <Image
                width={768}
                height={768}
                src="/image/blogs/blog6.svg"
                alt="AI solution success story"
                className="w-full h-full scale-110 object-cover"
              />
            </div>
            <div className="col-span-2 w-full">
              {/* @ts-ignore */}
              <Typography variant="h6" color="blue" className="mb-4">
                {t.badge}
              </Typography>
              {/* @ts-ignore */}
              <Typography
                variant="h3"
                color="blue-gray"
                className="mb-4 font-bold"
              >
                {t.title}
              </Typography>
              {/* @ts-ignore */}
              <Typography className="mb-1 w-full font-normal !text-gray-500">
                {t.description}
              </Typography>
              <div className="grid mb-4">
                {t.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="h-1 w-1 bg-gray-500 rounded-full" />
                    {/* @ts-ignore */}
                    <Typography className="w-full font-normal !text-gray-500">
                      {feature}
                    </Typography>
                  </div>
                ))}
              </div>
              <div className="flex items-center mt-8 gap-4">
                {/* @ts-ignore */}
                <Avatar
                  variant="circular"
                  src="/image/avatar3.jpg"
                  alt="client"
                  size="md"
                />
                <div>
                  {/* @ts-ignore */}
                  <Typography variant="h6" color="blue-gray" className="mb-0.5">
                    {t.clientName}
                  </Typography>
                  {/* @ts-ignore */}
                  <Typography
                    variant="small"
                    className="font-normal !text-gray-500"
                  >
                    {t.clientRole}
                  </Typography>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </section>
  );
}

export default TESTIMONIAL;