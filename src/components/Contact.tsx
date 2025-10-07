import React, { useState, useEffect } from "react";
import { Send, Mail, Phone, MapPin, ExternalLink, CheckCircle, User, AtSign, FileText, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { ShineBorder } from "@/components/ui/shine-border";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.id]: e.target.value
    });
  };

  // Update handleSubmit to use EmailJS
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    emailjs.send(
      "service_qepo5nu",      // Replace with your EmailJS service ID
      "template_d16c59j",     // Replace with your EmailJS template ID
      {
        from_name: formState.name,
        from_email: formState.email,
        subject: formState.subject,
        message: formState.message,
      },
      "rsqkXvYNlgt7dKMNA"       // Replace with your EmailJS public key (user ID)
    )
      .then((result) => {
        console.log("EmailJS result:", result);
        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormState({ name: "", email: "", subject: "", message: "" });
      })
      .catch((error) => {
        console.error("EmailJS error:", error);
        setIsSubmitting(false);
        const message =
          (error && (error.text || error.message)) ||
          "Failed to send message. Please try again later.";
        setErrorMessage(message);
      });
  };

  useEffect(() => {
    // Initialize EmailJS with public key for better reliability
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      emailjs.init("rsqkXvYNlgt7dKMNA");
    } catch (err) {
      // ignore init errors; send(..., publicKey) still works but init helps debugging
      console.warn("EmailJS init warning:", err);
    }
  }, []);

  const createMailtoLink = () => {
    const to = "ankitshaw6933@gmail.com";
    const subject = encodeURIComponent(formState.subject || "Contact from portfolio");
    const body = encodeURIComponent(`Name: ${formState.name}\nEmail: ${formState.email}\n\n${formState.message}`);
    return `mailto:${to}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-12 bg-gradient-to-b from-white to-gray-50/80">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Get In Touch</h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have a project in mind or want to discuss collaboration opportunities?
            I'd love to hear from you and explore how we can work together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className=""
          >
            {/* Contact Information Card */}
            <div className="bg-white rounded-2xl shadow-sm p-4 md:p-5 border border-gray-100 h-full">
              <h3 className="text-xl font-bold mb-5 text-gray-800">Contact Information</h3>

              <div className="space-y-5">
                {/* Contact info items */}
                <div className="flex items-center group hover:bg-accent/5 p-2 rounded-lg transition-colors">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mr-4 shrink-0 group-hover:bg-accent/20 transition-colors duration-300">
                    <Mail className="text-accent" size={18} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-500 text-sm">Email Address</p>
                    <a href="mailto:ankitshaw6933@gmail.com" className="text-accent hover:underline font-medium">
                      ankitshaw6933@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center group hover:bg-accent/5 p-2 rounded-lg transition-colors">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mr-4 shrink-0 group-hover:bg-accent/20 transition-colors duration-300">
                    <Phone className="text-accent" size={20} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-500 text-sm">Phone Number</p>
                    <a href="tel:+916291219530" className="text-accent hover:underline font-medium">
                      +91 6291219530
                    </a>
                  </div>
                </div>

                <div className="flex items-center group hover:bg-accent/5 p-2 rounded-lg transition-colors">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mr-4 shrink-0 group-hover:bg-accent/20 transition-colors duration-300">
                    <MapPin className="text-accent" size={20} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-500 text-sm">Location</p>
                    <p className="text-gray-800 font-medium">Kolkata, India</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.05 }}
            className=""
          >
            {/* Available For Card */}
            <div className="bg-[#3E40EF] rounded-2xl shadow-md p-4 md:p-5 border border-[#3E40EF]/20 text-white h-full">
              <div className="flex flex-row sm:items-center justify-between gap-3 mb-4">
                <h4 className="text-xl font-bold text-white">Available For</h4>
                <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full self-start">
                  <div className="w-2.5 h-2.5 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                  <span className="text-sm font-medium text-white">Open to Work</span>
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                <li className="flex items-center text-white/90 group">
                  <div className="w-2 h-2 bg-white rounded-full mr-3 group-hover:w-3 transition-all duration-300"></div>
                  <span className="group-hover:text-white transition-colors duration-300">Summer Internships</span>
                </li>
                <li className="flex items-center text-white/90 group">
                  <div className="w-2 h-2 bg-white rounded-full mr-3 group-hover:w-3 transition-all duration-300"></div>
                  <span className="group-hover:text-white transition-colors duration-300">Remote Opportinuties</span>
                </li>
                <li className="flex items-center text-white/90 group">
                  <div className="w-2 h-2 bg-white rounded-full mr-3 group-hover:w-3 transition-all duration-300"></div>
                  <span className="group-hover:text-white transition-colors duration-300">Product Design Roles</span>
                </li>
              </ul>

              <Button
                className="w-full bg-white hover:bg-white/90 text-black font-semibold py-2.5 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
                onClick={() => window.open('https://www.linkedin.com/in/ankit-shaw-884b0728a/', '_blank')}
              >
                <span className="text-black font-semibold">Let's Collaborate</span>
                <ExternalLink size={16} className="ml-2" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
