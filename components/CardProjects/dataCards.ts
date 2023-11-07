interface Card {
	project: string
	stack: Array<string>
	date: string
	description: string
	website: string
	github: string
	image: string
	likes: string | number
	alt: string
}
type ProjectCardType = Array<Card>

const dataCards: ProjectCardType = [
	{
		project: 'Project Z',
		stack: ['react', 'express', 'node'],
		date: 'Noviembre 2025',
		description: 'Sample text. ',
		website: 'https://www.google.com',
		github: 'https://www.github.com',
		image:
			'https://s3-us-west-2.amazonaws.com/s.cdpn.io/326643/Sample%20Logo.png',
		likes: 200,
		alt: 'Image to show website',
	},
	{
		alt: 'Image to show website',
		stack: ['etc'],
		date: 'Diciembre 2016',
		description: 'Sitio web minimalista hecho para mostrar papas doradas.',
		github: 'https://www.github.com',
		image:
			'https://cdn.dribbble.com/users/77760/screenshots/2042501/potato.jpg',
		likes: 3242,
		project: 'Patata Website',
		website: 'https://potato.com',
	},
	{
		alt: 'Image to show website',
		stack: ['etc'],
		date: 'Octubre 2009',
		description: 'La FLDSMFR.',
		github: 'https://www.github.com',
		image:
			'https://img2.cgtrader.com/items/2303232/f818729b3f/large/cloudy-with-a-chance-of-meatballs-fldsmdfr-3d-model-obj-fbx-blend-skp.jpg',
		likes: 3242,
		project: 'La FLDSMFR',
		website:
			'https://cloudywithachanceofmeatballs.fandom.com/wiki/Flint_Lockwood_Diatonic_Super_Mutating_Dynamic_Food_Replicator_(FLDSMDFR)',
	},
	{
		alt: 'Image to show website',
		stack: ['etc'],
		date: 'Mayo 1972',
		description:
			'Tipo forchachon que ha salido en muchas películas, <strong>LA ROCA</strong>.',
		github: 'https://www.github.com',
		image:
			'https://ca-times.brightspotcdn.com/dims4/default/889ae96/2147483647/strip/true/crop/1135x744+0+0/resize/1200x787!/quality/80/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F90%2F82%2F4ad71dc542d2a9120bbefbcadf70%2Fquiere-la-roca-pelea-938977.JPG',
		likes: 322,
		project: 'The Rock',
		website: 'https://therockgear.com/',
	},
	{
		alt: 'Image to show website',
		stack: ['etc'],
		date: 'Abril 1955',
		description: "McDonals's.",
		github: 'https://www.github.com',
		image:
			'data:image/jpeg;base64,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',
		likes: 3242,
		project: "Mcdonald's",
		website: 'https://www.mcdonalds.com.ve/',
	},
]
export default dataCards
