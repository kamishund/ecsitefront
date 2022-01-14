import React, { useContext, useEffect, useState } from 'react';
import NextLink from 'next/link';
import Layout from '../../components/Layout';
import Image from 'next/image';
import { useRouter } from 'next/router';
import {
    Grid,
    Link,
    List,
    ListItem,
    Typography,
    Card,
    Button,
    TextField,
    CircularProgress,
  } from '@material-ui/core';
import useStyles from '../../utils/styles';
import { getAllPostIds,getPostData } from '../../lib/products';
import { Store } from '../../utils/Store';
import axios from 'axios';

export default function ProductScreen(props) {

  const{product} = props;
  const router = useRouter();
//   const {slug} = router.query;
  const classes = useStyles();
  const {state,dispatch} = useContext(Store);

  const addToCartHandler = async () => {
      
    const existItem = state.cart.cartItems.find((x) => x.id === product.id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    console.log(product.id)
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_RESTAPI_URL}products/${product.id}/`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }

    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity}});

    router.push('/cart');
  };


  return (
    <Layout>
        <div className={classes.section}>
            <NextLink href="/" passHref>
                <Link>back to products</Link>
            </NextLink>
        </div>
        <Grid container spacing={1}> 
            <Grid item md={6} xs={12}>
                <img
                    src={product.image.url}
                    alt={product.name}
                    width="100%"
                />
        
            </Grid>

            <Grid item md={3} xs={12}>
                <List>
                    <ListItem>
                    <Typography component="h1" variant="h4">
                        {product.name}
                    </Typography>
                    </ListItem>
                    <ListItem>
                    <Typography>Category: {product.category}</Typography>
                    </ListItem>
                    <ListItem>
                    <Typography>Brand: {product.brand}</Typography>
                    </ListItem>
                    <ListItem>
                    {/* <Rating value={product.rating} readOnly></Rating> */}
                    <Link href="#reviews">
                        <Typography>({product.numReviews} reviews)</Typography>
                    </Link>
                    </ListItem>
                    <ListItem>
                    <Typography> Description: {product.description}</Typography>
                    </ListItem>
                </List>
            </Grid>

            <Grid item md={3} xs={12}>
                <Card>
                    <List>
                        <ListItem>
                            <Grid container>
                                <Grid item xs={6}><Typography>Price</Typography></Grid>
                                <Grid item xs={6}><Typography>${product.price}</Typography></Grid>
                            </Grid>
                        </ListItem>

                        <ListItem>
                            <Grid container>
                                <Grid item xs={6}><Typography>Status</Typography></Grid>
                                <Grid item xs={6}><Typography>{product.countInStock>0?"在庫あり":"入荷待ち"}</Typography></Grid>
                            </Grid>
                        </ListItem>

                        <ListItem>
                           <Button fullWidth variant='contained' color="primary" onClick={addToCartHandler}>
                               Add to cart
                           </Button>
                        </ListItem>
                    </List>
                </Card>
            </Grid>
        </Grid>
    </Layout>
  );
}

export async function getStaticPaths() {
    const paths = await getAllPostIds();
  
    return {
      paths,
      fallback: true,
    };
  }
  export async function getStaticProps({ params }) {
    //const { post: post } = await getPostData(params.id);
    const product = await getPostData(params.id);
    return {
      props: {
        product,
      },
      revalidate: 3,
    };
  }