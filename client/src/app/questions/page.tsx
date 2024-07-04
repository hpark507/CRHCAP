export default function Page({
    params,
    searchParams,
  }: {
    params: { slug: string };
    searchParams?: { [key: string]: string | string[] | undefined };
  }) {
    // return <h1>{searchParams?.greeting || "Hello!"}</h1>;
    return <h1>{params?.slug}</h1>
  }