import Articles from '@components/Articles/Articles'
import Footer from '@components/Footer/Footer'
import Header from '@components/Header/Header'
import LangSwitcher from '@components/LangSwitcher/LangSwitcher'
import { getDictionary } from './dictionaries/dictionarie'
import Cursor from '@components/NewCursor/Cursor'
const PortfolioPage = async ({ params: { lang } }) => {
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
