module.exports = {
  formatResponse: (res) => {
    let collection = {
      name: res.collection.name,
      description: res.collection.description,
      external_link: res.collection.external_link,
      images: {
        main: res.collection.image_url,
        banner: res.collection.banner_image_url,
        large: res.collection.large_image_url
      },
      links: {
        external: res.collection.external_link,
        discord: res.collection.discord_link,
        twitter: `https://twitter.com/${res.collection.twitter_username}`,
      },
      stats: {
        floor: res.collection.stats.floor_price,
        supply: res.collection.stats.total_supply,
        volume: res.collection.stats.total_volume,
        owners: res.collection.stats.num_owners
      }
    };
    return collection;
  },
};
