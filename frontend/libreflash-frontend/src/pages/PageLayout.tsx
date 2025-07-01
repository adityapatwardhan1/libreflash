// common layout wrapper (you can paste this into each page or create a Layout component)
export default function PageLayout({ children, title }: { children: React.ReactNode, title?: string }) {
  return (
    <main className="max-w-2xl mx-auto p-6 min-h-screen flex flex-col justify-between text-center">
      <header className="py-10">
        {title && <h1 className="text-4xl font-bold">{title}</h1>}
      </header>
      <section className="flex-grow flex flex-col items-center justify-start">
        {children}
      </section>
      <footer className="h-[10vh]" />
    </main>
  )
}
