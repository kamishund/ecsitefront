import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/Layout'
import styles from '../styles/Home.module.css'
import { getAllPostsData } from "../lib/products";
import NextLink from "next/link"
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography ,Grid, Link} from '@material-ui/core';
export default function Home({data}) {
  console.log(data)
  return (
    <Layout>
      <div>
        <h1>Products</h1>
        <Grid container spacing={3}>
        {data.map((product) => (
          <Grid item md={4} key={product.name}>
            {/* <ProductItem
              product={product}
              addToCartHandler={addToCartHandler}
            /> */}
            <Card>
              <NextLink href={`/product/${product.id}`} passHref>
                <Link>
                <CardActionArea>
                  <CardMedia component="img" image={product.image.url} title={product.name}></CardMedia>
                  <CardContent>
                    <Typography>{product.name}</Typography>
                  </CardContent>
                </CardActionArea>
                </Link>
              </NextLink>
              <CardActions>
                <Typography>${product.price}</Typography>
                <Button size="small" color="primary">Card add to</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const data = await getAllPostsData();
  return {
    props: { data },
    revalidate: 3,
  };
}