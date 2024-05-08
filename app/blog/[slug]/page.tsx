import { fullBlog } from "@/app/lib/interface";
import { client, urlFor } from "@/app/lib/sanity";
import { PortableText } from "next-sanity";
import Image from "next/image";

async function getData(slug:'string') {
    const query = `*[_type == "blog" && slug.current == '${slug}' ]{
        "currentSlug": slug.current,
          title,
          content,
          titleImage
      }[0]`

      const data = await client.fetch(query);
      return data;
}



export default async function blogArticle({params}: {params:{slug: 'string'}}) {
    const data: fullBlog = await getData(params.slug);
    console.log(data)
    return(
        <div className="m-auto">
            <h1 className="text-center ">
                <span className="block text-base text-primary font-semibold tracking-wide uppercase ">Vincent Blog</span>
                <span className="mt-12 m-auto block text-3xl text-center leading-8 font-bold tracking-tight sm:text-4xl">{data.title}</span>
            </h1>
            
            <Image priority className="m-auto rounded-lg mt-8 border" src={urlFor(data.titleImage).url()} width={500} height={500} alt="title image"/>
            
            <div className="mt-12 m-auto text-center prose prose-blue prose-xl dark:prose-invert prose-headings:underline prose-li:marker:text-primary">
                <PortableText value={data.content} />
            </div>
        </div>
    )
}