<script setup lang="ts">
import type { PortfolioContent } from '~/models/portfolio'

const { content } = usePortfolioContent()

const portfolioData = computed(() => {
  if (!content.value?.meta) return null
  return content.value.meta as unknown as PortfolioContent
})

const heroData = computed(() => portfolioData.value?.hero)
const clientsData = computed(() => portfolioData.value?.clients)
const portfolioProjects = computed(() => portfolioData.value?.portfolio)
const contactData = computed(() => portfolioData.value?.contact)

useSeoMeta({
  title: 'Nicolas Hormesch - Software Developer Portfolio',
  description:
    'Professional software developer specializing in modern web applications. Experience with Allianz, Siemens, BASF, DHL, Deutsche Bahn, and more.',
  ogTitle: 'Nicolas Hormesch - Software Developer',
  ogDescription:
    'Building modern, scalable web applications and transforming ideas into powerful digital solutions.',
  ogType: 'website',
  twitterCard: 'summary_large_image',
})

watchEffect(() => {
  console.log('"CONTENT: ', content.value)
})
</script>

<template>
  <div class="min-h-screen bg-[#FFFFF8]">
    <Navbar />

    <!-- Loading State -->
    <div v-if="!content" class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <div
          class="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-[#7A453F] border-r-transparent"
        />
        <p class="mt-4 text-[#2C2D32]">Loading...</p>
      </div>
    </div>

    <!-- Content -->
    <template v-else-if="portfolioData">
      <HeroSection :content="heroData" />
      <MarqueeBanner />
      <PortfolioSection :content="portfolioProjects" />
      <SkillsSection />
      <ExperienceSection />
      <ContactSection :content="contactData" />
      <ClientsSection :content="clientsData" />
      <FooterSection />
    </template>
  </div>
</template>
