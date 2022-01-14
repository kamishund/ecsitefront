import fetch from "node-fetch";

export async function getAllOrderIds() {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}order/`)
  );
  const data = await res.json();
  return data.map((post) => {
    return {
      params: {
        id: String(post.id),
      },
    };
  });
}

export async function getOrderData(id) {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}order/${id}/`)
  );
  const post = await res.json();
  // return {
  //   post,
  // };
  return post;
}