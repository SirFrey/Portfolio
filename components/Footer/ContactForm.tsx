'use client'
import {
	Button,
	Input,
	Textarea,
} from '@components/FramerComps/framerCompsClients'
import s from './Footer.module.css'
import { handleSubmit } from './actions'
import { formProps } from './dataFooter'
const SubmitButton = ({ dict }) => {
	return (
		<Button
			type='submit'
			initial='hiddenButton'
			whileInView='visibleButton'
			whileTap='tap'
			{...formProps}
		>
			{dict.footer.send}
			<svg
				className={s.checkmark}
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 52 52'
			>
				<path
					className={s.checkmark__check}
					fill='none'
					d='M14.1 27.2l7.1 7.2 16.7-16.8'
				/>
			</svg>
		</Button>
	)
}

export default function ContactForm({ dict }) {
	return (
		<form
			onSubmit={e => {
				handleSubmit(e, dict.lang)
			}}
			className={s.form}
		>
			<Input
				type='text'
				name='name'
				id='name'
				spellCheck='false'
				placeholder={dict.footer.name}
				required
				initial='hidden'
				whileInView='visible'
				whileFocus='focus'
				{...formProps}
			/>
			<Input
				type='email'
				name='email'
				id='email'
				spellCheck='false'
				placeholder={dict.footer.email}
				required
				initial='hiddenRight'
				whileInView='visible'
				whileFocus='focus'
				{...formProps}
			/>
			<Textarea
				name='message'
				id='message'
				placeholder={dict.footer.message}
				required
				initial='hiddenBottom'
				whileInView='visibleBottom'
				whileFocus='focus'
				{...formProps}
			></Textarea>
			<SubmitButton dict={dict} />
		</form>
	)
}
