import { AppBar, Container, Toolbar, Typography,Link, Badge, createMuiTheme, ThemeProvider, Button, Menu, MenuItem } from '@material-ui/core'
import Head from 'next/head'
import { createTheme } from '@material-ui/core/styles'
import useStyles from '../utils/styles'
import NextLink from "next/link"
import Cookies from 'js-cookie';
import React, { useContext,useState } from 'react';
import { Store } from '../utils/Store';
import { useRouter } from "next/router";

export default function Layout({children}) {
    // const thme = createMuiTheme();

    const [anchorEl, setAnchorEl] = useState(null);

    const loginClickHandler = (e) => {
        setAnchorEl(e.currentTarget);
      };

    const loginMenuCloseHandler = (e, redirect) => {
        setAnchorEl(null);
        if (redirect && redirect !=="backdropClick") {
          router.push(redirect);
        }
      };
      const logoutClickHandler = () => {
        setAnchorEl(null);
        dispatch({ type: 'USER_LOGOUT' });
        Cookies.remove('userInfo');
        Cookies.remove('cartItems');
        Cookies.remove('shippinhAddress');
        Cookies.remove('paymentMethod');
        Cookies.remove('admin');
        Cookies.remove('userToken');
        router.push('/');
      };
    
    const classes = useStyles();
    const router = useRouter();
    const { state, dispatch } = useContext(Store);
    const {cart,userInfo,admin} = state;
    console.log(admin)

    return (
        <div>
            <Head>
                <title>ECSITE</title>
            </Head>
            <AppBar position='static' className={classes.navbar}>
                <Toolbar>
                <NextLink href="/" passHref>
                    <Link><Typography className={classes.brand}>ECSITE</Typography></Link>
                </NextLink>
                <div className={classes.grow}>

                </div>

                <div>
                    <NextLink href="/cart" passHref>
                    <Link>
                        {cart.cartItems.length > 0 ? <Badge color="secondary" badgeContent={cart.cartItems.length}>Cart</Badge>:"Cart"}
                    </Link>
                    </NextLink>

                    {userInfo?
                    (
                    <>
                        <Button 
                            aria-controls="simple-menu"
                            aria-haspopup="true"
                            onClick={loginClickHandler}
                            className={classes.navbarButton}>
                            {userInfo.name}
                        </Button> 
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={loginMenuCloseHandler}
                        >
                            <MenuItem
                            onClick={(e) => loginMenuCloseHandler(e, '/profile')}
                            >
                            Profile
                            </MenuItem>
                            <MenuItem
                            onClick={(e) =>
                                loginMenuCloseHandler(e, '/order-history')
                            }
                            >
                            Order Hisotry
                            </MenuItem>
                            {admin?.admin?.admin ==true && (
                            <MenuItem
                                onClick={(e) =>
                                loginMenuCloseHandler(e, '/admin/dashboard')
                                }
                            >
                                Admin Dashboard
                            </MenuItem>
                            )}
                            <MenuItem onClick={logoutClickHandler}>Logout</MenuItem>
                        </Menu>
                    </>
                    ): 
                    ( <NextLink href="/login" passHref><Link>Login</Link></NextLink>)
                    }
                </div>
                </Toolbar>
            </AppBar>
            <Container className={classes.main}>
                {children}
            </Container>
            <footer className={classes.footer}>
                <Typography>ALL rights reserved next ECSITE</Typography>
            </footer>
        </div>
    )
}
