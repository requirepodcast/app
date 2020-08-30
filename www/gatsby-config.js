module.exports = {
  siteMetadata: {
    title: 'Require Podcast App',
    description: "Official Require Podcast's App",
    author: '@requirepodcast',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/assets/images`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-transformer-remark',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Require Podcast App',
        short_name: 'Require Podcast',
        start_url: '/',
        background_color: '#0f111a',
        theme_color: '#ff5370',
        display: 'minimal-ui',
        icon: 'src/assets/images/RequireLogo.png',
      },
    },
    'gatsby-plugin-styled-components',
  ],
};
