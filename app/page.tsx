import { Card, CardContent } from "@/components/ui/card";
import { simpleBlogCard } from "./lib/interface";
import {client, urlFor} from "./lib/sanity";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const revalidate = 30 ;

async function  getData() {

  const query = `
  *[_type == 'blog'] | order(_createdAt desc){
    title,
      smalldescription,
      "currentSlug": slug.current,
      titleImage,
  }`;

  const data = await client.fetch(query);
  
  return data 
}

export default async function Home() {

  const data: simpleBlogCard[] = await getData()
  

  return (
    
      <div className="m-auto grid grid-cols-1 lg:grid-cols-2 mt-5 gap-5 ">

        {data.map((post, idx) => (
          <Card key={idx}>
            <Image 
            width={350} 
            height={350} 
            className="m-auto rounded-t-lg h-[200px] object-cover " 
            src={urlFor(post.titleImage).url() } alt="image"/>
            <CardContent className="mt-5">
              <h1 className="text-lg line-clamp-2 font-bold">{post.title}</h1>
              <p className=" line-clamp-3 text-small text-gray-600 dark:text-gray-400">{post.smalldescription}</p>
              <Button asChild className="w-full mt-7">
                <Link href={`/blog/${post.currentSlug}`}>Read more</Link>
              </Button>
            </CardContent>
          </Card>
        ))}

      </div>
    
  );
}
