const fetch = require('node-fetch');

exports.sourceNodes = ({ actions, createNodeId, createContentDigest }) => {
  fetch('https://api.github.com/repos/requirepodcast/app/releases')
    .then(res => res.json())
    .then(releases => {
      for (let release of releases) {
        const { createNode } = actions;

        const data = {
          name: release.name,
          description: release.body,
          createdAt: release.created_at,
          apk: release.assets[0].browser_download_url,
        };

        const nodeMeta = {
          id: createNodeId(release.id),
          parent: null,
          children: [],
          internal: {
            type: 'Release',
            mediaType: 'text/markdown',
            content: data.description,
            contentDigest: createContentDigest(data),
          },
        };

        createNode({ ...data, ...nodeMeta });
      }
    });
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  const typeDefs = `
    type Release implements Node {
      name: String
      description: String
      createdAt: Date
      apk: String
    }
  `;

  createTypes(typeDefs);
};

exports.createResolvers = ({ createResolvers }) => {
  const resolvers = {
    Query: {
      allReleases: {
        type: ['Release'],
        resolve(source, args, context, info) {
          return context.nodeModel.getAllNodes({ type: 'Release' });
        },
      },
    },
  };

  createResolvers(resolvers);
};
