<script setup lang="ts">
import type { Project } from '~/types/portfolio'

interface Props {
  content?: {
    title: string
    subtitle: string
    explore: string
    projects: Project[]
  }
}

const props = withDefaults(defineProps<Props>(), {
  content: () => ({
    title: 'Loading...',
    subtitle: 'Please wait...',
    explore: 'Explore',
    projects: [],
  }),
})
</script>

<template>
  <section id="portfolio" class="relative py-20 bg-white bg-pattern-code overflow-hidden">
    <!-- Floating Code Elements -->
    <div
      class="absolute top-20 left-10 w-72 h-72 bg-sage-200 rounded-full blur-3xl opacity-20 animate-float"
    />
    <div
      class="absolute bottom-20 right-10 w-56 h-56 bg-mint-200 rounded-full blur-3xl opacity-25 animate-float"
      style="animation-delay: 1.5s"
    />

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div
        v-motion
        class="text-center mb-16"
        :initial="{ opacity: 0, y: 30 }"
        :visible="{ opacity: 1, y: 0, transition: { duration: 600 } }"
      >
        <h2
          class="text-4xl md:text-5xl font-bold mb-4 bg-gradient-text bg-clip-text text-transparent"
        >
          {{ content.title }}
        </h2>
        <p class="text-xl text-charcoal-700">
          {{ content.subtitle }}
        </p>
      </div>

      <!-- Portfolio Items -->
      <div class="space-y-24">
        <div
          v-for="(project, index) in content.projects"
          :key="project.id"
          :class="[
            'grid grid-cols-1 lg:grid-cols-2 gap-12 items-center',
            index % 2 === 0 ? '' : 'lg:grid-flow-dense',
          ]"
        >
          <!-- Project Image -->
          <div :class="['relative group', index % 2 === 0 ? '' : 'lg:col-start-2']">
            <div class="relative overflow-hidden rounded-2xl shadow-2xl">
              <!-- Gradient overlay -->
              <div
                class="absolute inset-0 bg-gradient-to-br from-sage-500/20 to-mint-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
              />

              <!-- Image placeholder - replace with actual screenshots -->
              <div
                class="aspect-video bg-gradient-to-br from-charcoal-900 to-sage-600 flex items-center justify-center"
              >
                <img
                  v-if="project.image"
                  :src="project.image"
                  :alt="project.title"
                  class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div v-else class="text-white/50 text-6xl">
                  <i :class="project.icon" />
                </div>
              </div>

              <!-- View Project Button Overlay -->
              <div
                class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
              >
                <Button
                  label="View Project"
                  icon="pi pi-arrow-right"
                  icon-pos="right"
                  class="!bg-white !text-sage-600 !border-0 !px-6 !py-3 !font-semibold !shadow-xl"
                  raised
                />
              </div>
            </div>

            <!-- Decorative element -->
            <div
              class="absolute -bottom-6 -right-6 w-32 h-32 bg-mint-300/40 rounded-full blur-2xl -z-10"
            />
          </div>

          <!-- Project Info -->
          <div :class="[index % 2 === 0 ? '' : 'lg:col-start-1 lg:row-start-1']">
            <div class="space-y-4">
              <div
                class="inline-block px-4 py-1 bg-sage-100 text-sage-700 rounded-full text-sm font-semibold border border-sage-200"
              >
                {{ project.category }}
              </div>
              <h3 class="text-3xl md:text-4xl font-bold text-charcoal-900">
                {{ project.title }}
              </h3>
              <p class="text-lg text-charcoal-700">
                {{ project.description }}
              </p>

              <!-- Technologies -->
              <div class="flex flex-wrap gap-2 pt-4">
                <span
                  v-for="tech in project.technologies"
                  :key="tech"
                  class="px-3 py-1 bg-white border border-sage-300 text-charcoal-800 rounded-lg text-sm font-medium hover:border-sage-500 hover:bg-sage-50 transition-colors"
                >
                  {{ tech }}
                </span>
              </div>

              <!-- Stats -->
              <div class="grid grid-cols-3 gap-4 pt-6">
                <div
                  v-for="stat in project.stats"
                  :key="stat.label"
                  class="text-center p-4 bg-white rounded-xl shadow-md border border-sage-100"
                >
                  <div class="text-2xl font-bold text-sage-600">{{ stat.value }}</div>
                  <div class="text-sm text-charcoal-600">{{ stat.label }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Explore More Banner -->
      <div class="mt-20 text-center">
        <div
          class="inline-block bg-gradient-to-r from-[#FFFFF8] to-white rounded-2xl p-8 shadow-xl"
        >
          <p class="text-lg text-[#2C2D32]/70 mb-4">
            {{ content.explore }}
          </p>
          <div class="flex flex-wrap justify-center gap-4">
            <a
              v-for="company in ['Allianz', 'Siemens', 'BASF', 'DHL']"
              :key="company"
              href="#"
              class="px-4 py-2 bg-gradient-to-r from-[#7A453F] to-[#B9D1E9] text-white rounded-lg font-medium hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              {{ company }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
