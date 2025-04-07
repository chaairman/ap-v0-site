// app/page.tsx
"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion"
import { ArrowRight, ChevronDown } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { VerticalLogo } from "@/components/vertical-logo"
import { MainNav } from "@/components/main-nav"
import { ServiceCard } from "@/components/service-card"
import { InsightCard } from "@/components/insight-card"
import { Footer } from "@/components/footer"

const SCROLL_THRESHOLD = 100;

export default function HomePage() {
  // State Variables
  const [isLoading, setIsLoading] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [isManuallyRevealed, setIsManuallyRevealed] = useState(false);
  const lastScrollYRef = useRef(0);
  const ignoreScrollResetRef = useRef(false);

  // Refs
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const insightsRef = useRef(null);
  const expertiseRef = useRef(null);

  // Callbacks
  const handleManualReveal = useCallback(() => {
    setIsManuallyRevealed(true);
    ignoreScrollResetRef.current = true;
    // console.log('%cSetting manual reveal TRUE (via click)', 'color: orange; font-weight: bold;');
  }, []);

  const resetManualReveal = useCallback(() => {
    if (isManuallyRevealed) {
    //   console.log('%cSetting manual reveal FALSE (due to scroll)', 'color: red; font-weight: bold;');
    }
    setIsManuallyRevealed(false);
  }, [isManuallyRevealed]);

  // Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const previousScrollY = lastScrollYRef.current;
      const scrollingDown = currentScrollY > previousScrollY;
      const scrollingUp = currentScrollY < previousScrollY;

      setScrollY(currentScrollY); // Update position state

      // --- Manual Reset Handling ---
      let manualResetOccurred = false;
      if (isManuallyRevealed) {
        if (ignoreScrollResetRef.current) {
          ignoreScrollResetRef.current = false;
        } else {
          resetManualReveal();
          manualResetOccurred = true; // Flag that reset happened this cycle
          // We still process collapse logic below, but manualReset flag helps decide
        }
      }
      // --- End Manual Reset ---

      // Determine scroll-driven collapse state ONLY if manual reset didn't just happen
      // OR if the manual reveal wasn't active anyway.
      if (!manualResetOccurred) {
          let shouldBeCollapsed = isNavCollapsed;

          if (scrollingDown && currentScrollY > SCROLL_THRESHOLD) {
            // Collapse when scrolling down past threshold
            shouldBeCollapsed = true;
          } else if (scrollingUp && currentScrollY < SCROLL_THRESHOLD) {
            // Un-collapse ONLY when scrolling up AND ABOVE threshold
            shouldBeCollapsed = false;
          }
          // If scrolling up BELOW threshold, shouldBeCollapsed remains unchanged (likely true)
          // If scrolling down ABOVE threshold, shouldBeCollapsed remains unchanged (likely false)

          // Only update collapse state if it needs to change
          if (shouldBeCollapsed !== isNavCollapsed) {
            // console.log(`%cSetting isNavCollapsed: ${shouldBeCollapsed}`, 'color: blue; font-weight: bold;');
            setIsNavCollapsed(shouldBeCollapsed);
          }
      }
      // If manualResetOccurred is true, we skip updating isNavCollapsed for this cycle.
      // The next scroll event will determine the correct isNavCollapsed state.

      lastScrollYRef.current = currentScrollY;
    };

    lastScrollYRef.current = window.scrollY;
    handleScroll(); // Initial check

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isNavCollapsed, isManuallyRevealed, resetManualReveal]); // Dependencies


  // Loading Effect
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // Framer Motion & Data (No changes needed)
  const { scrollYProgress } = useScroll(); const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 }); const heroImageY = useTransform(scrollYProgress, [0, 0.5], [0, 150]); const heroTextY = useTransform(scrollYProgress, [0, 0.5], [0, -50]); const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]); const servicesData = [ { title: "Dispute Resolution", description: "Expert litigation, arbitration, and mediation services to resolve complex legal disputes.", image: "/service-1.jpg", delay: 0.1 }, { title: "Corporate & Commercial", description: "Comprehensive legal support for businesses, from startups to multinational corporations.", image: "/service-2.jpg", delay: 0.2 }, { title: "Projects & Operations", description: "Specialized legal guidance for engineering, construction, and oil & gas projects.", image: "/service-3.jpg", delay: 0.3 }, { title: "Banking & Finance", description: "Expert advice on complex financial transactions, regulatory compliance, and risk management.", image: "/service-4.jpg", delay: 0.4 }, { title: "Regulatory Compliance", description: "Navigate complex regulatory frameworks with our expert compliance services.", image: "/service-5.jpg", delay: 0.5 }, { title: "Intellectual Property", description: "Protection and enforcement of intellectual property rights across multiple jurisdictions.", image: "/service-6.jpg", delay: 0.6 }, ]; const expertiseData = [ { title: "Commercial Approach", description: "We understand business needs and provide practical, commercially-focused legal solutions." }, { title: "Regional Expertise", description: "Deep understanding of Abu Dhabi and UAE legal frameworks and business environments." }, { title: "Cost-Effective Solutions", description: "Transparent fee structures and efficient processes to maximize value for our clients." }, ];

  return (
    <main className="relative bg-background text-foreground overflow-hidden">
      {/* Loading Animation */}
      <AnimatePresence> {isLoading && ( <motion.div className="fixed inset-0 bg-primary z-50 flex items-center justify-center" initial={{ x: 0 }} exit={{ x: "100%" }} transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }} > <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} > <Image src="/logo.svg" alt="Amara & Partners" width={120} height={120} className="h-20 w-auto" /> </motion.div> </motion.div> )} </AnimatePresence>
      {/* Progress bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-0.5 bg-primary z-[45]" style={{ scaleX: smoothProgress, transformOrigin: "0%" }} />
      {/* Vertical Logo */}
      <VerticalLogo scrollY={scrollY} />
      {/* MainNav */}
      <MainNav isCollapsed={isNavCollapsed} isManuallyRevealed={isManuallyRevealed} onManualReveal={handleManualReveal} />

      {/* ================= SECTIONS (Ensure full JSX structure remains) ================= */}
       <section ref={heroRef} className="relative min-h-screen flex flex-col justify-center items-center px-4 sm:px-8 lg:px-0"> <div className="absolute inset-0 -z-10 bg-white/5" /> <motion.div className="absolute inset-0 -z-20 opacity-30" style={{ backgroundImage: "url('/hero-bg.jpg')", backgroundSize: "cover", backgroundPosition: "center", y: heroImageY }} /> <div className="container-spacious max-w-5xl mx-auto pt-32 pb-20 md:pt-40 md:pb-32 px-4 sm:px-8 lg:pl-32 lg:pr-8 w-full"> <motion.div className="flex flex-col items-start text-left space-y-12" style={{ y: heroTextY, opacity: heroOpacity }} > <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} > <span className="inline-block text-sm font-medium text-primary px-6 py-1.5 rounded-none border-l border-primary"> LEGAL EXCELLENCE </span> </motion.div> <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="text-4xl md:text-6xl lg:text-7xl font-bold text-white max-w-3xl" > Amara <span className="text-primary">&</span> Partners </motion.h1> <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="text-xl md:text-2xl text-white/90 max-w-2xl font-light text-spacious" > A modern legal consultancy redefining excellence in Abu Dhabi's legal landscape </motion.p> <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }} className="flex flex-col sm:flex-row gap-6 mt-8" > <Button size="lg" className="rounded-none px-10 py-6 bg-primary hover:bg-primary/90 text-base"> Our Services <ArrowRight className="ml-3 h-4 w-4" /> </Button> <Button size="lg" variant="outline" className="rounded-none px-10 py-6 text-white border-white/20 hover:bg-white/10 text-base"> Contact Us </Button> </motion.div> </motion.div> </div> <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 1 }} className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center" style={{ opacity: heroOpacity }} > <p className="text-sm text-white/60 mb-3">Discover More</p> <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}> <ChevronDown className="h-6 w-6 text-primary" /> </motion.div> </motion.div> </section>
       <div className="spacer-lg" />
       <section className="relative py-32 md:py-40 px-4 sm:px-8 lg:px-0 section-light overflow-hidden"> <div className="container-spacious max-w-7xl mx-auto px-4 sm:px-8 lg:pl-32 lg:pr-8"> <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20"> <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8 }} className="relative" > <div className="absolute -top-8 -left-8 lg:-top-12 lg:-left-12 w-16 h-16 lg:w-24 lg:h-24 border-t border-l border-primary/30" /> <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-8 lg:mb-12 max-w-xl"> Exceptional legal <br /> services for <span className="text-primary">exceptional</span> clients </h2> <div className="elegant-line w-16 lg:w-24 mb-8 lg:mb-12" /> <p className="text-lg text-neutral-700 mb-6 lg:mb-8 max-w-xl text-spacious"> At Amara & Partners, we understand that legal challenges require not just expertise, but strategic thinking and a deep understanding of your business objectives. </p> <p className="text-lg text-neutral-700 mb-12 lg:mb-16 max-w-xl text-spacious"> Our team of experienced attorneys brings together diverse expertise and a commitment to excellence that sets us apart in Abu Dhabi's legal landscape. </p> <div className="flex items-center space-x-4"> <div className="elegant-dot" /> <span className="text-primary font-medium">Trusted by industry leaders</span> </div> </motion.div> <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative flex items-center justify-center" > <div className="relative w-full max-w-md aspect-[4/3] overflow-hidden"> <Image src="/expertise.jpg" alt="Legal Excellence" fill className="object-cover" /> <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-70" /> </div> <div className="absolute -bottom-8 -right-8 lg:-bottom-12 lg:-right-12 w-32 h-32 lg:w-64 lg:h-64 border border-primary/20" /> </motion.div> </div> </div> </section>
       <div className="spacer-lg" />
       <section ref={servicesRef} className="relative py-32 md:py-40 px-4 sm:px-8 lg:px-0 bg-muted"> <div className="container-spacious max-w-7xl mx-auto px-4 sm:px-8 lg:pl-32 lg:pr-8"> <div className="flex flex-col md:flex-row justify-between items-start mb-16 md:mb-24 lg:mb-32"> <motion.div className="max-w-2xl mb-12 md:mb-0" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8 }} > <div className="inline-block mb-6"> <span className="inline-block text-sm font-medium text-primary px-6 py-1.5 rounded-none border-l border-primary"> OUR SERVICES </span> </div> <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 lg:mb-12 text-white max-w-xl"> Legal expertise that <br /> delivers results </h2> <div className="elegant-line w-16 lg:w-24 mb-8 lg:mb-12" /> <p className="text-lg text-white/80 max-w-xl text-spacious"> We offer a wide range of specialized legal services tailored to meet the diverse needs of our clients across various industries and sectors. </p> </motion.div> <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }} className="mt-0 w-full md:w-auto" > <Button variant="outline" className="w-full md:w-auto rounded-none border-primary/30 text-white hover:bg-primary/10 px-8 py-6"> View all services <ArrowRight className="ml-3 h-4 w-4" /> </Button> </motion.div> </div> <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16"> {servicesData.map((service, index) => ( <ServiceCard key={index} title={service.title} description={service.description} image={service.image} index={index} /> ))} </div> </div> </section>
       <div className="spacer-lg" />
       <section ref={expertiseRef} className="relative py-32 md:py-40 px-4 sm:px-8 lg:px-0 bg-background"> <div className="absolute inset-0 opacity-10"> <Image src="/expertise-bg.jpg" alt="Background" fill className="object-cover" /> </div> <div className="container-spacious max-w-7xl mx-auto px-4 sm:px-8 lg:pl-32 lg:pr-8 relative z-10"> <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"> <motion.div className="space-y-8 lg:space-y-12" initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8 }} > <div className="inline-block mb-4 lg:mb-6"> <span className="inline-block text-sm font-medium text-primary px-6 py-1.5 rounded-none border-l border-primary"> WHY CHOOSE US </span> </div> <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white max-w-xl"> Unparalleled legal expertise </h2> <div className="elegant-line w-16 lg:w-24" /> <p className="text-lg text-white/80 max-w-xl text-spacious"> Our team of experienced attorneys brings together diverse expertise and a deep understanding of the legal landscape in Abu Dhabi and beyond. </p> <div className="pt-6 lg:pt-8 space-y-10 lg:space-y-16"> {expertiseData.map((item, index) => ( <motion.div key={index} className="flex gap-6 lg:gap-10" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }} > <div className="flex-shrink-0 mt-1"> <div className="w-10 h-10 lg:w-14 lg:h-14 flex items-center justify-center text-white border border-primary/40 bg-primary/10"> <span className="text-base lg:text-lg font-light">{index + 1}</span> </div> </div> <div> <h3 className="text-lg lg:text-xl font-semibold mb-3 lg:mb-4 text-white">{item.title}</h3> <p className="text-base lg:text-white/70 text-spacious">{item.description}</p> </div> </motion.div> ))} </div> <div className="pt-8 lg:pt-12"> <Button className="rounded-none px-10 py-6 bg-primary hover:bg-primary/90 text-base w-full sm:w-auto"> Meet Our Team <ArrowRight className="ml-3 h-4 w-4" /> </Button> </div> </motion.div> <motion.div className="relative" initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8 }} > <div className="relative aspect-[4/5] overflow-hidden"> <Image src="/expertise.jpg" alt="Legal Expertise" fill className="object-cover" /> <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-neutral-900/40 to-transparent" /> <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 lg:p-12"> <div className="max-w-xs"> <div className="w-12 h-px bg-primary mb-4 lg:mb-8" /> <p className="text-white/90 text-base lg:text-lg italic font-light"> "Amara & Partners provided exceptional legal counsel that was both strategic and practical." </p> <p className="text-primary mt-4 lg:mt-6 font-medium text-sm lg:text-base"> — CEO, International Finance Group </p> </div> </div> </div> <motion.div className="absolute -bottom-8 -right-8 lg:-bottom-12 lg:-right-12 w-32 h-32 lg:w-64 lg:h-64 border border-primary/20" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }} /> </motion.div> </div> </div> </section>
       <div className="spacer-lg" />
       <section ref={insightsRef} className="relative py-32 md:py-40 px-4 sm:px-8 lg:px-0 section-light"> <div className="container-spacious max-w-7xl mx-auto px-4 sm:px-8 lg:pl-32 lg:pr-8"> <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 lg:mb-32"> <motion.div className="mb-12 md:mb-0" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8 }} > <div className="inline-block mb-6"> <span className="inline-block text-sm font-medium text-primary px-6 py-1.5 rounded-none border-l border-primary"> INSIGHTS </span> </div> <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-8 lg:mb-12 max-w-xl"> Spotlight on our news <br /> and insights </h2> <div className="elegant-line w-16 lg:w-24" /> </motion.div> <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }} className="w-full md:w-auto" > <Button variant="outline" className="w-full md:w-auto rounded-none border-primary/30 text-primary hover:bg-primary/5 px-8 py-6"> VIEW ALL INSIGHTS <ArrowRight className="ml-3 h-4 w-4" /> </Button> </motion.div> </div> <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20"> <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="lg:col-span-2" > <InsightCard title="Amara & Partners advises Global Financial Holdings in USD 1.5 billion acquisition" category="Corporate and M&A" image="/insight-main.jpg" featured={true} lightMode={true} /> </motion.div> <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} > <InsightCard title="Digital regulations dominate legal enforcement outlook" category="Financial Institutions" date="21 Mar 2025" image="/insight-1.jpg" lightMode={true} /> </motion.div> <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }} > <InsightCard title="Global trends in merger control enforcement" category="Report" date="27 Feb 2025" image="/insight-2.jpg" lightMode={true} /> </motion.div> </div> </div> </section>
       <div className="spacer-lg" />
       <section className="relative py-32 md:py-40 px-4 sm:px-8 lg:px-0 bg-background"> <div className="container-spacious max-w-7xl mx-auto px-4 sm:px-8 lg:pl-32 lg:pr-8"> <motion.div className="relative" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true, amount: 0.3 }} > <div className="absolute inset-0 bg-primary/5" /> <div className="relative p-8 md:p-16 lg:p-24 border border-primary/20"> <div className="max-w-2xl"> <motion.h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 lg:mb-12 text-white" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} viewport={{ once: true }} > Ready to work with us? </motion.h2> <div className="elegant-line w-16 lg:w-24 mb-8 lg:mb-12" /> <motion.p className="text-lg md:text-xl text-white/80 mb-12 lg:mb-16 font-light text-spacious" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} viewport={{ once: true }} > Contact our team today to discuss how Amara & Partners can provide the legal expertise your business needs. </motion.p> <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} viewport={{ once: true }} className="w-full sm:w-auto" > <Button size="lg" className="w-full sm:w-auto rounded-none px-12 py-6 bg-primary hover:bg-primary/90 text-base"> Contact Us <ArrowRight className="ml-3 h-4 w-4" /> </Button> </motion.div> </div> </div> </motion.div> </div> </section>
       <div className="spacer-lg" />
       <Footer />
    </main>
  )
}