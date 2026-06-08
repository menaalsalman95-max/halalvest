import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mesh-bg min-h-screen">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
