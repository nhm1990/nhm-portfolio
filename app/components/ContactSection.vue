<script setup lang="ts">
const { t } = useI18n({ useScope: 'global' })

interface Props {
  content?: {
    title: string
    subtitle: string
    email: string
    linkedin: string
    github: string
  }
}

const props = withDefaults(defineProps<Props>(), {
  content: () => ({
    title: 'Loading...',
    subtitle: 'Please wait...',
    email: '',
    linkedin: '',
    github: '',
  }),
})

const formData = ref({
  name: '',
  email: '',
  subject: '',
  message: '',
})

const isSubmitting = ref(false)

const handleSubmit = async () => {
  isSubmitting.value = true

  try {
    // Add your form submission logic here
    console.log('Form submitted:', formData.value)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Reset form
    formData.value = {
      name: '',
      email: '',
      subject: '',
      message: '',
    }

    alert(t('contact.form.successMessage'))
  } catch (error) {
    console.error('Error submitting form:', error)
    alert(t('contact.form.errorMessage'))
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <section id="contact" class="py-20 bg-gradient-to-br from-white via-[#FFFFF8] to-[#B9D1E9]/20">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div
        class="text-center mb-16"
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visible="{ opacity: 1, y: 0, transition: { duration: 600 } }"
      >
        <h2
          class="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#7A453F] to-[#2C2D32] bg-clip-text text-transparent"
        >
          {{ content.title }}
        </h2>
        <p class="text-xl text-[#2C2D32]/70">{{ content.subtitle }}</p>
      </div>

      <div class="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="flex flex-col">
              <label for="name" class="text-sm font-semibold text-[#2C2D32] mb-2">
                {{ t('contact.form.name') }} *
              </label>
              <InputText
                id="name"
                v-model="formData.name"
                :placeholder="t('contact.form.namePlaceholder')"
                required
                class="w-full"
              />
            </div>

            <div class="flex flex-col">
              <label for="email" class="text-sm font-semibold text-[#2C2D32] mb-2">
                {{ t('contact.form.email') }} *
              </label>
              <InputText
                id="email"
                v-model="formData.email"
                type="email"
                :placeholder="t('contact.form.emailPlaceholder')"
                required
                class="w-full"
              />
            </div>
          </div>

          <div class="flex flex-col">
            <label for="subject" class="text-sm font-semibold text-[#2C2D32] mb-2">
              {{ t('contact.form.subject') }} *
            </label>
            <InputText
              id="subject"
              v-model="formData.subject"
              :placeholder="t('contact.form.subjectPlaceholder')"
              required
              class="w-full"
            />
          </div>

          <div class="flex flex-col">
            <label for="message" class="text-sm font-semibold text-[#2C2D32] mb-2">
              {{ t('contact.form.message') }} *
            </label>
            <Textarea
              id="message"
              v-model="formData.message"
              rows="6"
              :placeholder="t('contact.form.messagePlaceholder')"
              required
              class="w-full"
            />
          </div>

          <div class="flex justify-center">
            <Button
              type="submit"
              :label="t('contact.form.sendButton')"
              icon="pi pi-send"
              iconPos="right"
              class="!bg-gradient-to-r from-[#7A453F] to-[#B9D1E9] !border-0 !text-white !px-8 !py-3 !text-lg hover:!scale-105 transition-transform"
              raised
              :loading="isSubmitting"
            />
          </div>
        </form>

        <!-- Contact Info -->
        <div class="mt-12 pt-12 border-t border-gray-200">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div class="flex flex-col items-center">
              <div
                class="w-12 h-12 bg-gradient-to-br from-[#7A453F] to-[#B9D1E9] rounded-full flex items-center justify-center mb-3"
              >
                <i class="pi pi-envelope text-white text-xl"></i>
              </div>
              <p class="text-sm text-[#2C2D32]/60">Email</p>
              <p class="font-semibold text-[#2C2D32]">{{ content.email }}</p>
            </div>

            <div class="flex flex-col items-center">
              <div
                class="w-12 h-12 bg-gradient-to-br from-[#7A453F] to-[#B9D1E9] rounded-full flex items-center justify-center mb-3"
              >
                <i class="pi pi-linkedin text-white text-xl"></i>
              </div>
              <p class="text-sm text-[#2C2D32]/60">LinkedIn</p>
              <p class="font-semibold text-[#2C2D32]">{{ content.linkedin }}</p>
            </div>

            <div class="flex flex-col items-center">
              <div
                class="w-12 h-12 bg-gradient-to-br from-[#7A453F] to-[#B9D1E9] rounded-full flex items-center justify-center mb-3"
              >
                <i class="pi pi-github text-white text-xl"></i>
              </div>
              <p class="text-sm text-[#2C2D32]/60">GitHub</p>
              <p class="font-semibold text-[#2C2D32]">{{ content.github }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
