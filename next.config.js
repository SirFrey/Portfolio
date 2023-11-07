/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
	modularizeImports: {
		'@mui/icons-material/?(((\\w*)?/?)*)': {
			transform: '@mui/icons-material/{{ matches.[1] }}/{{member}}',
		},
	},
	images: {
		// domains: ['img2.cgtrader.com', 's3-us-west-2.amazonaws.com', 'cdn.dribbble.com', 'ca-times.brightspotcdn.com'],
		remotePatterns: [{
			protocol: 'https',
			hostname: 'img2.cgtrader.com',
		},
		{
			protocol: 'https',
			hostname: 's3-us-west-2.amazonaws.com',
		},
		{
			protocol: 'https',
			hostname: 'cdn.dribbble.com',
		},
		{
			protocol: 'https',
			hostname: 'ca-times.brightspotcdn.com',
		},],
	}
}

export default nextConfig
