'use client'

import Image from 'next/image'
import Link from 'next/link'
import './LangSwitcher.css'
import enFlag from './spain-flag-icon.svg'
import esFlag from './united-kingdom-flag-icon.svg'
import { ChangeEvent, EventHandler, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
const Select = dynamic(() => import('react-select'), { ssr: false })
function LangSwitcher({ lang }) {
  const langList = [
    {
      value: 'en',
      icon: enFlag,
      label: 'En',
    },
    {
      value: 'es',
      icon: esFlag,
      label: 'Es',
    },
  ]
  const router = useRouter()
  const labelLang = langList.filter(li => {
    return li.value === lang
  })[0]
  const [currentlang, setCurrentLang] = useState(labelLang)
  const handleChange = e => {
    setCurrentLang(e)
    router.push('/' + e.value)
    console.log(e)
  }
  console.log(labelLang)
  return (
    <div className='langSwitcher'>
      <Select
        classNamePrefix='langSelect'
        value={currentlang}
        options={langList}
        onChange={handleChange}
        menuPlacement='top'
        isSearchable={false}
        styles={{
          singleValue: provided => ({
            ...provided,
            color: '#fff',
          }),
        }}
        theme={theme => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary: 'var(--primaryColor)',
            primary25: '#fff3',
            neutral0: 'var(--secondaryColorAlpha)',
            neutral5: '#fff',
            neutral90: '#fff',
          },
        })}
      />
    </div>
  )
}

export default LangSwitcher
