import Social from "@components/Social";
import config from "@config/config.json";
import menu from "@config/menu.json";
import social from "@config/social.json";
import { markdownify } from "@lib/utils/textConverter";
import Image from "next/image";
import Link from "next/link";
import { useTranslation, i18n } from "next-i18next";

const Footer = () => {
  const { copyright, footer_content } = config.params;
  const { footer } = menu;
  const { t } = useTranslation("common");

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
    <footer className="section bg-theme-light pb-0">
      <div className="container">
        {/* footer menu */}
        <div className="row">
          {footer.map((col) => {
            console.log("col", col);
            return (
              <button
                className="mb-12 sm:col-6 lg:col-3"
                key={col.name}
                onClick={() => scrollTo(col.id)}
              >
                {markdownify(t(`header.${col.name}`), "h2", "h4")}
              </button>
            );
          })}
          <div className="md-12 sm:col-6 lg:col-3">
            <Link href="/" aria-label="Bigspring">
              <Image
                src={config.site.logo}
                width={config.site.logo_width}
                height={config.site.logo_height}
                alt=""
              />
            </Link>
            {markdownify(footer_content, "p", "mt-3 mb-6")}
          </div>
        </div>
        {/* copyright */}
        <div className="border-t border-border py-6">
          {markdownify(copyright, "p", "text-sm text-center")}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
