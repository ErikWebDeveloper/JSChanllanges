import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export default function FullPageLayout({ children, className = "" }: Props) {
  return (
    <section
      style={{ minHeight: "100dvh" }}
      className={`d-flex flex-column align-items-center justify-content-center ${className}`}
    >
      {children}
    </section>
  );
}
