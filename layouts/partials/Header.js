import Logo from "@components/Logo";
import config from "@config/config.json";
import menu from "@config/menu.json";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useTranslation, i18n } from "next-i18next";

const Header = () => {
  //router
  const router = useRouter();

  // distructuring the main menu from menu object
  const { main } = menu;

  // language translation
  const { t } = useTranslation("common");

  // states declaration
  const [navOpen, setNavOpen] = useState(false);

  // show/hide header
  const [isShow, setIsShow] = useState(false);

  // logo source
  const { logo } = config.site;
  const { enable, label, link, scroll_id } = config.nav_button;

  // language
  const [language, setLanguage] = useState("");

  // language list
  const languageList = [
    { id: 1, name: "English" },
    { id: 2, name: "繁體中文" },
    { id: 3, name: "简体中文" },
  ];

  let lastScrollTop = 0;
  const handleScroll = () => {
    let clientHeight = document.documentElement.clientHeight; // 可視區域高度
    let scrollTop = document.documentElement.scrollTop; // 滾動條滾動高度
    let scrollHeight = document.documentElement.scrollHeight; // 滾動內容高度
    // console.log("scrollTop", scrollTop, 'lastScrollY', lastScrollTop, 'clientHeight', clientHeight, 'scrollHeight', scrollHeight);
    if (scrollTop < 77) return;

    if (scrollTop > lastScrollTop) {
      setIsShow(true);
      setNavOpen(false);
    } else {
      setIsShow(false);
      setNavOpen(false);
    }
    lastScrollTop = document.documentElement.scrollTop;
    // 判斷是否滾動到底部
    if (scrollTop + clientHeight === scrollHeight) {
      console.log("滾動到底部");
    }
  };

  useEffect(() => {
    // 監聽
    window.addEventListener("scroll", handleScroll);
    // 清除
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (language === "English") {
      router.push("/", "/", { locale: "en" });
      i18n.changeLanguage("en");
    }
    if (language === "繁體中文") {
      router.push("/", "/", { locale: "tw" });
      i18n.changeLanguage("tw");
    }
    if (language === "简体中文") {
      router.push("/", "/", { locale: "cn" });
      i18n.changeLanguage("cn");
    }
  }, [language]);

  useEffect(() => {
    if (router.locale === "en") {
      setLanguage("English");
    } else if (router.locale === "tw") {
      setLanguage("繁體中文");
    } else if (router.locale === "cn") {
      setLanguage("简体中文");
    }
  }, [router]);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      // add height to the element
      element.scrollIntoView({
        behavior: "smooth",
      });
    } else {
      console.warn("Element with ID '" + id + "' not found.");
    }
  };

  const LanguageDropdown = () => {
    return (
      <Menu
        as="div"
        className="relative inline-block flex items-center text-left md:mx-3"
      >
        <div>
          <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            <span>{language}</span>
            <ChevronDownIcon
              className="-mr-1 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute  top-10 z-10 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none md:right-0">
            <div className="py-1">
              {languageList.map((item, index) => (
                <Menu.Item key={index}>
                  {({ active }) => (
                    <a
                      href="#"
                      className={`block px-4 py-2 text-sm ${
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                      }`}
                      onClick={() => setLanguage(item.name)}
                    >
                      {item.name}
                    </a>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    );
  };

  return (
    <header className={`header show ${isShow && "hide"}`}>
      <nav className="navbar md:container ">
        {/* logo */}
        <div className="order-0">
          <Logo src={logo} />
        </div>

        {/* navbar toggler */}
        <div className="order-1 flex items-center md:hidden">
          <button
            id="show-button"
            className="order-2 flex cursor-pointer items-center md:order-1 md:hidden"
            onClick={() => setNavOpen(!navOpen)}
          >
            {navOpen ? (
              <svg className="h-6 fill-current" viewBox="0 0 20 20">
                <title>Menu Open</title>
                <polygon
                  points="11 9 22 9 22 11 11 11 11 22 9 22 9 11 -2 11 -2 9 9 9 9 -2 11 -2"
                  transform="rotate(45 10 10)"
                />
              </svg>
            ) : (
              <svg className="h-6 fill-current" viewBox="0 0 20 20">
                <title>Menu Close</title>
                <path d="M0 3h20v2H0V3z m0 6h20v2H0V9z m0 6h20v2H0V0z" />
              </svg>
            )}
          </button>
        </div>

        {/* Menu */}
        <div
          id="nav-menu"
          className={`order-3 flex overflow-hidden md:order-1 md:overflow-visible ${
            navOpen ? "max-h-[1000px]" : "max-h-0"
          }`}
        >
          <ul className="navbar-nav mr-2 block w-full md:flex md:w-auto lg:space-x-2">
            <div className="md:hidden">
              <LanguageDropdown />
            </div>
            {main.map((menu, i) => (
              <React.Fragment key={`menu-${i}`}>
                <li className="nav-item">
                  <button
                    href={menu.url}
                    onClick={() => scrollTo(menu.id)}
                    // className={`nav-link block ${
                    //   router.asPath === menu.url ? "nav-link-active" : ""
                    // }`}
                    className={`nav-link block`}
                  >
                    {t(`header.${menu.name}`)}
                  </button>
                </li>
              </React.Fragment>
            ))}
            {enable && (
              <li className="md:hidden">
                <button
                  className="btn btn-primary z-0 py-[10px]"
                  href={link}
                  rel=""
                  onClick={() => scrollTo(scroll_id)}
                >
                  {label}
                </button>
              </li>
            )}
          </ul>
          {enable && (
            <div className="d-flex order-1 ml-auto hidden min-w-[200px] items-center justify-end md:order-2 md:ml-0 md:flex">
              <button
                className="btn btn-primary z-0 py-[10px]"
                href={link}
                rel=""
                onClick={() => scrollTo(scroll_id)}
              >
                {t("header.requestSample")}
              </button>
              <LanguageDropdown />
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
