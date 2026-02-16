<script setup lang="ts">
interface Client {
  name: string
  icon: string
}

interface Props {
  content?: {
    title: string
    subtitle: string
    cta: string
    list: Client[]
  }
}

const props = withDefaults(defineProps<Props>(), {
  content: () => ({
    title: 'Loading...',
    subtitle: 'Please wait...',
    cta: 'Loading...',
    list: [],
  }),
})
const { t } = useI18n({ useScope: 'global' })

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

<template>
  <section id="clients" class="py-20 bg-gradient-to-br from-white to-[#FFFFF8]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div
        v-motion
        class="text-center mb-16"
        :initial="{ opacity: 0, y: 30 }"
        :visible="{ opacity: 1, y: 0, transition: { duration: 600 } }"
      >
        <h2
          class="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#7A453F] to-[#2C2D32] bg-clip-text text-transparent"
        >
          {{ content.title }}
        </h2>
        <p class="text-xl text-[#2C2D32]/70">
          {{ content.subtitle }}
        </p>
      </div>

      <!-- Clients Grid -->
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-16">
        <div
          v-for="(client, index) in content.list"
          :key="client.name"
          :style="{ transitionDelay: `${index * 100}ms` }"
          class="flex items-center justify-center p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
        >
          <div class="text-center">
            <div class="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
              {{ client.icon }}
            </div>
            <p
              class="text-sm font-semibold text-[#2C2D32] group-hover:text-[#7A453F] transition-colors"
            >
              {{ client.name }}
            </p>
          </div>
        </div>
      </div>

      <!-- CTA Banner -->
      <div
        class="relative overflow-hidden bg-gradient-to-r from-[#7A453F] via-[#2C2D32] to-[#7A453F] rounded-2xl p-12 text-center shadow-2xl"
      >
        <!-- <div class="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div> -->
        <div class="relative z-10">
          <h3 class="text-3xl md:text-4xl font-bold text-white mb-4">
            {{ content.cta }}
          </h3>
          <Button
            :label="t('nav.contact')"
            class="!bg-white !text-[#7A453F] !border-0 !px-8 !py-3 !text-lg !font-semibold hover:!scale-105 transition-transform"
            raised
            @click="scrollToSection('contact')"
          />
        </div>

        <!-- Decorative elements -->
        <div class="absolute top-0 left-0 w-40 h-40 bg-[#B9D1E9]/20 rounded-full blur-3xl" />
        <div class="absolute bottom-0 right-0 w-40 h-40 bg-[#959684]/20 rounded-full blur-3xl" />
      </div>
    </div>
  </section>
</template>
