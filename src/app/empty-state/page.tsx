import Image from "next/image";
import Link from "next/link";
import { Button, type ButtonVariant } from "@/components/ui/button/Button";
import {
  CONTENT_CONTAINER_CLASSES,
  TEXT_SECTION_CLASSES,
  HEADING_CLASSES,
  DESCRIPTION_CLASSES,
  FOOTER_LOGO_CONTAINER_CLASSES,
  FOOTER_LOGO_IMAGE_CLASSES,
} from "@/lib/page-styles";

// Constants
const BUTTON_VARIANT: ButtonVariant = "secondary";
const BUTTON_LABEL = "Home";

const METADATA = {
  title: "Under Development",
  description: "We're building this to make parking even easier",
};

export default function EmptyStatePage() {
  return (
    <div className="flex flex-col items-center min-h-screen">
      <div className={CONTENT_CONTAINER_CLASSES}>
        <div className={TEXT_SECTION_CLASSES}>
          <h1 className={HEADING_CLASSES}>{METADATA.title}</h1>
          <p className={DESCRIPTION_CLASSES}>{METADATA.description}</p>
        </div>

        <div className="flex min-w-full flex-col items-start gap-[var(--component-page-gap-default)] self-stretch">
          <Link className="w-full" href="/home">
            <Button variant={BUTTON_VARIANT}>{BUTTON_LABEL}</Button>
          </Link>
        </div>
      </div>

      <div className={FOOTER_LOGO_CONTAINER_CLASSES}>
        <Image
          className={FOOTER_LOGO_IMAGE_CLASSES}
          src="/sdsu-logo1.png"
          alt="SDSU Logo"
          width={158}
          height={24}
          priority
        />
      </div>
    </div>
  );
}
