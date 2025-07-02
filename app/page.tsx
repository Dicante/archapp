"use client";

import Image from "next/image";
import { LoremIpsum } from "lorem-ipsum";
import { useState, useEffect } from "react";

const lorem = new LoremIpsum();

type PostProps = {
  title: string;
  coverImage: string;
  date: string;
  author: string;
  excerpt: string;
};

export default function HomePage() {
  const [posts, setPosts] = useState<PostProps[]>([]);

  useEffect(() => {
    setPosts(
      Array.from({ length: 4 }).map(() => ({
        title: lorem.generateSentences(1),
        coverImage: `/image${Math.floor(Math.random() * 6) + 1}.jpg`,
        date: "June 28, 2025",
        author: lorem.generateWords(2),
        excerpt: lorem.generateParagraphs(1),
      }))
    );
  }, []);

  return (
    <div className="min-h-screen">
      <main>
        <div className="container mx-auto px-5">
          <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
            <div className="flex flex-row items-center gap-4">
              <Image
                src="/logo.jpg"
                alt="Logo"
                className="shadow-sm w-16 h-16 md:w-32 md:h-32 shrink-0"
                width={128}
                height={128}
                priority
              />
              <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">Easy Site</h1>
            </div>
            <h4 className="text-center md:text-left text-lg mt-5 md:pl-8">For my cloud computing course.</h4>
          </section>
        </div>

        <div className="container mx-auto px-5">
          <section>
            <div>
              <div className="mb-8 md:mb-16">
                <iframe
                  className="shadow-sm w-full aspect-video"
                  src="https://www.youtube.com/embed/Ti71fevr_ws"
                  title="The Local Project"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
                <div>
                  <h3 className="mb-4 text-4xl lg:text-5xl leading-tight">
                    {"An Architect's Own Minimalist Oasis in the Inner Suburbs (House Tour)"}
                  </h3>
                  <div className="mb-4 md:mb-0 text-lg">July 5, 2022</div>
                </div>
                <div>
                  <p className="text-lg leading-relaxed mb-4">
                    {
                      "Queens Park House is an architect's own minimalist oasis. Designed by Kyra Thomas Architects, the calming suburban home strongly contrasts its previous iteration as a storage warehouse. Located in Sydney, Queens Park House was originally a storage warehouse with brick walls built to the boundary of its site. Converting the commercial property into an architect’s own minimalist oasis required opening up the building and rewriting its internal character."
                    }
                  </p>
                  <div className="flex items-center">
                    <Image
                      src="/avatar.jpg"
                      alt="Author avatar"
                      className="w-12 h-12 rounded-full mr-4"
                      width={48}
                      height={48}
                    />
                    <div className="text-xl font-bold">The Local Project</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="container mx-auto px-5">
          <section>
            <h2 className="mb-8 text-5xl md:text-7xl font-bold tracking-tighter leading-tight">More Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
              {posts.map((post, index) => (
                <PostPreview
                  key={index}
                  title={post.title}
                  coverImage={post.coverImage}
                  date={post.date}
                  author={post.author}
                  excerpt={post.excerpt}
                />
              ))}
            </div>
          </section>
        </div>

        <div className="container mx-auto px-5">
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-4">Welcome to the Blog</h2>
            <p className="text-lg">
              This is a simple web app for my cloud computing course. It demonstrates the use of cloud services to host
              a static website. The app is built with Next.js, a React framework that enables server-side rendering and
              static site generation.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

const PostPreview = ({ title, coverImage, date, author, excerpt }: PostProps) => {
  return (
    <div>
      <div className="mb-5">
        <Image
          src={coverImage}
          alt={`Cover Image for ${title}`}
          className={"shadow-sm w-full aspect-video"}
          width={1300}
          height={630}
        />
      </div>
      <h3 className="text-3xl mb-3 leading-snug">{title}</h3>
      <div className="text-lg mb-4">{date}</div>
      <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
      <div className="flex items-center">
        <Image src="/avatar.jpg" alt="Author avatar" className="w-12 h-12 rounded-full mr-4" width={48} height={48} />
        <div className="text-xl font-bold capitalize">{author}</div>
      </div>
    </div>
  );
};

function Footer() {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200">
      <div className="container mx-auto px-5">
        <div className="py-28 flex flex-col lg:flex-row items-center justify-between">
          {/* Left side: Name and info */}
          <div className="flex flex-col items-center lg:items-start lg:w-3/4">
            <h3 className="text-2xl lg:text-[2rem] font-extrabold tracking-tighter leading-tight text-center lg:text-left mb-2 text-black">
              Conceptualización de servicios en la nube
            </h3>
            <div className="flex flex-col lg:flex-row items-center lg:items-baseline mb-4 lg:gap-4">
              <span className="text-[1rem] lg:text-xl text-center lg:text-left">
                Jose Julian Dicante Rivera
              </span>
              <span className="text-[0.8rem] lg:text-[1.1rem] text-center lg:text-left lg:ml-2 mt-1 lg:mt-0">
                219533808
              </span>
            </div>
          </div>
          {/* Right side: Contact info */}
          <div className="flex flex-col items-center lg:items-end lg:w-1/2 mt-8 lg:mt-0">
            <a
              href="mailto:julian.dicante@alumnos.udg.mx"
              className="mx-3 text-sm lg:text-lg text-neutral-400 transition-all duration-200 hover:underline hover:text-black flex items-center group"
              aria-label="Contact"
            >
              {/* Inline SVG mail icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 mr-2 stroke-current transition-colors duration-200 group-hover:text-black"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a3 3 0 003.22 0L22 8m-19 8V8a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              </svg>
              julian.dicante@alumnos.udg.mx
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
