"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { useEffect } from "react"

export default function About() {
  // Log warnings for placeholder images that need to be replaced
  useEffect(() => {
    console.info("NISAR IMAGES: The following images are used in the 'Why this project Matters?' section:")
    console.info("1. /nisar-satellite.jpg - NISAR satellite image")
    console.info("2. /nisar-infographic-1.png - Dual-frequency SAR infographic")
    console.info("3. /nisar-infographic-2.png - Global coverage infographic")
    console.info("4. /nisar-infographic-3.jpg - Mission timeline infographic")
    console.info("Images are available in Frontend/public directory")
  }, [])
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

      {/* Why this project Matters Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-[#FF9933]/5 via-white to-[#138808]/5 relative">
        <div className="absolute inset-0 bg-[url('/india-pattern.png')] bg-repeat opacity-5"></div>
        <div className="container mx-auto max-w-5xl relative">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why this project Matters?</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#FF9933] via-white to-[#138808] mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-3xl mx-auto">
              The NASA-ISRO Synthetic Aperture Radar (NISAR) mission represents a groundbreaking collaboration between two space agencies, designed to be the world's most advanced radar imaging satellite for monitoring Earth's changing ecosystems, ice mass, and natural hazards.
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* NISAR Satellite Image */}
            <div className="lg:col-span-1">
              <div className="relative h-[300px] rounded-lg overflow-hidden shadow-lg mb-4">
                {/* NISAR Satellite Image */}
                <Image 
                  src="/nisar-satellite.jpg" 
                  alt="NISAR Satellite - NASA-ISRO SAR Mission" 
                  fill 
                  className="object-cover transition-transform hover:scale-105 duration-500"
                />
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100">
                <h3 className="text-xl font-semibold text-[#FF9933] mb-2">NISAR Mission</h3>
                <p className="text-gray-700 text-sm mb-2">
                  NISAR is the first joint NASA-ISRO satellite mission, estimated to cost $1.5 billion, scheduled for launch in early 2024 aboard India's GSLV Mark II rocket.
                </p>
                <p className="text-gray-700 text-sm">
                  The satellite will map the entire globe every 12 days with a suite of instruments that includes the first dual-frequency (L-band and S-band) synthetic aperture radar (SAR) imaging system.
                </p>
              </div>
            </div>

            {/* Key Benefits Cards */}
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Card 1 */}
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow group">
                <div className="w-12 h-12 bg-[#FF9933]/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#FF9933]/20 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#FF9933]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Deforestation & Biomass</h3>
                <p className="text-gray-700">
                  NISAR will track disturbances in forests and changes in land use with its L-band SAR penetrating through forest canopies. The mission aims to systematically map forests globally, measuring changes in biomass and detecting deforestation patterns with unprecedented precision.
                </p>
              </div>
              
              {/* Card 2 */}
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow group">
                <div className="w-12 h-12 bg-[#138808]/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#138808]/20 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#138808]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Natural Hazards</h3>
                <p className="text-gray-700">
                  NISAR's combined L-band and S-band radar will provide detailed monitoring of earthquakes, volcanic eruptions, landslides, and ground subsidence. The satellite can capture surface changes as small as 1 centimeter, revolutionizing our ability to understand, predict, and respond to disasters.
                </p>
              </div>
              
              {/* Card 3 */}
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow group">
                <div className="w-12 h-12 bg-[#138808]/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#138808]/20 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#138808]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Ice Sheet Monitoring</h3>
                <p className="text-gray-700">
                  With its all-weather capability, NISAR will continuously monitor polar ice sheets and glaciers, helping scientists measure ice velocity and changes in ice sheet mass and their contribution to sea level rise—crucial data for climate change research and coastal communities.
                </p>
              </div>
              
              {/* Card 4 */}
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow group">
              <div className="w-12 h-12 bg-[#FF9933]/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#FF9933]/20 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#FF9933]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                  </svg>
              </div>

                <h3 className="text-lg font-semibold mb-2">SAR to RGB Conversion</h3>
                <p className="text-gray-700">
                  Our project directly supports NISAR's mission by converting its complex SAR data into intuitive RGB images. This technology democratizes access to NISAR's observations, making them interpretable for policymakers, educators, and citizens without specialized radar expertise.
                </p>
              </div>
            </div>
          </div>
          
          {/* Infographic Section */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <h3 className="text-xl font-semibold text-center mb-6 text-[#0066b3]">NISAR: A Revolutionary NASA-ISRO Collaboration</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="text-center">
                <div className="relative h-32 w-full mb-4">
                  {/* Dual-frequency SAR infographic */}
                  <Image src="/nisar-infographic-1.png" alt="NISAR Dual-Frequency SAR Technology" fill className="object-contain" />
                </div>
                <div className="border-t-2 border-[#FF9933] w-16 mx-auto pt-2 mt-2">
                  <p className="text-gray-700 font-semibold">Dual-Frequency SAR</p>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  L-band (NASA) and S-band (ISRO) radars working together to measure Earth's changing surface with unprecedented detail and temporal coverage
                </p>
              </div>
              
              <div className="text-center">
                <div className="relative h-32 w-full mb-4">
                  {/* Global coverage infographic */}
                  <Image src="/nisar-infographic-2.png" alt="NISAR Global Coverage and Monitoring Capabilities" fill className="object-contain" />
                </div>
                <div className="border-t-2 border-[#138808] w-16 mx-auto pt-2 mt-2">
                  <p className="text-gray-700 font-semibold">Advanced Capabilities</p>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Scanning 85% of the globe every 12 days with all-weather, day/night imaging and the ability to detect surface changes as small as 1cm
                </p>
              </div>
              
              <div className="text-center">
                <div className="relative h-32 w-full mb-4">
                  {/* Mission timeline infographic */}
                  <Image src="/nisar-infographic-3.jpg" alt="NISAR Mission Timeline and Applications" fill className="object-contain" />
                </div>
                <div className="border-t-2 border-[#FF9933] w-16 mx-auto pt-2 mt-2">
                  <p className="text-gray-700 font-semibold">Mission Timeline</p>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Scheduled for early 2025 launch by ISRO's GSLV Mark II, with a planned minimum 3-year mission lifecycle generating 140 terabytes of data per year
                </p>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-gray-600 italic">
                "NISAR represents an unprecedented international collaboration that will provide critical information to better manage natural resources and hazards, as well as providing information about the effects and pace of climate change."
              </p>
              <p className="text-xs text-gray-500 mt-2">— NASA JPL and ISRO Official Statement</p>
            </div>
            
            <div className="flex justify-center mt-6">
              <div className="bg-gradient-to-r from-[#FF9933]/5 to-[#138808]/5 rounded-lg px-6 py-4 max-w-2xl border border-gray-100 shadow-sm">
                <h4 className="font-semibold text-center text-[#138808] mb-2">Why Our SAR to RGB Conversion Matters</h4>
                <p className="text-sm text-gray-700">
                  NISAR will generate approximately 140 terabytes of data per year, most of it in complex SAR format. Our conversion technology transforms this raw data into interpretable RGB images, making NISAR's revolutionary observations accessible to researchers, policymakers, and educators without specialized radar expertise.
                </p>
              </div>
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

