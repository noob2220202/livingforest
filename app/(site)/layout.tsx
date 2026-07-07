import { StoreProvider } from "@/lib/store-context";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PromoBar from "@/components/PromoBar";
import QuickViewModal from "@/components/QuickViewModal";
import SwatchRequestModal from "@/components/SwatchRequestModal";
import CartDrawer from "@/components/CartDrawer";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <PromoBar />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <QuickViewModal />
      <SwatchRequestModal />
      <CartDrawer />
    </StoreProvider>
  );
}
