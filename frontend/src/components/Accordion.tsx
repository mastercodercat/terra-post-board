import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography, { TypographyProps } from "@mui/material/Typography";
import { Theme, useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { useConnectedWallet } from "@terra-money/wallet-provider";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
    color: theme.palette.secondary.main,
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),

    "&.Mui-expanded span": {
      color: theme.palette.secondary.main,
    },
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const AccordionText = styled((props: TypographyProps) => (
  <Typography variant="body2" {...props} />
))(({ theme }) => ({
  fontFamily: "Archivo",
  fontWeight: 500,
}));

interface ICustomizedAccordionProps {
  post: IPost;
  handleLike: () => void;
}

export default function CustomizedAccordion({
  post,
  handleLike,
}: ICustomizedAccordionProps) {
  const [expanded, setExpanded] = React.useState(false);
  const theme = useTheme<Theme>();
  const connectedWallet = useConnectedWallet();

  const isLiked = React.useMemo(() => {
    return post.likes.find((addr) => addr === connectedWallet?.terraAddress);
  }, [post, connectedWallet]);

  const handleChange =
    () => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded);
    };

  return (
    <Accordion expanded={expanded} onChange={handleChange()}>
      <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
        <AccordionText>{post.title}</AccordionText>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Stack>
            <Typography variant="caption" sx={{ mb: 2 }}>
              Creator: {post?.user || "None"}
            </Typography>
            <Typography variant="body2">{post.description}</Typography>
          </Stack>
          <Stack>
            <IconButton
              color={isLiked ? "secondary" : "primary"}
              onClick={handleLike}
            >
              {isLiked ? <ThumbDownIcon /> : <ThumbUpIcon />}
            </IconButton>
            <Typography variant="h5" sx={{ textAlign: "center" }}>
              {post.likes.length}
            </Typography>
          </Stack>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}
