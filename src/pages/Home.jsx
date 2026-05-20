import Hero                from '../components/Hero';
import StatsBar            from '../components/StatsBar';
import HomepageCategories  from '../components/HomepageCategories';
import FeaturedFleet       from '../components/FeaturedFleet';
import CharterSection      from '../components/CharterSection';
import ServicesSection     from '../components/ServicesSection';
import ExperienceSection   from '../components/ExperienceSection';
import Testimonials        from '../components/Testimonials';
import CTASection          from '../components/CTASection';

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBar />
      <HomepageCategories />
      <FeaturedFleet />
      <CharterSection />
      <ServicesSection />
      <ExperienceSection />
      <Testimonials />
      <CTASection />
    </>
  );
}
