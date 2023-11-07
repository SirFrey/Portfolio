'use client'
import s from '@components/Articles/Articles.module.css'

import { containerVariants, propsHiddenElm } from '@assets/utils/props'
import { ListItemComp } from '@components/Articles/ListItemComp'
import {
	knowledgeData,
	otherData,
	toolsData,
} from '@components/Articles/dataArticles'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
export default function ListContainer() {
	const [isPausedList, setPauseList] = useState(false)
	const [counterList, setCounterList] = useState(0)
	useEffect(() => {
		// Interval list of list "Conocimientos"
		const intervalList = setInterval(() => {
			setCounterList(counterList + 1)
		}, 1000)
		if (isPausedList) {
			clearInterval(intervalList)
		}
		return () => clearInterval(intervalList)
	}, [counterList, isPausedList])
	return (
		<>
			<motion.ul
				variants={containerVariants}
				initial='hidden'
				whileInView='visible'
				viewport={{
					once: true,
				}}
				className={s.lang_list}
			>
				{knowledgeData.map(({ Icon, span, color }, i) => {
					return (
						<ListItemComp
							Icon={Icon}
							span={span}
							key={i}
							color={color}
							counter={counterList}
							index={i}
							setCounter={setCounterList}
							setPause={setPauseList}
						/>
					)
				})}
			</motion.ul>
			<motion.h4 {...propsHiddenElm}>Herramientas:</motion.h4>
			<motion.ul
				variants={containerVariants}
				initial='hidden'
				whileInView='visible'
				viewport={{
					once: true,
				}}
				className={s.tool_list}
			>
				{toolsData.map(({ Icon, span, color }, i) => {
					return (
						<ListItemComp
							Icon={Icon}
							span={span}
							key={i}
							color={color}
							counter={counterList}
							index={i + knowledgeData.length}
							setCounter={setCounterList}
							setPause={setPauseList}
						/>
					)
				})}
			</motion.ul>
			<motion.h4 {...propsHiddenElm}>Otros:</motion.h4>
			<motion.ul
				variants={containerVariants}
				initial='hidden'
				whileInView='visible'
				viewport={{
					once: true,
				}}
				className={s.other_list}
			>
				{otherData.map(({ Icon, span, color }, i) => {
					return (
						<ListItemComp
							Icon={Icon}
							span={span}
							key={i}
							color={color}
							counter={counterList}
							index={i + knowledgeData.length + toolsData.length}
							setCounter={setCounterList}
							setPause={setPauseList}
						/>
					)
				})}
			</motion.ul>
		</>
	)
}
