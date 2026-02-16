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
  <section id="portfolio" class="py-20 bg-gradient-to-br from-[#FFFFF8] to-[#B9D1E9]/10">
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
                class="absolute inset-0 bg-gradient-to-br from-[#7A453F]/20 to-[#B9D1E9]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
              />

              <!-- Image placeholder - replace with actual screenshots -->
              <div
                class="aspect-video bg-gradient-to-br from-[#2C2D32] to-[#7A453F] flex items-center justify-center"
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
                  class="!bg-white !text-[#7A453F] !border-0 !px-6 !py-3 !font-semibold"
                  raised
                />
              </div>
            </div>

            <!-- Decorative element -->
            <div
              class="absolute -bottom-6 -right-6 w-32 h-32 bg-[#B9D1E9]/30 rounded-full blur-2xl -z-10"
            />
          </div>

          <!-- Project Info -->
          <div :class="[index % 2 === 0 ? '' : 'lg:col-start-1 lg:row-start-1']">
            <div class="space-y-4">
              <div
                class="inline-block px-4 py-1 bg-[#B9D1E9]/30 text-[#7A453F] rounded-full text-sm font-semibold"
              >
                {{ project.category }}
              </div>
              <h3 class="text-3xl md:text-4xl font-bold text-[#2C2D32]">
                {{ project.title }}
              </h3>
              <p class="text-lg text-[#2C2D32]/70">
                {{ project.description }}
              </p>

              <!-- Technologies -->
              <div class="flex flex-wrap gap-2 pt-4">
                <span
                  v-for="tech in project.technologies"
                  :key="tech"
                  class="px-3 py-1 bg-white border border-[#B9D1E9] text-[#2C2D32] rounded-lg text-sm font-medium"
                >
                  {{ tech }}
                </span>
              </div>

              <!-- Stats -->
              <div class="grid grid-cols-3 gap-4 pt-6">
                <div
                  v-for="stat in project.stats"
                  :key="stat.label"
                  class="text-center p-4 bg-white rounded-xl shadow-md"
                >
                  <div class="text-2xl font-bold text-[#7A453F]">{{ stat.value }}</div>
                  <div class="text-sm text-[#2C2D32]/60">{{ stat.label }}</div>
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
