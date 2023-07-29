import Image from "next/image";
import { Metadata } from "next";
import { getSinglePost } from "@/sanity/sanity.query";
import type { PostType } from "@/types";
import { PortableText } from "@portabletext/react";
import styles from './page.module.css'
import fallBackImage from "@/public/project.png";

type Props = {
  params: {
    post: string;
  };
};

// Dynamic metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.post;
  const post: PostType = await getSinglePost(slug);

  return {
    title: `${post.title} | post`,
    description: post.excerpt,
    openGraph: {
      images:
        post.mainImage?.image ||
        "https://res.cloudinary.com/victoreke/image/upload/v1689892912/docs/post.png",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function post({ params }: Props) {
  const slug = params.post;
  const post: PostType = await getSinglePost(slug);

  return (
    <main className="max-w-6xl mx-auto lg:px-16 px-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-start justify-between mb-4">
          <h1 className="font-bold lg:text-5xl text-3xl lg:leading-tight mb-4">
            {post.title}
          </h1>

          {/* <a
            href={post.slug}
            rel="noreferrer noopener"
            className="bg-[#1d1d20] text-white hover:border-zinc-700 border border-transparent rounded-md px-4 py-2"
          >
            Explore
          </a> */}
        </div>

        {/* <Image
          className="rounded-xl border border-zinc-800"
          width={900}
          height={460}
          src={post.mainImage?.image || fallBackImage}
          alt={post.mainImage?.alt || post.title}
        /> */}

        <div className={`flex flex-col gap-y-6 mt-8 leading-7 text-zinc-400 ${styles.portableText}`}>
          <PortableText value={post.body} />
        </div>
      </div>
    </main>
  );
}
