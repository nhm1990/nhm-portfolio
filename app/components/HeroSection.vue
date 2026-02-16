<template>
  <section
    id="home"
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFFFF8] via-white to-[#B9D1E9]/20 pt-20"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <!-- Text Content -->
        <div
          v-motion
          class="text-center lg:text-left order-2 lg:order-1"
          :initial="{ opacity: 0, x: -50 }"
          :visible="{ opacity: 1, x: 0, transition: { duration: 800 } }"
        >
          <div class="inline-block mb-4">
            <span
              class="px-4 py-2 bg-[#B9D1E9]/30 text-[#7A453F] rounded-full text-sm font-semibold"
            >
              {{ content.greeting }}
            </span>
          </div>
          <h1
            class="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-[#7A453F] via-[#2C2D32] to-[#7A453F] bg-clip-text text-transparent"
          >
            {{ content.title }}
          </h1>
          <p class="text-lg md:text-xl text-[#2C2D32]/80 mb-8 max-w-2xl">
            {{ content.description }}
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button
              :label="t('nav.portfolio')"
              class="!bg-gradient-to-r from-[#7A453F] to-[#B9D1E9] !border-0 !text-white !px-8 !py-3 !text-lg"
              raised
              @click="scrollToSection('portfolio')"
            />
            <Button
              :label="t('nav.contact')"
              class="!border-2 !border-[#7A453F] !text-[#7A453F] !px-8 !py-3 !text-lg"
              outlined
              @click="scrollToSection('contact')"
            />
          </div>
        </div>

        <!-- Profile Image -->
        <div
          v-motion
          class="flex justify-center lg:justify-end order-1 lg:order-2"
          :initial="{ opacity: 0, x: 50 }"
          :visible="{ opacity: 1, x: 0, transition: { duration: 800, delay: 200 } }"
        >
          <div class="relative">
            <!-- Decorative circles -->
            <div class="absolute -top-4 -left-4 w-72 h-72 bg-[#B9D1E9]/20 rounded-full blur-3xl" />
            <div
              class="absolute -bottom-4 -right-4 w-72 h-72 bg-[#7A453F]/10 rounded-full blur-3xl"
            />

            <!-- Image container with gradient border -->
            <div
              class="relative p-1 bg-gradient-to-br from-[#7A453F] via-[#B9D1E9] to-[#959684] rounded-full"
            >
              <div class="bg-white p-2 rounded-full">
                <img
                  src="/images/profile.jpeg"
                  alt="Nicolas Hormesch"
                  class="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full object-cover shadow-2xl"
                />
              </div>
            </div>

            <!-- Floating elements -->
            <div
              class="absolute -top-6 right-10 bg-white rounded-lg shadow-xl p-3 animate-bounce-slow z-10"
            >
              <Icon name="mdi:code-tags" class="text-3xl text-[#7A453F]" />
            </div>
            <div
              class="absolute -bottom-6 left-10 bg-white rounded-lg shadow-xl p-3 animate-bounce-slow z-10"
              style="animation-delay: 0.5s"
            >
              <Icon name="mdi:laptop" class="text-3xl text-[#B9D1E9]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()

interface Props {
  content?: {
    greeting: string
    title: string
    description: string
  }
}

const props = withDefaults(defineProps<Props>(), {
  content: () => ({
    greeting: 'Hi',
    title: 'Loading...',
    description: 'Please wait...',
  }),
})

const scrollToSection = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    const offset = 80
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - offset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    })
  }
}
</script>

<style scoped>
@keyframes bounce-slow {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-bounce-slow {
  animation: bounce-slow 3s ease-in-out infinite;
}
</style>
