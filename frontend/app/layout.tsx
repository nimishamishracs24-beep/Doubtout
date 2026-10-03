

// @ts-expect-error Next.js handles CSS imports at build time.
import "./globals.css";

export const metadata = {
  title: "DoubtOut",
  description: "University doubt-solving platform"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
