import { QuestionMarkCircleIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { JSX } from "react";
import type { Language } from "../../../store/appSlice";
import { messages } from "../../i18n/messages";

interface NavbarProps {
  language: Language;
  tutorialOpen: boolean;
  onLanguageChange: (language: Language) => void;
  onLogoClick: () => void;
  onOpenTutorial: () => void;
}

export function Navbar({
  language,
  tutorialOpen,
  onLanguageChange,
  onLogoClick,
  onOpenTutorial,
}: NavbarProps): JSX.Element {
  const ui = messages[language].navbar;

  return (
    <nav
      aria-label={ui.primaryNavigation}
      className="relative z-[950] flex h-14 w-full shrink-0 items-stretch bg-white/95 px-2"
    >
      <Link
        aria-label={ui.returnToBeginning}
        className="navbar-logo relative mr-2 w-18 shrink-0 sm:w-24"
        href="/"
        onClick={onLogoClick}
      >
        <Image
          src="/assets/cropped-logoOctober-1.png"
          fill
          className="ml-4 scale-150"
          style={{ objectFit: "contain" }}
          sizes="(min-width: 640px) 96px, 88px"
          alt={ui.logoAlt}
          priority
        />
      </Link>
      <div
        aria-label={ui.language}
        className="ml-auto my-2 flex overflow-hidden rounded-md border border-gray-300"
        role="group"
      >
        {(["en", "da"] as const).map((locale) => (
          <button
            key={locale}
            type="button"
            aria-pressed={language === locale}
            className={`cursor-pointer min-w-9 px-2 text-xs font-medium transition-colors focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gray-500 sm:min-w-16 sm:text-sm ${locale === "da" ? "border-l border-gray-300" : ""
              } ${language === locale
                ? "bg-gray-700 text-white"
                : "bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-950"
              }`}
            onClick={(event) => {
              event.stopPropagation();
              onLanguageChange(locale);
            }}
          >
            <span className="sm:hidden">{locale.toUpperCase()}</span>
            <span className="hidden sm:inline">
              {locale === "en" ? ui.english : ui.danish}
            </span>
          </button>
        ))}
      </div>

      <button
        type="button"
        className="cursor-pointer ml-2 my-2 flex items-center gap-1 rounded-md border border-gray-300 px-2 text-sm text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500"
        aria-label={ui.openTutorial}
        aria-expanded={tutorialOpen}
        onClick={(event) => {
          event.stopPropagation();
          onOpenTutorial();
        }}
      >
        <span className="hidden md:inline">{ui.tutorial}</span>
        <QuestionMarkCircleIcon className="size-5 fill-gray-600" />
      </button>
    </nav>
  );
}
