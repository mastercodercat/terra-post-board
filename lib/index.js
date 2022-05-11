module.exports = ({ wallets, refs, config, client }) => ({
  createPost: (title, description, image, signer = wallets.validator) =>
    client.execute(signer, "post_board", {
      create_post: { title, description, image },
    }),
  likePost: (index, signer = wallets.test1) =>
    client.execute(signer, "post_board", { like_post: { index } }),
  getPosts: () => client.query("post_board", { get_posts: {} }),
  getPostsByUser: (addr) => client.query("post_board", { get_posts_by_user: { addr } })
});
