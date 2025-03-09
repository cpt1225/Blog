import Hero from "@/components/Page/Hero"
import dynamic from 'next/dynamic';
const Feature = dynamic(
  () => import("@/components/Page/Feature"), 
  {
    loading: () => (
      <div className="h-96 bg-gray-50 animate-pulse rounded-lg" /> // 高度占位防止布局抖动
    )
  }
);

const Footer = dynamic(
  () => import("@/components/Page/Footer"),
  {
    loading: () => <div className="h-20 bg-gray-100" />, // Footer通常不需要复杂占位
  }
);

const Home = () => {
  return(
    <div className="min-h-screen">
      <Hero />
      <Feature />
      <Footer />
    </div>
  )
}

export default Home
