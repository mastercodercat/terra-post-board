import React, { useEffect, useState } from "react";
import {
  useWallet,
  useConnectedWallet,
  WalletStatus,
} from "@terra-money/wallet-provider";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import * as execute from "./contract/execute";
import * as query from "./contract/query";
import ConnectWallet from "./components/ConnectWallet";
import Accordion from "./components/Accordion";
import PageLayout from "./layout/PageLayout";
import CreatePostDialog from "./components/CreatePostDialog";

import { useSpinner } from "./providers/SpinnerProvider";

function App() {
  const [posts, setPosts] = useState<Array<IPost>>([]);
  const { setLoading } = useSpinner();
  const [updating, setUpdating] = useState(true);
  const [resetValue, setResetValue] = useState(0);

  const { status } = useWallet();

  const connectedWallet = useConnectedWallet();

  useEffect(() => {
    const prefetch = async () => {
      if (connectedWallet) {
        const res = await query.getPosts(connectedWallet);
        setPosts(res.posts);
        console.log(res);
      }
      setUpdating(false);
    };
    prefetch();
  }, [connectedWallet]);

  const onCreatePost = async ({ title, description, image }: IPost) => {
    if (connectedWallet) {
      await execute.createPost(connectedWallet, title, description, image);
      const { posts: res } = await query.getPosts(connectedWallet);
      setPosts(res);
    }
    setLoading(false);
  };

  const onLikePost = async (index: number) => {
    setLoading(true);
    if (connectedWallet) {
      await execute.likePost(connectedWallet, index);
      const { posts: res } = await query.getPosts(connectedWallet);
      setPosts(res);
    }
    setLoading(false);
  };

  return (
    <PageLayout>
      <Stack>
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          Decentralized Post Board
        </Typography>
        <Box sx={{ my: 3 }}>
          <CreatePostDialog handleChange={onCreatePost} />
        </Box>
        <Box>
          {posts.map((post, index) => (
            <Accordion
              key={index}
              post={post}
              handleLike={() => onLikePost(index)}
            />
          ))}
        </Box>
      </Stack>
    </PageLayout>
  );
}

export default App;
