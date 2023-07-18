/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
	experimental: {
		appDir: true,
	},
	modularizeImports: {
		'@mui/icons-material/?(((\\w*)?/?)*)': {
			transform: '@mui/icons-material/{{ matches.[1] }}/{{member}}'
		}
	}
};

export default nextConfig;
