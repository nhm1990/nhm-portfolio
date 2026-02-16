import type { Collections } from '@nuxt/content'

export const usePortfolioContent = () => {
  const { locale } = useI18n()

  const { data: content } = useAsyncData(
    `portfolio-${locale.value}`,
    async () => {
      // Build collection name based on current locale
      const collection = ('content_' + locale.value) as keyof Collections
      const portfolioContent = await queryCollection(collection).path('/portfolio').first()

      if (!portfolioContent && locale.value !== 'en') {
        return await queryCollection('content_en').path('/portfolio').first()
      }

      return portfolioContent
    },
    {
      watch: [locale],
    }
  )

  return {
    content,
  }
}
