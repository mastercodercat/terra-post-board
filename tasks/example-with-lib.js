const { task } = require("@iboss/terrain");
const lib = require("../lib");

task(async (env) => {
  const { getPosts, createPost } = lib(env);
  console.log("posts 1 = ", await getPosts());
  await createPost("Post #1", "Test post description", "image.png");
  console.log("posts 2 = ", await getPosts());
});
