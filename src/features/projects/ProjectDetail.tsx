import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, AlertTriangle, Lightbulb, ExternalLink, Figma, Code2, FileCode } from "lucide-react";
import { motion } from "framer-motion";
import { DesktopTextReveal, MobileTextReveal } from "@/features/shared/components/magic-ui/TextRevealResponsive";
import ProjectPageHeader from "@/components/ProjectPageHeader";
import Footer from "@/components/Footer";
import HomeButton from "@/components/HomeButton";
import ProblemSolutionRow from "@/components/ProblemSolutionRow";
import ProjectDetailsGrid from "@/components/ProjectDetailsGrid";
import { OptimizedImage } from "@/components/OptimizedImage"; // <-- Add this import

const projectsData = [
  // Mock data for projects
  {
    id: "croxy.io",
    title: "Croxy.io – Marketing Agency Website",
    year: "2025",
    description: "I designed a vibrant, conversion-focused website for Croxy.io, a creative marketing agency. The goal was to craft a visually engaging, modern interface that communicates clarity, confidence, and creativity. The design emphasizes bold typography, smooth layouts, and clear call-to-actions, guiding visitors through the brand’s services and vision effortlessly. Every section was built to establish trust and highlight the agency’s dynamic marketing approach.",
    image: "/images/croxy-detailed-page-1.mp4",
    tags: ["UI Design", "Web Design", "Brand Identity"],
    role: ["UI/UX Designer"],
    tools: ["Figma"],
    category: "Marketing Website Design",
    impact: "Enhanced visual engagement and clarity, leading to stronger brand perception and improved visitor interaction across the site.",
    problem: "The client needed a modern and visually strong digital presence that reflects their creative energy while effectively showcasing their marketing expertise.",
    solution: "Designed a playful yet professional marketing website using bold colors, clear hierarchy, and interactive visuals. Focused on crafting an intuitive flow that highlights services and drives user action.",
    designProcess: ["/images/croxy-process.png"],
    designElements: ["/images/croxy-resources.png"],
    finalDesign: ["/images/croxy-final.png"],
    figmaEmbedUrl: "https://www.figma.com/design/1R3WoU0DhdyVj6F19JivCW/Ankit?node-id=6-939&t=oYIAKhqFLZwPAJDJ-1"
  },
  {
    id: "courser",
    title: "Courser – Online Learning Platform",
    year: "2025",
    description: "Courser is a modern web learning platform concept designed to make online education visually engaging and effortless. The platform highlights credibility, accessibility, and motivation through a clean UI and vibrant design system.",
    image: "/images/courser-home-detail.mp4",
    tags: ["Product Design", "UI/UX", "Web App"],
    role: ["UI Designer"],
    tools: ["Figma"],
    category: "UI/UX | Web Platform",
    impact: "Enhanced user engagement by 65% with a bold visual hierarchy and improved call-to-action placement.",
    problem: "Learners often find online course platforms cluttered and uninspiring, which reduces motivation and course completion rates.",
    solution: "Courser introduces a visually driven, student-friendly interface emphasizing simplicity, engagement, and trust. Its structured layout and warm visuals keep users focused while improving overall navigation flow.",
    designProcess: ["/images/courser-process.png"],
    designElements: ["/images/courser-elements.png"],
    finalDesign: ["/images/courser-final.png"],
    figmaEmbedUrl: "https://www.figma.com/design/1R3WoU0DhdyVj6F19JivCW/Ankit?node-id=75-380&t=NgCI69pKouKykJ4x-1",
  },

  {
    id: "toofoody",
    title: "TooFoody – Food Ordering Platform",
    year: "2025",
    description: "TooFoody is a vibrant food-ordering landing experience focused on high-impact hero visuals, promotional offers, and streamlined ordering flows. The design highlights specials, product cards, and reviews to increase conversions and mobile engagement.",
    image: "/images/toofoody-inside.mp4",
    tags: ["UI Design", "Food Delivery"],
    role: ["UI/UX Designer"],
    tools: ["Figma"],
    category: "E-commerce / Food Delivery",
    impact: "Improved promotional click-through and simplified order flow, increasing engagement on the landing page",
    problem: "The client needed a visually rich, conversion-focused landing page that showcases menu items, special offers, and an easy path to order on mobile and desktop.",
    solution: "Created a bold hero with product photography, clear special-offer sections, concise product cards, and a prominent 'Order Now' CTA — optimized for quick conversions and mobile-first ordering.",
    designProcess: ["/images/toofoody-design.png"],
    designElements: ["/images/toofoody-resources.png"],
    finalDesign: ["/images/toofoody-final.png"],
    figmaEmbedUrl: "https://www.figma.com/design/1R3WoU0DhdyVj6F19JivCW/Ankit?node-id=6-829&t=NgCI69pKouKykJ4x-1",
  }
];

const ProjectDetail = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { id } = useParams();
  const [project, setProject] = useState<any>(null);
  const [nextProject, setNextProject] = useState<any>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);


  useEffect(() => {
    const controlNavbar = () => {
      if (window.scrollY > lastScrollY && isVisible) {
        setIsVisible(false);
      } else if (window.scrollY < lastScrollY && !isVisible) {
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY, isVisible]);

  useEffect(() => {
    if (id) {
      const currentProject = projectsData.find(p => p.id === id);
      if (currentProject) {
        setProject(currentProject);

        const currentIndex = projectsData.findIndex(p => p.id === id);
        const nextIndex = (currentIndex + 1) % projectsData.length;
        setNextProject(projectsData[nextIndex]);
      }
    }
  }, [id]);

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [id]);
  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-[#3E40EF]">Loading project details...</div>
      </div>
    );
  }

  const projectDetailsItems = [
    { label: "Year", value: project.year },
    { label: "Category", value: project.category },
    {
      label: "Tools",
      value: project.tools.map(tool => ({
        name: tool,
        icon: tool.toLowerCase().includes('figma') ? <Figma className="h-5 w-5" /> :
          tool.toLowerCase().includes('react') ? <Code2 className="h-5 w-5" /> : null
      }))
    }
  ];

  // determine if the provided project.image is a video asset
  const isVideo = typeof project.image === 'string' && /\.(mp4|webm|ogg)$/i.test(project.image);
  return (
    <div className="min-h-screen bg-white text-black">
      <ProjectPageHeader />

      {/* Banner Section */}
      <section className="relative pt-20 w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* Narrower central column so the video fits with less horizontal cropping */}
          <div className="w-full max-w-4xl mx-auto">
            <div className="overflow-hidden rounded-lg relative w-full">
              <div className="h-[55vh] md:h-[70vh] lg:h-[75vh] relative">
                <div className="w-full h-full relative">
                  {/* Show a static poster/image until the video reports it's ready. This prevents
                      the surrounding layout (like the Design Process/Resources) from shifting
                      before the video is playable. */}
                  {!isVideo && (
                    <OptimizedImage
                      src={project.image}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  )}

                  {isVideo && (
                    <>
                      {/* {!videoLoaded && (
                        <OptimizedImage
                          src={project.finalDesign?.[0]}
                          alt={`${project.title} poster`}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      )} */}

                      <video
                        controls
                        muted
                        playsInline
                        autoPlay
                        loop
                        preload="metadata"
                        className={`absolute inset-0 w-full h-full object-cover ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
                        title={project.title}
                        onLoadedData={() => setVideoLoaded(true)}
                      >
                        <source src={project.image} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </>
                  )}
                </div>

                <div className="absolute bottom-0 left-0 p-6 md:p-8 bg-gradient-to-t from-black/80 to-transparent w-full">
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-4xl md:text-5xl font-bold text-white font-manrope"
                  >
                    {project.title}
                  </motion.h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-16 md:py-20 w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 font-manrope">Project Overview</h2>
            <div className="text-lg md:text-4xl font-medium leading-relaxed text-gray-700">
              <DesktopTextReveal className="hidden md:block" lineIndex={0} totalLines={1}>
                {project.description}
              </DesktopTextReveal>
              <MobileTextReveal className="block md:hidden" lineIndex={0} totalLines={1}>
                {project.description}
              </MobileTextReveal>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 mt-12">
          <div className="w-full h-px bg-gray-100"></div>
        </div>
      </section>

      {/* Problem Solution Section */}
      <section className="mt-1 mb-3 md:mt-2 md:mb-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <ProblemSolutionRow
              problem={project.problem}
              solution={project.solution}
            />
          </div>
        </div>
      </section>

      {/* Project Details Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <ProjectDetailsGrid items={projectDetailsItems} />
          </div>
        </div>
      </section>

      {/* Design Process Section */}
      <section className="py-12 md:py-16 w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto space-y-16 md:space-y-20">
            <div>
              <h2 className="text-3xl font-bold mb-8 font-manrope text-center">Design Process</h2>
              <div className="aspect-video rounded-lg overflow-hidden w-full">
                <OptimizedImage
                  src={project.designProcess[0]}
                  alt="Design Process"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-8 font-manrope text-center">Design Elements</h2>
              <div className="aspect-video rounded-lg overflow-hidden w-full">
                <OptimizedImage
                  src={project.designElements[0]}
                  alt="Design Elements"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-8 font-manrope text-center">Final Design</h2>
              <div className="rounded-lg overflow-hidden w-full">
                <OptimizedImage
                  src={project.finalDesign[0]}
                  alt="Final Design"
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
            {project.figmaEmbedUrl && (
              <div>
                <h2 className="text-3xl font-bold mb-4 font-manrope text-center">Figma File</h2>
                <div className="mt-3 text-center">
                  <a
                    href={project.figmaEmbedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-2 rounded-md bg-[#3E40EF] text-white text-sm hover:opacity-95"
                  >
                    Open design in Figma
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      <Footer />
      {/* <HomeButton /> */}
    </div>
  );
};

export default ProjectDetail;
