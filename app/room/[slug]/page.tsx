import CodeEditor from "@/app/client/editor";
export default async function LandingPage({params,}: { params: Promise<{ slug: string }>;}) {
    const { slug } = await params;
    return (
        <>
            <CodeEditor slug={slug}/>
        </>
    );
}
