<script setup lang="ts">
const { t } = useI18n({ useScope: 'global' })

const phrases = computed(() => {
  const text = t('marquee.text')
  return text.split('.').filter((phrase: string) => phrase.trim().length > 0)
})
</script>


<template>
  <div
    class="relative overflow-hidden bg-gradient-to-r from-[#7A453F] via-[#2C2D32] to-[#7A453F] py-6 border-y-4 border-[#B9D1E9]"
  >
    <!-- Marquee Container -->
    <div class="flex whitespace-nowrap animate-marquee">
      <!-- First instance of text -->
      <div class="flex items-center">
        <span
          v-for="(phrase, index) in phrases"
          :key="`first-${index}`"
          class="inline-flex items-center mx-6"
        >
          <span class="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            {{ phrase }}
          </span>
          <span class="mx-6 text-[#B9D1E9] text-4xl">✦</span>
        </span>
      </div>
      <!-- Second instance for seamless loop -->
      <div class="flex items-center">
        <span
          v-for="(phrase, index) in phrases"
          :key="`second-${index}`"
          class="inline-flex items-center mx-6"
        >
          <span class="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            {{ phrase }}
          </span>
          <span class="mx-6 text-[#B9D1E9] text-4xl">✦</span>
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.animate-marquee {
  animation: marquee 60s linear infinite;
}

.animate-marquee:hover {
  animation-play-state: paused;
}
</style>
