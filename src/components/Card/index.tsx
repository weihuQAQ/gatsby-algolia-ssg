import React, { FC } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import ShareIcon from "@mui/icons-material/Share";

import { AlgoliaSourceProduct } from "../../utils/algolia";

export interface ProductCardProps {
  product: AlgoliaSourceProduct;
}

export const ProductCard: FC<ProductCardProps> = ({ product }) => {
  return (
    <Card sx={{ maxWidth: 345 }} elevation={16}>
      <CardHeader title={product.prod_name} subheader="" />

      <CardMedia
        component="img"
        image={product.sku_image_url}
        alt="Paella dish"
      />

      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};
