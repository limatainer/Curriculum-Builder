import { motion } from "motion/react";
import { LuGlobe, LuMail, LuMapPin, LuPhone, LuUser } from "react-icons/lu";
import { withAlpha } from "@/helpers/color";
import type { ResumeData } from "@/types";
import { T } from "./tokens";

const CONTACT_ICONS = {
  phone: LuPhone,
  email: LuMail,
  website: LuGlobe,
  address: LuMapPin,
};

type ContactKind = keyof typeof CONTACT_ICONS;

const contactIconStyle = {
  width: "var(--doc-size-icon)",
  height: "var(--doc-size-icon)",
  flexShrink: 0,
  opacity: "var(--doc-emphasis-muted)",
};

export function ResumeHeader({
  data,
  hex,
  fgColor,
}: {
  data: ResumeData;
  hex: string;
  fgColor: string;
}) {
  const contacts = (
    [
      ["phone", data.phone],
      ["email", data.email],
      ["website", data.website],
      ["address", data.address],
    ] as [ContactKind, string][]
  ).filter(([, text]) => text.trim() !== "");

  return (
    <header style={{ backgroundColor: hex, color: fgColor }}>
      <div
        className="flex items-center"
        style={{
          gap: "var(--doc-space-180)",
          padding: "var(--doc-space-220) var(--doc-space-260) var(--doc-space-180)",
        }}
      >
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 220, damping: 18 }}
          className="flex-shrink-0 rounded-full overflow-hidden flex items-center justify-center"
          style={{
            width: "var(--doc-size-photo)",
            height: "var(--doc-size-photo)",
            border: `var(--doc-border-photo) solid ${withAlpha(fgColor, 20)}`,
            backgroundColor: withAlpha(fgColor, 13),
          }}
        >
          {data.photo ? (
            <img src={data.photo} alt="Foto" className="w-full h-full object-cover" />
          ) : (
            <LuUser
              style={{
                width: "var(--doc-size-icon-lg)",
                height: "var(--doc-size-icon-lg)",
                color: withAlpha(fgColor, 53),
              }}
            />
          )}
        </motion.div>

        <div className="min-w-0" style={{ display: "grid", gap: "var(--doc-space-35)" }}>
          <motion.h1
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 240, damping: 24, delay: 0.05 }}
            className="font-black font-heading"
            style={{
              fontSize: T.name,
              lineHeight: "var(--doc-leading-name)",
              letterSpacing: "var(--doc-tracking-name)",
              color: fgColor,
              overflowWrap: "anywhere",
            }}
          >
            {data.name}
          </motion.h1>
          <div
            className="font-light uppercase"
            style={{
              fontSize: T.title,
              lineHeight: "var(--doc-leading-title)",
              letterSpacing: "var(--doc-tracking-wide)",
              color: withAlpha(fgColor, 80),
              overflowWrap: "anywhere",
            }}
          >
            {data.title}
          </div>
        </div>
      </div>

      {contacts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="flex flex-wrap items-center"
          style={{
            gap: "var(--doc-space-60) var(--doc-space-180)",
            padding: "var(--doc-space-90) var(--doc-space-260)",
            fontSize: T.small,
            backgroundColor: withAlpha(fgColor, 9),
            borderTop: `var(--doc-hairline) solid ${withAlpha(fgColor, 13)}`,
          }}
        >
          {contacts.map(([kind, text], i) => {
            const Icon = CONTACT_ICONS[kind];
            return (
              <motion.div
                key={kind}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 + i * 0.06 }}
                className="flex items-center whitespace-nowrap"
                style={{ gap: "var(--doc-space-50)", color: fgColor }}
              >
                <Icon style={contactIconStyle} aria-hidden="true" />
                <span style={{ opacity: "var(--doc-emphasis-strong)" }}>{text}</span>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </header>
  );
}
