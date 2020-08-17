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
  ],
};
