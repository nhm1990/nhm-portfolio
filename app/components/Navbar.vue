<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-20">
        <!-- Logo/Brand -->
        <div class="flex-shrink-0">
          <a
            href="#home"
            class="text-2xl font-bold bg-gradient-to-r from-[#7A453F] to-[#B9D1E9] bg-clip-text text-transparent"
          >
            NH
          </a>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8">
          <a
            v-for="item in navItems"
            :key="item.id"
            :href="`#${item.id}`"
            class="text-[#2C2D32] hover:text-[#7A453F] transition-colors duration-300 font-medium"
            @click.prevent="scrollToSection(item.id)"
          >
            {{ item.label }}
          </a>

          <!-- Language Switcher -->
          <div class="flex items-center space-x-2 ml-4 pl-4 border-l border-gray-300">
            <Button
              :label="locale === 'en' ? 'EN' : 'DE'"
              class="!bg-gradient-to-r from-[#7A453F] to-[#B9D1E9] !border-0"
              outlined
              size="small"
              @click="toggleLanguage"
            />
          </div>
        </div>

        <!-- Mobile Menu Button -->
        <div class="md:hidden">
          <Button
            icon="pi pi-bars"
            text
            severity="secondary"
            @click="mobileMenuOpen = !mobileMenuOpen"
          />
        </div>
      </div>

      <!-- Mobile Navigation -->
      <transition name="slide-down">
        <div v-if="mobileMenuOpen" class="md:hidden pb-4 pt-2">
          <div class="flex flex-col space-y-3">
            <a
              v-for="item in navItems"
              :key="item.id"
              :href="`#${item.id}`"
              class="text-[#2C2D32] hover:text-[#7A453F] transition-colors duration-300 font-medium py-2"
              @click.prevent="handleMobileNavClick(item.id)"
            >
              {{ item.label }}
            </a>
            <Button
              :label="locale === 'en' ? 'EN' : 'DE'"
              class="!bg-gradient-to-r from-[#7A453F] to-[#B9D1E9] !border-0 w-full"
              size="small"
              @click="toggleLanguage"
            />
          </div>
        </div>
      </transition>
    </div>
  </nav>
</template>

<script setup lang="ts">
const { locale, t } = useI18n({ useScope: 'global' })
const switchLocalePath = useSwitchLocalePath()
const route = useRoute()
const mobileMenuOpen = ref(false)

const navItems = computed(() => [
  { id: 'home', label: t('nav.home') },
  { id: 'about', label: t('nav.about') },
  { id: 'clients', label: t('nav.clients') },
  { id: 'portfolio', label: t('nav.portfolio') },
  { id: 'contact', label: t('nav.contact') },
])

const toggleLanguage = async () => {
  const newLocale = locale.value === 'en' ? 'de' : 'en'
  const targetPath = switchLocalePath(newLocale)
  await navigateTo({ path: targetPath, hash: route.hash })
}

const scrollToSection = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    const offset = 80 // Height of navbar
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - offset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    })
  }
}

const handleMobileNavClick = (id: string) => {
  scrollToSection(id)
  mobileMenuOpen.value = false
}
</script>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
