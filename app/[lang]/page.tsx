import Articles from '@components/Articles/Articles'
import Footer from '@components/Footer/Footer'
import Header from '@components/Header/Header'
import LangSwitcher from '@components/LangSwitcher/LangSwitcher'
import Cursor from '@components/NewCursor/Cursor'
import { LanguagesTypes } from 'types/paramsTypes'
import { getDictionary } from './dictionaries/dictionarie'
const PortfolioPage = async ({ params: { lang } }: { params: LanguagesTypes }) => {
  const dict = await getDictionary(lang)
  return (
    <main>
      <Cursor />
      <Header dict={dict} lang={lang} />
      <Articles dict={dict} lang={lang} />
      <Footer dict={dict} />
      <LangSwitcher lang={lang} />
    </main>
  )
}
export default PortfolioPage
