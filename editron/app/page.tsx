import { Editor } from "@/components/editor/editor";

export default function Home() {
  return (
    <div className="min-h-screen">
      <header className="border-b">
        <div className="container mx-auto py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Editron</h1>
          <p className="text-sm text-muted-foreground">AI Image Editor</p>
        </div>
      </header>
      
      <main>
        <Editor />
      </main>
    </div>
  );
}
