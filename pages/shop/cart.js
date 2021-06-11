import Layout from '@/components/layoutSub'
import Link from 'next/link'
import React from 'react';
import { useSWRInfinite } from 'swr';
import fetcher from '@/lib/fetch';
import Skeleton from "react-loading-skeleton";
import { getStoreById } from '@/components/shop/Store'

export default function ShopCart() {
    const member_id = "fXeJml-Kl9qQ";
    const { data } = getCarts(member_id);
    const carts = data ? data.reduce((acc, val) => [...acc, ...val.carts], []) : [];
    return (
        <Layout title="Keranjang Belanja">
            
                <div>
                    {
                        carts ? (
                            carts.map((cart) => 
                                <StoreGrouping key={cart._id} cart={cart} />
                            )
                        ) : <Skeleton />
                    }
                </div>
            <div className="content mt-1 mb-1 p-2">
                <div className="step mb-2">Sudah pilih barang-barang yang akan dibeli? Yuk ke kasir buat pilih metode pengiriman dan pembayaran.</div>
                <div className="text-center">
                    <Link href="/shop/checkout" >
                        <button className="btn bg-primary">Menuju Kasir</button>
                    </Link>
                </div>
            </div>
        </Layout>
    )
}

function StoreGrouping({cart}) {
    const { data } = getStoreById(cart.store_id);
    return data ? (
        <>
        {
            data.map((item) => (
                <div className="content mt-1 mb-1 p-2" key={cart.store_id}>
                    <div className="pb-2"><b>{item.store.name}</b><span style={{
                        "color": "gray",
                        "fontSize": "10px",
                        "float": "right"
                    }}></span></div>
                    <hr /><hr />
                    <div className="mt-2">
                            {
                                cart.product_ids.map((product_id) => 
                                    <ProductCart key={product_id} product_id={product_id} />
                                )
                            }
                    </div>
                    <div style={{"fontSize":"12px","color":"grey"}}>Desa {item.store.desa}, Kec. {item.store.kecamatan}</div>
                </div>
                )
            )
        }
        </>
    ) : <Skeleton />;
}

function ProductCart({product_id}) 
{
    const { data } = getProduct(product_id)
    return data ? (
        data.map((item) => 
            <Product key={item.product._id} item={item.product}/>
        )
    ) : <Skeleton />;
}

export function getProduct(product_id) {
    return useSWRInfinite(() => {
        return `/api/shop/product?id=${product_id}`;
    }, fetcher, {});
}

export function getCarts(member_id) {
    return useSWRInfinite(() => {
        return `/api/shop/cart?member_id=${member_id}`;
    }, fetcher, {});
}

function Product({ item }) {
    return (
        <>
        <div style={{"marginBottom":"10px"}}>
        <div style={{"position": "absolute"}}>
            <img src="https://media.allure.com/photos/602c0ac49bce5b70c6ce2f13/1:1/w_1000,h_1000,c_limit/Cocokind%20Sake%20Body%20Lotion.jpg" style={{"width":"80px"}} />
        </div>
        <div style={{"marginLeft": "85px","marginBottom": "20px"}}>
            <div className="pl-2"><b>{item.name}</b>
                <br />
                <br />
                <button className="btn bg-primary">Hapus Produk</button>
                </div>
        </div>
        <hr />
        </div>
        </>
    );
}