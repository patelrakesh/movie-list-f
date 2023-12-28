import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

const ListingSkeleton = () => {
  return (
    <Stack spacing={0.1}>
      <Skeleton variant="rounded" height={200} />
      <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
    </Stack>
  );
};

export default ListingSkeleton;
