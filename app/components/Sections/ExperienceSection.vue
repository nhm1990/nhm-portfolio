<script setup lang="ts">
const { data: rawData } = await useAsyncData('experience', () =>
  queryCollection('content_en').path('/experience').first()
)

const experienceData = computed(() => rawData.value?.meta || null)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const selectedProject = ref<any | null>(null)
const dialogVisible = ref(false)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const openProjectDetails = (project: any) => {
  selectedProject.value = project
  dialogVisible.value = true
}

const timelineEvents = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = experienceData.value as any

  if (!data?.projects) return []

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data.projects.map((project: any) => ({
    status: project.period.includes('Present') ? 'active' : 'completed',
    date: project.period,
    company: project.company,
    role: project.role,
    industry: project.industry,
    description: project.shortDescription,
    technologies: project.technologies,
    projectData: project,
  }))
})

const getIndustryColor = (industry: string) => {
  const colors: Record<string, string> = {
    Chemical: '#5d7a52', // moss-500
    Finance: '#3bb06a', // mint-500
    Insurance: '#7aa87a', // sage-400
    'IT Consulting': '#2C2D32', // charcoal-900
  }
  return colors[industry] || '#5a8a5a'
}
</script>

<template>
  <section id="experience" class="relative py-20 bg-sage-50 bg-pattern-binary overflow-hidden">
    <!-- Binary Background Elements -->
    <div
      class="absolute top-10 left-10 w-64 h-64 bg-moss-200 rounded-full blur-3xl opacity-20 animate-float"
    />
    <div
      class="absolute bottom-20 right-20 w-72 h-72 bg-sage-300 rounded-full blur-3xl opacity-25 animate-float"
      style="animation-delay: 2s"
    />

    <div class="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visible="{ opacity: 1, y: 0, transition: { duration: 600 } }"
        class="text-center mb-16"
      >
        <h2
          class="text-4xl md:text-5xl font-bold mb-4 bg-gradient-text bg-clip-text text-transparent"
        >
          Professional Experience
        </h2>
        <p class="text-xl text-charcoal-700">Recent Projects & Achievements</p>
      </div>

      <!-- Timeline -->
      <div
        v-if="experienceData"
        v-motion
        :initial="{ opacity: 0 }"
        :visible="{ opacity: 1, transition: { duration: 600, delay: 200 } }"
      >
        <Timeline :value="timelineEvents" align="alternate" class="customized-timeline">
          <template #marker="slotProps">
            <span
              class="flex w-8 h-8 items-center justify-center text-white rounded-full z-10 shadow-md"
              :style="{ backgroundColor: getIndustryColor(slotProps.item.industry) }"
            >
              <Icon
                :name="slotProps.item.status === 'active' ? 'mdi:briefcase' : 'mdi:check-circle'"
                class="text-lg"
              />
            </span>
          </template>

          <template #content="slotProps">
            <Card class="mt-4 shadow-lg hover:shadow-xl transition-all duration-300">
              <template #title>
                <div class="flex items-start justify-between gap-4">
                  <div class="flex-1">
                    <h3 class="text-xl font-bold text-charcoal-900 mb-1">
                      {{ slotProps.item.company }}
                    </h3>
                    <p class="text-sm font-semibold text-sage-600">{{ slotProps.item.role }}</p>
                  </div>
                  <Chip
                    :label="slotProps.item.industry"
                    :style="{
                      backgroundColor: getIndustryColor(slotProps.item.industry),
                      color: 'white',
                    }"
                    class="!font-semibold !text-xs"
                  />
                </div>
              </template>

              <template #subtitle>
                <div class="flex items-center gap-1 text-xs text-gray-500">
                  <Icon name="mdi:calendar" class="text-sm" />
                  {{ slotProps.item.date }}
                </div>
              </template>

              <template #content>
                <p class="text-gray-800 mb-4 text-sm">{{ slotProps.item.description }}</p>

                <!-- Technologies -->
                <div class="flex flex-wrap gap-2 mb-4">
                  <Chip
                    v-for="tech in slotProps.item.technologies"
                    :key="tech"
                    :label="tech"
                    class="!bg-sage-100 !text-sage-700 !text-xs !px-3 !py-1 border border-sage-200"
                  />
                </div>

                <Button
                  label="View Details"
                  icon="mdi:information"
                  severity="secondary"
                  text
                  class="!text-sage-600 hover:!bg-sage-100 !mt-2"
                  @click="openProjectDetails(slotProps.item.projectData)"
                />
              </template>
            </Card>
          </template>
        </Timeline>
      </div>

      <!-- Project Details Dialog -->
      <Dialog
        v-model:visible="dialogVisible"
        :header="selectedProject?.company"
        :modal="true"
        :dismissable-mask="true"
        :style="{ width: '90vw', maxWidth: '800px' }"
        class="project-dialog"
      >
        <div v-if="selectedProject">
          <!-- Role & Industry -->
          <div class="mb-6">
            <div class="flex items-center gap-2 mb-2">
              <Icon name="mdi:account-tie" class="text-[#7A453F]" />
              <h3 class="text-lg font-semibold text-[#2C2D32]">{{ selectedProject.role }}</h3>
            </div>
            <div class="flex items-center gap-4 text-sm text-[#2C2D32]/70">
              <span class="flex items-center gap-1">
                <Icon name="mdi:domain" />
                {{ selectedProject.industry }}
              </span>
              <span class="flex items-center gap-1">
                <Icon name="mdi:calendar" />
                {{ selectedProject.period }}
              </span>
            </div>
          </div>

          <Divider />

          <!-- Description -->
          <div class="mb-6">
            <p class="text-[#2C2D32]/90">{{ selectedProject.shortDescription }}</p>
          </div>

          <!-- Technologies -->
          <div class="mb-6">
            <h4 class="text-sm font-semibold text-[#2C2D32] mb-3 flex items-center gap-2">
              <Icon name="mdi:code-tags" class="text-[#7A453F]" />
              Technologies
            </h4>
            <div class="flex flex-wrap gap-2">
              <Chip
                v-for="tech in selectedProject.technologies"
                :key="tech"
                :label="tech"
                class="!bg-gradient-to-r from-[#7A453F] to-[#B9D1E9] !text-white"
              />
            </div>
          </div>

          <Divider />

          <!-- Responsibilities -->
          <div class="mb-6">
            <h4 class="text-sm font-semibold text-[#2C2D32] mb-3 flex items-center gap-2">
              <Icon name="mdi:checkbox-marked-circle" class="text-[#7A453F]" />
              Key Responsibilities
            </h4>
            <ul class="space-y-2">
              <li
                v-for="(responsibility, index) in selectedProject.responsibilities"
                :key="index"
                class="flex items-start gap-2 text-sm text-[#2C2D32]/80"
              >
                <Icon name="mdi:chevron-right" class="text-[#7A453F] mt-0.5 flex-shrink-0" />
                <span>{{ responsibility }}</span>
              </li>
            </ul>
          </div>

          <!-- Achievements -->
          <div>
            <h4 class="text-sm font-semibold text-[#2C2D32] mb-3 flex items-center gap-2">
              <Icon name="mdi:trophy" class="text-[#7A453F]" />
              Key Achievements
            </h4>
            <ul class="space-y-2">
              <li
                v-for="(achievement, index) in selectedProject.achievements"
                :key="index"
                class="flex items-start gap-2 text-sm text-[#2C2D32]/80"
              >
                <Icon name="mdi:star" class="text-[#B9D1E9] mt-0.5 flex-shrink-0" />
                <span>{{ achievement }}</span>
              </li>
            </ul>
          </div>
        </div>

        <template #footer>
          <Button
            label="Close"
            icon="mdi:close"
            class="!bg-gradient-to-r from-[#7A453F] to-[#B9D1E9] !border-0 !text-white"
            @click="dialogVisible = false"
          />
        </template>
      </Dialog>
    </div>
  </section>
</template>

<style scoped>
@media screen and (max-width: 960px) {
  .customized-timeline :deep(.p-timeline-event:nth-child(even)) {
    flex-direction: row !important;
  }

  .customized-timeline :deep(.p-timeline-event:nth-child(even) .p-timeline-event-content) {
    text-align: left !important;
  }
}
</style>
