import { HeroSection } from '../components/home/HeroSection'
import { ExamCategories } from '../components/home/ExamCategories'
import { FeaturesSection } from '../components/home/FeaturesSection'
import { FeaturedCourses } from '../components/home/FeaturedCourses'

export function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ExamCategories />
      <FeaturesSection />
      <FeaturedCourses />
    </div>
  )
}