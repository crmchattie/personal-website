import Image from "next/image";
import Link from "next/link";
import { getPosts } from "@/sanity/sanity.query";
import type { PostType } from "@/types";

export default async function Posts() {
  const posts: PostType[] = await getPosts();

  return (
    <main className="max-w-7xl mx-auto md:px-16 px-6">
      <section className="max-w-2xl mb-16">
        <h1 className="text-3xl font-bold tracking-tight sm:text-5xl mb-6 lg:leading-[3.7rem] leading-tight">
          Featured posts I&apos;ve written
        </h1>
        <p className="text-base text-zinc-400 leading-relaxed">
            When I worked in finance, I wrote a decent amount about industry dynamics, company strategies and whether a 
            stock was a good investment or not. Now, that I am no longer working in finance, I can share my writings. However,
            now that I am not longer working in finance, I pay attention to markets less and write even less. Nevertheless, 
            I am inspired to write more, not only investment memos but also a broader array of content.
        </p>
      </section>

      <section className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 mb-12">
        {posts.map((post) => (
          <Link
            href={`/posts/${post.slug}`}
            key={post._id}
            className="flex items-center gap-x-4 bg-[#1d1d20] border border-transparent hover:border-zinc-700 p-4 rounded-lg ease-in-out"
          >
            <div>
              <h2 className="font-semibold mb-1">{post.title}</h2>
              <div className="text-sm text-zinc-400">{post.excerpt}</div>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
