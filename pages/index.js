import React, { useEffect } from "react";
import config from "@config/config.json";
import Base from "@layouts/Baseof";
import Cta from "@layouts/components/Cta";
import Contact from "@layouts/Contact";
import { markdownify } from "@lib/utils/textConverter";
import Image from "next/image";
import Link from "next/link";
import "swiper/swiper.min.css";
import { getListPage } from "../lib/contentParser";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const Home = (props) => {
  const {
    banner,
    feature,
    verra,
    services,
    benefits,
    contact_us,
    call_to_action,
  } = props.frontmatter;
  const { title } = config.site;
  const { t } = useTranslation("common");

  const technologyData = t("technology.content", { returnObjects: true });
  const verraData = t("verra.content", { returnObjects: true });
  const benefitsData = t("benefits.content", { returnObjects: true });
  const contactData = t("contactUs", { returnObjects: true });

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
      });
    } else {
      console.warn("Element with ID '" + id + "' not found.");
    }
  };

  return (
    <Base title={title}>
      {/* Banner */}
      <section className="section mt-[77px] pb-[50px]">
        <div className="align-center container flex h-[400px] items-center ">
          <div className="row">
            <div className="mx-auto">
              <h1 className="text-left font-primary font-[40px] font-bold">
                {markdownify(t("banner.title"))}
              </h1>
              <p className="mt-4 text-left">
                {markdownify(t("banner.description"))}
              </p>

              <button
                className="btn btn-primary z-0 mt-8  py-[10px] "
                rel=""
                type="button"
                onClick={() => scrollTo("introduction")}
              >
                {t("explore")}
              </button>
              {/* {banner.button.enable && (
                <Link
                  className="btn btn-primary mt-4"
                  href={banner.button.link}
                  rel={banner.button.rel}
                >
                  {banner.button.label}
                </Link>
              )} */}
              {/* <Image
                className="mx-auto mt-12"
                src={banner.image}
                width={750}
                height={390}
                alt="banner image"
                priority
              /> */}
            </div>
          </div>
        </div>
      </section>

      {/* Indroduction */}
      <section className={`section bg-theme-light`} id="introduction">
        <div className="container">
          <div className="relative items-center gap-8 md:grid md:grid-cols-2">
            <div className={`service-content z-10 mt-5 md:mt-0`}>
              <h2 className="font-bold leading-[40px]">
                {markdownify(t("intro.title"))}
              </h2>
              <p className="mb-2 mt-4">{markdownify(t("intro.description"))}</p>
            </div>
            <Image
              src="/images/Introduction.jpeg"
              width={800}
              height={600}
              alt="indroduction"
              className="right-0 top-0 rounded-xl object-cover"
            />
          </div>
        </div>
      </section>

      {/* About Us */}
      <section className="section px-4" id="about_us">
        <div className="section container rounded-xl shadow">
          <div className="row  mx-auto items-center justify-center">
            <div className="mt-5 text-center md:col-6 lg:col-5 md:mt-0 md:text-left">
              <h2>{markdownify(t("aboutUs.title"))}</h2>
              <p className="mt-6 font-bold italic">
                {markdownify(t("aboutUs.subTitle"))}
              </p>
              <p className="bold mt-6">
                {markdownify(t("aboutUs.description"))}
              </p>
              {/* {cta.button.enable && (
                <Link
                  className="btn btn-primary mt-4"
                  href={cta.button.link}
                  rel={cta.button.rel}
                >
                  {cta.button.label}
                </Link>
              )} */}
            </div>
            <div className="md:col-5 lg:col-4">
              <Image
                className="w-full"
                src={"/images/logoWithSlogan.svg"}
                alt="call to action image"
                width={325}
                height={206}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Technology */}
      <section className="section" id="technology">
        <h2 className="mt-4 text-center font-bold leading-[40px]">
          {markdownify(t("technology.title"))}
        </h2>
        {technologyData.map((item, index) => {
          const isOdd = index % 2 > 0;
          return (
            <section
              key={`item-${index}`}
              className={`section ${isOdd && "bg-theme-light"}`}
            >
              <div className="container">
                <div className="items-center gap-8 md:grid md:grid-cols-2">
                  {/* Carousel */}
                  <div className={`item-carousel ${!isOdd && "md:order-2"}`}>
                    <Image
                      src={item?.post.image}
                      alt="technology"
                      className="right-0 top-0 rounded-xl object-cover"
                      width={600}
                      height={500}
                    />
                  </div>

                  {/* Content */}
                  <div
                    className={`item-content mt-5 md:mt-0 ${
                      !isOdd && "md:order-1"
                    }`}
                  >
                    <h2 className="font-bold leading-[40px]">
                      {item?.post.title}
                    </h2>
                    <h3 className="font-bold text-neutral-400">
                      {item?.post.subtitle}
                    </h3>
                    <p className="mb-2 mt-4">{item?.post.description}</p>
                    {/* {item.button.enable && (
                      <Link
                        href={item?.button.link}
                        className="cta-link inline-flex items-center text-primary"
                      >
                        {item?.button.label}
                        <Image
                          className="ml-1"
                          src="/images/arrow-right.svg"
                          width={18}
                          height={14}
                          alt="arrow"
                        />
                      </Link>
                    )} */}
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </section>

      {/* Certificate */}
      <section className="section bg-theme-light">
        <div className="container">
          <div className="text-center">
            <h2>{markdownify(t("certificate.title"))}</h2>
            <p className="mt-4">{markdownify(t("certificate.description"))}</p>
            <h4 className="mt-3 text-neutral-400">Coming Soon...</h4>
          </div>

          <div className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* {feature.features.map((item, i) => (
              <div
                className="feature-card rounded-xl bg-white p-5 pb-8 text-center"
                key={`feature-${i}`}
              >
                {item.icon && (
                  <Image
                    className="mx-auto"
                    src={item.icon}
                    width={30}
                    height={30}
                    alt=""
                  />
                )}
                <div className="mt-4">
                  {markdownify(item.name, "h3", "h5")}
                  <p className="mt-3">{item.content}</p>
                </div>
              </div>
            ))} */}
          </div>
        </div>
      </section>

      {/* Verra */}
      <section className="section bg-theme-light">
        <div className="container">
          <div className="text-center">
            <h2>{markdownify(t("verra.title"))}</h2>
            <p className="mt-4">{markdownify(t("verra.description"))}</p>
          </div>
          <div className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-2">
            {verraData.map((item, i) => (
              <div
                className="feature-card rounded-xl bg-white p-5 pb-8 text-center"
                key={`feature-${i}`}
              >
                {item.image && (
                  <Image
                    className="mx-auto"
                    src={item.image}
                    width={30}
                    height={30}
                    alt=""
                  />
                )}
                <div className="mt-4">
                  {markdownify(item.title, "h3", "h5")}
                  <p className="mt-3">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <div className="section pt-0 md:px-10" id="benefits">
        <div className="container">
          <h2 className="my-14 text-center font-bold leading-[40px]">
            {markdownify(t("benefits.title"))}
          </h2>
          <div className="flex w-full flex-wrap justify-center md:px-10">
            {benefitsData.map((benefit, i) => (
              <div
                key={`key-${i}`}
                className="mx-4 mb-8 w-[100%] lg:w-[40%] xl:w-[30%]"
              >
                {benefit.image && (
                  <Image
                    className="mx-auto h-[300px] w-full rounded-lg object-cover lg:h-[200px] lg:w-[400px]"
                    src={benefit.image}
                    alt={benefit.title}
                    width={600}
                    height={400}
                  />
                )}
                <h2 className="h3 mb-2 mt-4">
                  <Link
                    // href={`/${blog_folder}/${post.slug}`}
                    href=""
                    className="block hover:text-primary"
                  >
                    {benefit.title}
                  </Link>
                </h2>
                <p className="text-text">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Us */}
      <Contact data={contactData} />
    </Base>
  );
};

export const getStaticProps = async ({ locale }) => {
  const homePage = await getListPage("content/_index.md");
  const { frontmatter } = homePage;

  return {
    props: {
      frontmatter,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};

export default Home;
