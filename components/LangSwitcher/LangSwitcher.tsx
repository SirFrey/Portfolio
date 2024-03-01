'use client'

import './LangSwitcher.css'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { components } from 'react-select'
import enFlag from './english.svg'
import esFlag from './spain.svg'
const Select = dynamic(() => import('react-select'), { ssr: false })
const Control = ({ children, getValue, ...props }) => {
  return (
    <>
      {/* @ts-ignore */}
      <components.Control {...props}>
        <img src={getValue()[0].icon.src} className='countryLogoControl' alt='language image'/>
        {children}
      </components.Control>
    </>
  )
}
const Option = ({ children, data, ...props }) => {
  return (
    <>
      {/* @ts-ignore */}
      <components.Option {...props}>
        <img src={data.icon.src} className='countryLogoOption' alt='language image'/>
        {children}
      </components.Option>
    </>
  )
}
function LangSwitcher({ lang }) {
  const langList = [
    {
      value: 'en',
      icon: enFlag,
      label: 'en',
    },
    {
      value: 'es',
      icon: esFlag,
      label: 'es',
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
  }
  return (
    <div className='langSwitcher'>
      <Select
        classNamePrefix='langSelect'
        value={currentlang}
        options={langList}
        onChange={handleChange}
        components={{ Control, Option }}
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
            primary: 'rgba(--var(primary), 0.4)',
            primary25: '#fff3',
            neutral0: 'rgba(--var(secondary), 0.4)',
            neutral5: '#fff',
            neutral90: '#fff',
          },
        })}
      />
    </div>
  )
}

export default LangSwitcher
