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

const CONTACT_INFO = [
  {
    icon: MapPinIcon,
    title: "Our Location",
    details: ["Paris, France"]
  
  },
  {
    icon: PhoneIcon,
    title: "Phone",
    details: ["tel:0021658531531"]
    
  },
  {
    icon: EnvelopeIcon,
    title: "Email",
    details: ["General: contact@studio-ai.fr"]
    
  },
  {
    icon: ClockIcon,
    title: "Business Hours",
    details: ["Mon-Fri: 9:00 AM - 6:00 PM PST", "Sat: 10:00 AM - 4:00 PM PST", "Sun: Closed"]
  },
];

export function Contact() {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<'idle' | 'success' | 'error'>('idle');

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
      body: JSON.stringify(formData),
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
        {/* Header */}
        <div className="mb-16 text-center">
          {/* <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full mb-6">
            <EnvelopeIcon className="w-5 h-5 text-blue-600 mr-2" />
           
            <Typography variant="small" className="text-blue-700 font-semibold uppercase tracking-wider">
              Contact Us
            </Typography>
          </div> */}
          {/* @ts-ignore */}
          {/* <Typography variant="h2" className="mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Get in Touch
          </Typography> */}
          {/* @ts-ignore */}
          {/* <Typography
            variant="lead"
            className="mx-auto w-full text-gray-600 lg:w-6/12 leading-relaxed"
          >
            Ready to transform your business with AI? Let's discuss how Algora
            can help you achieve your goals.
          </Typography> */}
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Contact Information */}
          <div className="space-y-6">
            <div className="mb-8">
              {/* @ts-ignore */}
              <Typography variant="h2" className="mb-4 text-black font-bold">
  Let's Connect
</Typography>
              {/* @ts-ignore */}
              <Typography className="text-gray-600 text-lg leading-relaxed">
                Whether you're looking to implement AI solutions, need consultation,
                or want to partner with us, we'd love to hear from you.
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
                    Message Sent Successfully!
                  </Typography>
                  {/* @ts-ignore */}
                  <Typography className="text-gray-600">
                    Thank you for reaching out. We'll get back to you within 24 hours.
                  </Typography>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* @ts-ignore */}
                  <Typography variant="h5" className="mb-6 text-gray-900 font-bold">
                    Send us a Message
                  </Typography>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block mb-2">
                        {/* @ts-ignore */}
                        <Typography variant="small" className="font-semibold text-gray-900">
                          Name <span className="text-red-500 ml-1">*</span>
                        </Typography>
                      </label>
                      {/* @ts-ignore */}
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your full name"
                        required
                        className="!border-gray-300 focus:!border-blue-500 !text-gray-900"
                        labelProps={{
                          className: "hidden"
                        }}
                        containerProps={{
                          className: "!min-w-0"
                        }}
                      />
                    </div>
                    <div>
                      <label className="block mb-2">
                        {/* @ts-ignore */}
                        <Typography variant="small" className="font-semibold text-gray-900">
                          Email <span className="text-red-500 ml-1">*</span>
                        </Typography>
                      </label>
                      {/* @ts-ignore */}
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your.email@company.com"
                        required
                        className="!border-gray-300 focus:!border-blue-500 !text-gray-900"
                        labelProps={{
                          className: "hidden"
                        }}
                        containerProps={{
                          className: "!min-w-0"
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block mb-2">
                      {/* @ts-ignore */}
                      <Typography variant="small" className="font-semibold text-gray-900">
                        Company <span className="text-gray-400 text-xs">(Optional)</span>
                      </Typography>
                    </label>
                    {/* @ts-ignore */}
                    <Input
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Your company name"
                      className="!border-gray-300 focus:!border-blue-500 !text-gray-900"
                      labelProps={{
                        className: "hidden"
                      }}
                      containerProps={{
                        className: "!min-w-0"
                      }}
                    />
                  </div>

                  <div>
                    <label className="block mb-2">
                      {/* @ts-ignore */}
                      <Typography variant="small" className="font-semibold text-gray-900">
                        Message <span className="text-red-500 ml-1">*</span>
                      </Typography>
                    </label>
                    {/* @ts-ignore */}
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us about your AI needs and how we can help..."
                      rows={5}
                      required
                      className="!border-gray-300 focus:!border-blue-500 !text-gray-900"
                      labelProps={{
                        className: "hidden"
                      }}
                      containerProps={{
                        className: "!min-w-0"
                      }}
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
                        Sending...
                      </div>
                    ) : (
                      'Send Message'
                    )}
                  </Button>

                  {/* @ts-ignore */}
                  <Typography variant="small" className="text-gray-500 text-center leading-relaxed">
                    <span className="text-red-500">*</span> Required fields. 
                    We typically respond within 24 hours during business days.
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