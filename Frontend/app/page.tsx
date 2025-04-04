import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import TestimonialCarousel from "@/components/testimonial-carousel"

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section with Indian-themed background */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#FF9933]/10 via-white to-[#138808]/10"></div>
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-white to-transparent"></div>
          <Image src="/india-map-bg.png" alt="India Map Background" fill className="object-cover opacity-5" />
        </div>

        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="h-10 w-10 relative">
                  <Image src="/isro-logo.png" alt="ISRO Logo" fill className="object-contain" />
                </div>
                <div className="h-8 w-8 relative">
                  <Image src="/ashoka-chakra.png" alt="Ashoka Chakra" fill className="object-contain" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6">
                Advanced SAR to RGB <span className="text-[#FF9933]">Image</span>{" "}
                <span className="text-[#138808]">Conversion</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Transform Synthetic Aperture Radar (SAR) imagery into vibrant RGB visuals with ISRO's cutting-edge AI
                technology. Unlock new insights from satellite data.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-[#0066b3] hover:bg-[#004c8c] group">
                  <Link href="/convert">
                    Start Converting
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-[#FF9933] text-[#FF9933] hover:bg-[#FF9933]/10"
                >
                  <Link href="/gallery">View Gallery</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden shadow-lg border-4 border-white">
                <Image
                  src="/sar-to-rgb-example.png"
                  alt="SAR to RGB Conversion Example"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-white p-2 shadow-lg hidden md:block">
                <div className="w-full h-full rounded-full bg-[#0066b3] flex items-center justify-center text-white font-bold text-sm">
                  ISRO
                  <br />
                  TECH
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Indian Pattern Divider */}
      <div className="h-4 bg-gradient-to-r from-[#FF9933] via-white to-[#138808] relative">
        <div className="absolute inset-0 bg-[url('/pattern-overlay.png')] bg-repeat-x opacity-30"></div>
      </div>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Key Features</h2>
            <div className="w-20 h-1 bg-[#0066b3] mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Advanced AI Processing",
                description: "State-of-the-art neural networks trained on ISRO satellite imagery",
                icon: "/ai-icon.png",
              },
              {
                title: "High Precision",
                description: "Accurate color mapping preserving critical terrain details",
                icon: "/precision-icon.png",
              },
              {
                title: "Fast Conversion",
                description: "Process complex SAR images in seconds with our optimized algorithms",
                icon: "/speed-icon.png",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow group"
              >
                <div className="w-16 h-16 mb-4 relative mx-auto">
                  <Image
                    src={feature.icon || "/placeholder.svg"}
                    alt={feature.title}
                    fill
                    className="object-contain group-hover:scale-110 transition-transform"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">{feature.title}</h3>
                <p className="text-gray-600 text-center">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <div className="w-20 h-1 bg-[#0066b3] mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our advanced AI model transforms complex SAR data into intuitive RGB images that are easier to analyze and
              interpret.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-1/4 left-0 right-0 h-0.5 bg-gradient-to-r from-[#FF9933] via-[#FFFFFF] to-[#138808] z-0"></div>

            {[
              {
                step: "1",
                title: "Upload SAR Image",
                description: "Drag and drop your SAR image files to begin the conversion process",
                icon: "/upload-icon.png",
              },
              {
                step: "2",
                title: "AI Processing",
                description: "Our advanced algorithms analyze and convert the SAR data to RGB format",
                icon: "/process-icon.png",
              },
              {
                step: "3",
                title: "Download Results",
                description: "View, compare and download your converted images in high resolution",
                icon: "/download-icon.png",
              },
            ].map((step, index) => (
              <div key={index} className="flex flex-col items-center relative z-10">
                <div className="w-16 h-16 mb-4 relative">
                  <Image src={step.icon || "/placeholder.svg"} alt={step.title} fill className="object-contain" />
                </div>
                <div className="w-12 h-12 rounded-full bg-[#0066b3] text-white flex items-center justify-center text-xl font-bold mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">{step.title}</h3>
                <p className="text-gray-600 text-center">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-[#FF9933]/5 via-white to-[#138808]/5 relative">
        <div className="absolute inset-0 bg-[url('/india-pattern.png')] bg-repeat opacity-5"></div>
        <div className="container mx-auto max-w-5xl relative">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Scientists Say</h2>
            <div className="w-20 h-1 bg-[#0066b3] mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear from researchers and scientists who use our SAR to RGB conversion technology
            </p>
          </div>

          <TestimonialCarousel />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-[#0066b3] text-white">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Ready to Transform Your SAR Data?</h2>
              <p className="mb-6 text-white/80">
                Join leading researchers and institutions across India who are already using our technology to gain new
                insights from satellite imagery.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-white text-[#0066b3] hover:bg-white/90">
                  <Link href="/convert">Start Converting Now</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                  <Link href="/gallery">Explore Gallery</Link>
                </Button>
              </div>
            </div>
            <div className="relative h-[250px] rounded-lg overflow-hidden shadow-lg hidden md:block">
              <Image src="/india-satellite-view.png" alt="India Satellite View" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0066b3] to-transparent opacity-70"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="font-semibold">Discover the beauty of India from space</p>
                <p className="text-sm">Enhanced with our SAR to RGB conversion</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

