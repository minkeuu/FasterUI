import { Link } from "react-router-dom";
import {
  Palette,
  MousePointerClick,
  Smartphone,
  ShoppingBag,
  Code,
  Layers,
  ArrowRight,
  ArrowLeft,
  Check,
  Star,
  Mail,
  Heart,
  Send,
  Globe,
  MessageCircle,
  Rss,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";

const navigationItems = ["Home", "About", "How it Works", "Services"];

const serviceDescription =
  "From concept to launch, we create stunning, user-centric websites that elevate your brand and engage your audience.";

const services = [
  { title: "Web Design", icon: Palette },
  { title: "UI/UX Design", icon: MousePointerClick },
  { title: "Responsive Design", icon: Smartphone },
  {
    title: "E-commerce Solutions",
    icon: ShoppingBag,
    image:
      "/img/Rectangle 44.png",
    className: "row-span-2",
  },
  {
    title: "Webflow",
    icon: Layers,
    accent: true,
    className: "col-span-2",
  },
  { title: "Custom Development", icon: Code },
];

const faqItems = [
  {
    question: "How can I contact Inkyy Team?",
    answer:
      "You can reach us through our contact form on our website or by emailing us at hello@inkyy.com. We typically respond within 24 hours.",
  },
  { question: "What services do you offer?" },
  { question: "Do you provide website maintenance services?" },
  { question: "How long does it take to design and develop a website?" },
  { question: "Do you require a deposit for projects?" },
];

const featureItems = Array.from({ length: 6 }, () => "Unlimited requests");

const reviewAvatars = [
  "/img/Ellipse 1.png",
  "/img/Ellipse 2.png",
  "/img/Ellipse 3.png",
  "/img/Ellipse 4.png",
  "/img/Ellipse 5.png",
];

const portfolioItems = [
  {
    src: "/img/Rectangle 35.png",
    className: "w-[254px]",
  },
  {
    src: "/img/Rectangle 30.png",
    className: "w-[732px]",
  },
  {
    src: "/img/Rectangle 33.png",
    className: "w-[254px]",
  },
];

const socialItems = [Send, Globe, MessageCircle, Rss];

const navLinkClass =
  "font-paragraph text-base leading-6 text-[#8987a1] transition-colors hover:text-[#252432]";

export default function FasterTemplate() {
  return (
    <main className="relative overflow-hidden bg-[#F5F8FF] text-[#252432] ">
      <img
    src="/img/mainGradient.png"
    className="
      
      absolute
      left-1/2
      top-0
      -translate-x-1/2
      w-[1200px]
      h-[1000px]
      opacity-100
      z-0
    "
  />
      <section className="relative min-h-[680px] overflow-hidden px-6 pb-24 pt-4 sm:px-10 lg:min-h-[700px] lg:px-28 z-10">
        <div className="pointer-events-none absolute left-1/2 top-0 z-0 h-[680px] w-[min(1168px,100%)] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(77,71,255,0.12),transparent_60%)]" />
        <header className="relative z-10 mx-auto flex max-w-[1216px] items-center justify-between">
          <div className="flex h-[37px] items-center gap-2 [font-family:'Raleway',Helvetica] text-2xl font-bold tracking-tight">
            <div className="bg-black w-[38px] h-[38px] rounded-[10px] justify-center items-center flex">
              <img src="/img/Vector.png" alt="" />
            </div>
            FasterUI
          </div>
          <nav
            className="hidden rounded-[20px] border border-white bg-[#ffffff99] px-14 py-[22px] backdrop-blur lg:block"
            aria-label="Primary navigation"
          >
            <ul className="flex items-center gap-10">
              {navigationItems.map((item, index) => (
                <li key={item}>
                  <a
                    className={
                      index === 0
                        ? "font-paragraph text-base font-bold leading-6 text-[#252432]"
                        : navLinkClass
                    }
                    href={`#${item.toLowerCase().replaceAll(" ", "-")}`}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-5">
            <Link
              className="hidden [font-family:'Raleway',Helvetica] text-base text-[#8987a1] transition-colors hover:text-[#252432] sm:block"
              to="/signin"
            >
              Sign In
            </Link>
            <Button
              asChild
              className="h-12 rounded-[10px] bg-[#4d47ff] px-8 [font-family:'Raleway',Helvetica] text-base font-bold text-white hover:bg-[#3f39e6]"
            >
              <Link to="/signup">Sign Up</Link>
            </Button>
          </div>
        </header>
        <div className="relative z-10 mx-auto mt-28 flex max-w-[766px] flex-col items-center text-center sm:mt-24">
          <h1 className="[font-family:'Raleway',Helvetica] text-5xl font-bold leading-[.98] tracking-[-1.5px] sm:text-[73.3px] sm:leading-[73.3px]">
            Awesome UI Dark Template for Webflow Agency
          </h1>
          <Button
            asChild
            className="mt-8 h-[60px] rounded-[10px] bg-[#252432] px-[58px] [font-family:'Raleway',Helvetica] text-base font-bold text-white hover:bg-[#3c3b4c]"
          >
            <a href="#contact">Get in Touch</a>
          </Button>
        </div>
      </section>

      <section
        id="services"
        className="relative mx-auto max-w-[1216px] px-6 pb-28 sm:px-10 lg:px-0 z-10"
      >
        <h2 className="[font-family:'Raleway',Helvetica] text-4xl font-bold leading-tight sm:text-6xl sm:leading-[72px]">
          What We do
        </h2>
        <div className="mt-8 grid gap-3 md:grid-cols-4">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Card
                className={`relative min-h-[260px] overflow-hidden rounded-[10px] border-[#e8edf8] bg-white shadow-none ${service.className ?? ""}`}
                key={service.title}
              >
                <CardContent className="relative flex h-full flex-col p-[25px]">
                  {service.accent && (
                    <div className="absolute bottom-[19px] right-[19px] top-[19px] hidden w-[218px] rounded-[5px] bg-[#5b54ff] md:flex justify-center items-center">
                      <img src="/img/Vector (1).png" alt="" />
                    </div>
                  )}
                  <div className="relative z-10 flex h-11 w-11 items-center justify-center rounded-[9px] bg-[#f5f8ff]">
                    <Icon className="h-6 w-6 text-[#4d47ff]" />
                  </div>
                  <h3 className="relative z-10 mt-9 [font-family:'Inter',Helvetica] text-[19.8px] font-semibold leading-[23.7px]">
                    {service.title}
                  </h3>
                  <p className="relative z-10 mt-5 max-w-[231px] text-sm leading-[21px] text-[#8987a1]">
                    {serviceDescription}
                  </p>
                  {service.image && (
                    <img
                      className="absolute left-5 bottom-5 h-[257px] w-[238px] rounded-[5px] object-cover"
                      src={service.image}
                      alt=""
                    />
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section id="how-it-works" className="relative overflow-hidden py-24 z-10 isolate bg-[#F5F8FF]">
        <img src="/img/Untitled@3-1536x735 1.png" className="absolute
      left-1/2
      top-0
      -translate-x-1/2
      w-[700px]
      h-auto
      z-0 mix-blend-color-burn" alt="" />
        <div className="pointer-events-none absolute left-1/2 top-0 h-[841px] w-[799px] max-w-none -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(77,71,255,0.10),transparent_70%)] opacity-80" />
        <div className="relative mx-auto max-w-[1216px] px-6 sm:px-10 lg:px-0">
          <div className="flex items-center justify-between">
            <Button
              className="h-[78px] w-[78px] rounded-full border border-[#e3e9f7] bg-white p-0 text-[#252432] hover:bg-white"
              type="button"
              aria-label="Previous project"
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <div className="text-center">
              <h2 className="[font-family:'Raleway',Helvetica] text-4xl font-bold sm:text-6xl sm:leading-[72px]">
                Check our Work
              </h2>
              <p className="mx-auto mt-3 max-w-[449px] [font-family:'Inter',Helvetica] text-sm leading-[21px] text-[#8987a1]">
                Take a look at some of our recent projects to see how we&apos;ve
                helped businesses like yours succeed online.
              </p>
            </div>
            <Button
              className="h-[78px] w-[78px] rounded-full border border-[#e3e9f7] bg-white p-0 text-[#252432] hover:bg-white"
              type="button"
              aria-label="Next project"
            >
              <ArrowRight className="h-6 w-6" />
            </Button>
          </div>
          <div className="mt-16 flex gap-8 overflow-hidden ">
            {portfolioItems.map((item) => (
              <Card className="relative overflow-hidden rounded-[10px] p-8  border-0 bg-transparent shadow-none" key={item.src}>
                <div
                  className="
                    absolute
                    inset-0
                    rounded-[10px]
                    bg-[linear-gradient(137deg,#1c1c1c_0%,#050505_100%)]
                    mix-blend-color-dodge
                  "
                />
                
                <CardContent className="h-full p-0">
                  <img
                    className="h-full w-full rounded-[5px] object-cover"
                    alt="Project preview"
                    src={item.src}
                  />
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-14 flex justify-center">
            <div className="flex items-center gap-3 rounded-[22px] border border-[#e3e9f7] bg-white px-6 py-5">
              <div className="flex -space-x-2">
                {reviewAvatars.map((avatar) => (
                  <img
                    className="h-[37px] w-[37px] rounded-full border-2 border-white object-cover"
                    alt=""
                    key={avatar}
                    src={avatar}
                  />
                ))}
              </div>
              <div className="[font-family:'Inter',Helvetica] text-base leading-[19.2px]">
                <p>
                  <span className="font-semibold">5.0 </span>
                  <span className="text-[#8987a1]">Based On</span>
                  <span className="font-semibold"> 145 </span>
                  <span className="text-[#8987a1]">Reviews</span>
                </p>
                <div className="mt-1 flex gap-[7px]">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className="h-[12px] w-[12px] fill-[#f5a623] text-[#f5a623]"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto grid max-w-[1014px] gap-8 px-6 py-24 lg:grid-cols-[387px_1fr] lg:px-0 z-10">
        <div className="relative flex-col flex justify-between">
          <div>
            <h2 className="[font-family:'Raleway',Helvetica] text-4xl font-bold leading-tight sm:text-6xl sm:leading-[72px]">
            Pricing
          </h2>
          <p className="mt-5 max-w-[282px] [font-family:'Inter',Helvetica] text-sm leading-[21px] text-[#8987a1]">
            Take a look at some of our recent projects to see how we&apos;ve
            helped businesses like yours succeed online.
          </p>
          </div>
          <Card className="mt-12 rounded-[20px] border-0 bg-transparent shadow-none ">
            <CardContent className="p-7 rounded-[20px] bg-white">
              <h3 className="[font-family:'Raleway',Helvetica] text-[34.1px] font-bold leading-[40.9px]">
                Let&apos;s Schedule a Meeting
              </h3>
              <Button
                className="mt-8 h-[60px] w-full rounded-[10px] bg-[#4d47ff] [font-family:'Raleway',Helvetica] font-bold text-white hover:bg-[#3f39e6]"
                type="button"
              >
                Schedule Meeting
              </Button>
            </CardContent>
          </Card>
        </div>
        <Card className="relative overflow-hidden rounded-[20px] border-0 bg-[#ffffff] shadow-none">
          <CardContent className="relative p-6 sm:p-[50px]">
            <h3 className="[font-family:'Raleway',Helvetica] text-3xl font-bold leading-9">
              Unlimited Services
            </h3>
            <p className="mt-5 max-w-[383px] [font-family:'Inter',Helvetica] text-sm leading-[21px] text-[#8987A1]">
              Take a look at some of our recent projects to see how we&apos;ve
              helped businesses like yours succeed online.
            </p>
            <div className="mt-8 grid grid-cols-1 gap-x-10 gap-y-[18px] sm:grid-cols-2">
              {featureItems.map((feature, index) => (
                <div
                  className="flex items-center gap-[13px]"
                  key={`${feature}-${index}`}
                >
                  <img src={"/img/Vector.svg"} className="h-6 w-6 text-[#252432]" />
                  <span className="[font-family:'Inter',Helvetica] text-sm leading-[25.2px] text-[#252432]">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-10 flex items-end justify-between rounded-[10px] bg-[#f5f8ff] px-6 py-6">
              <div className="flex items-end gap-2">
                <span className="[font-family:'Inter',Helvetica] text-5xl text-[#252432] font-bold leading-[57.6px]">
                $3,250
              </span>
              <span className="[font-family:'Inter',Helvetica] text-xl leading-[40px] text-[#8987a1]">
                /mo
              </span>
              </div>
              <div className=" flex items-center h-[60px]">
                <ArrowRight className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="relative bg-[#F5F8FF] px-6 py-28 sm:px-10 lg:px-0 z-10">
        <div className=" mx-auto grid max-w-[1216px] gap-16 lg:grid-cols-[500px_696px]">
          <div className="relative">
            
            <h2 className="relative z-10 max-w-[454px] [font-family:'Raleway',Helvetica] text-4xl font-bold leading-tight sm:text-6xl sm:leading-[72px]">
              Frequently Asked Questions
            </h2>
          </div>
          <Accordion
            className="relative z-10 space-y-4"
            collapsible
            defaultValue="faq-0"
            type="single"
          >
            {faqItems.map((item, index) => (
              <AccordionItem
                className="rounded-[10px] border border-[#e3e9f7] bg-white px-6 data-[state=open]:bg-white"
                key={item.question}
                value={`faq-${index}`}
              >
                <AccordionTrigger className="[font-family:'Raleway',Helvetica] text-left text-lg font-bold leading-[21.6px] text-[#252432] hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                {item.answer && (
                  <AccordionContent className="[font-family:'Inter',Helvetica] text-base leading-6 text-[#8987a1]">
                    {item.answer}
                  </AccordionContent>
                )}
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section id="contact" className="relative border-t border-[#d6ddec] py-28 z-10 ">
        <img
    src={"/img/Group 27169.png"}
    alt=""
    className="
    absolute
      bottom-0
      left-1/2
      -translate-x-1/2
      w-[2300px]
      h-[1400px]
      max-w-none
      pointer-events-none
      select-none
      -z-10
    "
  />
        <div className="relative z-10 mx-auto max-w-[696px] px-6">
          <h2 className="text-center [font-family:'Raleway',Helvetica] text-4xl font-bold sm:text-6xl sm:leading-[72px]">
            Let&apos;s Get in Touch
          </h2>
          <form
            className="mt-14 space-y-6"
            onSubmit={(event) => event.preventDefault()}
          >
            <div className="space-y-3">
              <label
                className="[font-family:'Inter',Helvetica] text-lg font-bold leading-[21.6px]"
                htmlFor="email"
              >
                email
              </label>
              <Input
                className="h-[70px] rounded-[10px] border-[#d6ddec] bg-transparent px-8 [font-family:'Inter',Helvetica] text-xl text-[#252432] placeholder:text-[#8987a1]"
                id="email"
                placeholder="example@email.com"
                type="email"
              />
            </div>
            <div className="space-y-3">
              <label
                className="[font-family:'Inter',Helvetica] text-lg font-bold leading-[21.6px]"
                htmlFor="name"
              >
                name
              </label>
              <Input
                className="h-[70px] rounded-[10px] border-[#d6ddec] bg-transparent px-8 [font-family:'Inter',Helvetica] text-xl text-[#252432] placeholder:text-[#8987a1]"
                id="name"
                placeholder="full name"
              />
            </div>
            <div className="space-y-3">
              <label
                className="[font-family:'Inter',Helvetica] text-lg font-bold leading-[21.6px]"
                htmlFor="message"
              >
                message
              </label>
              <Textarea
                className="min-h-[222px] resize-none rounded-[10px] border-[#d6ddec] bg-transparent px-8 py-5 [font-family:'Inter',Helvetica] text-xl text-[#252432] placeholder:text-[#8987a1]"
                id="message"
                placeholder="write your message...."
              />
            </div>
            <Button
              className="h-[60px] w-full rounded-[10px] bg-[#4d47ff] [font-family:'Raleway',Helvetica] text-base font-bold text-white hover:bg-[#3f39e6]"
              type="submit"
            >
              Get in Touch
            </Button>
          </form>
        </div>

      <footer className="relative overflow-hidden px-6 sm:px-10 lg:px-0 mt-28 ">
        <div className="mx-auto max-w-[1216px] rounded-[40px] border border-[#d6ddec] bg-[linear-gradient(137deg,#ffffff_0%,#f6f9ff_100%)] px-8 py-14 sm:px-16">
          <div className="grid gap-12 lg:grid-cols-[1fr_auto]">
            <div>
              <div className="flex h-[41px] items-center gap-2 [font-family:'Raleway',Helvetica] text-2xl font-bold tracking-tight">
                FasterUI
              </div>
              <p className="mt-8 max-w-[356px] [font-family:'Inter',Helvetica] text-base leading-6 text-[#8987a1]">
                Ready to elevate your online presence? Contact us today to
                discuss your project and discover how we can bring your vision
                to life.
              </p>
            </div>
            <div className="flex flex-col items-start gap-12 lg:items-end">
              <nav aria-label="Footer navigation">
                <ul className="flex flex-wrap gap-x-12 gap-y-4">
                  {navigationItems.map((item) => (
                    <li key={item}>
                      <a
                        className={navLinkClass}
                        href={`#${item.toLowerCase().replaceAll(" ", "-")}`}
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="flex gap-[10px]">
                {socialItems.map((Icon, index) => (
                  <div
                    key={index}
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-[#e3e9f7] bg-white text-[#8987a1] transition-colors hover:text-[#4d47ff]"
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-12 flex items-center gap-3 [font-family:'Inter',Helvetica] text-base leading-6 text-[#8987a1]">
            <Heart className="h-6 w-6 text-[#4d47ff]" />
            <span>Made with love powered by inkyy.com</span>
          </div>
        </div>
      </footer>
      </section>

    </main>
  );
}
