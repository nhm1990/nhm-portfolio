<script setup lang="ts">
const { data: rawData } = await useAsyncData('skills', () =>
  queryCollection('content_en').path('/skills').first()
)

const skillsData = computed(() => rawData.value?.meta || null)

const skillsByLevel = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = skillsData.value as any
  if (!data?.categories) return { expert: [], advanced: [], intermediate: [] }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const grouped: { expert: any[]; advanced: any[]; intermediate: any[] } = {
    expert: [],
    advanced: [],
    intermediate: [],
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data.categories.forEach((category: any) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    category.skills.forEach((skill: any) => {
      const level = skill.level as 'expert' | 'advanced' | 'intermediate'
      if (level in grouped) {
        grouped[level].push(skill)
      }
    })
  })

  return grouped
})
</script>

<template>
  <section id="skills" class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visible="{ opacity: 1, y: 0, transition: { duration: 600 } }"
        class="text-center mb-16"
      >
        <h2
          class="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#7A453F] to-[#2C2D32] bg-clip-text text-transparent"
        >
          Skills & Expertise
        </h2>
        <p class="text-xl text-[#2C2D32]/70">Technologies & Tools I Work With</p>
      </div>

      <!-- Skills Tag Cloud -->
      <div
        v-if="skillsData"
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visible="{ opacity: 1, y: 0, transition: { duration: 600, delay: 200 } }"
        class="flex flex-wrap gap-3 justify-center"
      >
        <!-- Expert Level - Large -->
        <Chip
          v-for="skill in skillsByLevel.expert"
          :key="skill.name"
          :label="skill.name"
          class="!bg-gradient-to-r from-[#7A453F] to-[#B9D1E9] !text-white !text-lg !px-6 !py-3 !font-semibold hover:!scale-110 transition-transform cursor-default shadow-md"
        />

        <!-- Advanced Level - Medium -->
        <Chip
          v-for="skill in skillsByLevel.advanced"
          :key="skill.name"
          :label="skill.name"
          class="!bg-gradient-to-r from-[#959684] to-[#B9D1E9] !text-white !text-base !px-5 !py-2 hover:!scale-105 transition-transform cursor-default shadow-sm"
        />

        <!-- Intermediate Level - Small -->
        <Chip
          v-for="skill in skillsByLevel.intermediate"
          :key="skill.name"
          :label="skill.name"
          class="!bg-[#B9D1E9]/60 !text-[#2C2D32] !text-sm !px-4 !py-1.5 hover:!scale-105 transition-transform cursor-default"
        />
      </div>

      <!-- Certifications & Languages -->
      <div
        v-if="skillsData"
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visible="{ opacity: 1, y: 0, transition: { duration: 600, delay: 400 } }"
        class="grid md:grid-cols-2 gap-8"
      >
        <!-- Certifications -->
        <Card class="shadow-lg">
          <template #title>
            <div class="flex items-center gap-2">
              <Icon name="mdi:certificate" class="text-[#7A453F] text-2xl" />
              <span class="text-xl text-[#2C2D32]">Certifications</span>
            </div>
          </template>
          <template #content>
            <div class="space-y-4">
              <div
                v-for="cert in (skillsData as any)?.certifications"
                :key="cert.name"
                class="border-l-4 border-[#7A453F] pl-4 py-2"
              >
                <h4 class="font-semibold text-[#2C2D32]">{{ cert.name }}</h4>
                <p class="text-sm text-[#2C2D32]/70">{{ cert.issuer }} · {{ cert.date }}</p>
              </div>
            </div>
          </template>
        </Card>

        <!-- Languages -->
        <Card class="shadow-lg">
          <template #title>
            <div class="flex items-center gap-2">
              <Icon name="mdi:translate" class="text-[#7A453F] text-2xl" />
              <span class="text-xl text-[#2C2D32]">Languages</span>
            </div>
          </template>
          <template #content>
            <div class="space-y-4">
              <div
                v-for="lang in (skillsData as any)?.languages"
                :key="lang.name"
                class="border-l-4 border-[#B9D1E9] pl-4 py-2"
              >
                <h4 class="font-semibold text-[#2C2D32]">{{ lang.name }}</h4>
                <p class="text-sm text-[#2C2D32]/70">{{ lang.level }}</p>
              </div>
            </div>
          </template>
        </Card>
      </div>
    </div>
  </section>
</template>
