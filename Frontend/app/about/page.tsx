import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

export default function About() {
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
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-16 w-16 relative">
                <Image src="/isro-logo.png" alt="ISRO Logo" fill className="object-contain" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6">
              About <span className="text-[#FF9933]">Our</span>{" "}
              <span className="text-[#138808]">Mission</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
              Learn about the team behind ISRO's SAR to RGB conversion technology and our mission to advance remote sensing capabilities.
            </p>
          </div>
        </div>
      </section>

      {/* Indian Pattern Divider */}
      <div className="h-4 bg-gradient-to-r from-[#FF9933] via-white to-[#138808] relative">
        <div className="absolute inset-0 bg-[url('/pattern-overlay.png')] bg-repeat-x opacity-30"></div>
      </div>

      {/* About ISRO Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">About ISRO</h2>
            <div className="w-20 h-1 bg-[#0066b3] mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/india-satellite-view.jpg"
                alt="ISRO Headquarters"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-gray-700 mb-6">
                The Indian Space Research Organisation (ISRO) is the space agency of the Government of India headquartered in Bengaluru. Its vision is to "harness space technology for national development while pursuing space science research and planetary exploration."
              </p>
              <p className="text-gray-700 mb-6">
                Established in 1969, ISRO has become one of the leading space agencies in the world, known for its cost-effective missions and technological advancements in satellite technology, remote sensing, and space exploration.
              </p>
              <p className="text-gray-700">
                Our SAR to RGB conversion tool is part of ISRO's commitment to making advanced space technology accessible and useful for researchers, scientists, and the general public.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Team</h2>
            <div className="w-20 h-1 bg-[#0066b3] mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Meet the talented Computer Science students from Vishwakarma Institute of Technology, Pune who developed this cutting-edge SAR to RGB conversion technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                name: "Vaibhav Kadam",
                bio: "Developer and team lead for the SAR to RGB conversion project.",
                image: "/placeholder-user.jpg"
              },
              {
                name: "Mitali Kachare",
                bio: "Responsible for AI algorithm implementation and model training.",
                image: "/placeholder-user.jpg"
              },
              {
                name: "Prajwal Holkar",
                bio: "Full-stack developer handling frontend and backend integration.",
                image: "/placeholder-user.jpg"
              },
              {
                name: "Rakhi Bharadwaj",
                bio: "Faculty mentor from Vishwakarma Institute of Technology, guiding the project development.",
                image: "/placeholder-user.jpg"
              },
            ].map((member, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-center"
              >
                <div className="w-32 h-32 mx-auto mb-4 relative rounded-full overflow-hidden">
                  <Image
                    src={member.image || "/placeholder-user.jpg"}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision and Mission */}
      <section className="py-16 px-4 bg-gradient-to-r from-[#FF9933]/5 via-white to-[#138808]/5 relative">
        <div className="absolute inset-0 bg-[url('/india-pattern.png')] bg-repeat opacity-5"></div>
        <div className="container mx-auto max-w-5xl relative">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Vision & Mission</h2>
            <div className="w-20 h-1 bg-[#0066b3] mx-auto mb-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
              <h3 className="text-2xl font-semibold mb-4 text-[#FF9933]">Vision</h3>
              <p className="text-gray-700 mb-4">
                To become the world's leading provider of advanced satellite image processing tools, enabling researchers and organizations to gain valuable insights from space-based observations.
              </p>
              <p className="text-gray-700">
                We envision a future where satellite data is accessible and interpretable for everyone, contributing to better decision-making for environmental management, disaster response, and scientific advancement.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
              <h3 className="text-2xl font-semibold mb-4 text-[#138808]">Mission</h3>
              <p className="text-gray-700 mb-4">
                To develop and provide cutting-edge technology for converting complex SAR imagery into intuitive RGB visualizations that preserve critical information while enhancing interpretability.
              </p>
              <p className="text-gray-700">
                We are committed to continuous innovation, building user-friendly tools, and supporting the scientific community with training and resources to maximize the potential of satellite data.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-[#0066b3] text-white">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Join Our Mission</h2>
              <p className="mb-6 text-white/80">
                Be part of the growing community of researchers and institutions using our SAR to RGB conversion technology to unlock new insights from satellite imagery.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-white text-[#0066b3] hover:bg-white/90">
                  <Link href="/convert">Start Converting Now</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white/10"
                >
                  <Link href="/gallery">Explore Gallery</Link>
                </Button>
              </div>
            </div>
            <div className="relative h-[250px] rounded-lg overflow-hidden shadow-lg hidden md:block">
              <Image src="/sar-to-rgb-example.jpeg" alt="Satellite Team" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0066b3] to-transparent opacity-70"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="font-semibold">Working together to unlock the power of Earth observation</p>
                <p className="text-sm">Join our community of researchers and scientists</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

