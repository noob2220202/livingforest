import Hero from "@/components/Hero";
import BestSellers from "@/components/BestSellers";
import GetTheLook from "@/components/GetTheLook";
import CategoryGrid from "@/components/CategoryGrid";
import Newsletter from "@/components/Newsletter";

export default function Home() {
  return (
    <>
      <Hero />
      <BestSellers />
      <GetTheLook />
      <CategoryGrid />
      <Newsletter />
    </>
  );
}
