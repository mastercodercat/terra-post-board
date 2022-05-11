const { task } = require("@iboss/terrain");

task(async ({ wallets, refs, config, client }) => {
  // query is a thin wrapper of contract query
  const posts = await client.query("post_board", { get_posts: {} });
  console.log("prev posts count = ", posts.length);

  // execute is a thin wrapper of signing and broadcasting execute contract
  await client.execute(wallets.validator, "post_board", {
    create_post: {
      title: "Post #1",
      description: "Test post description",
      image: "image.png"
    },
  });
  const posts2 = await client.query("post_board", { get_posts: {} });
  console.log("new posts count = ", posts2.length);
});
