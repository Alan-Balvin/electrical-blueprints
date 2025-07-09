export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-cover bg-center">
      <div className="absolute inset-0 bg-white bg-opacity-70 backdrop-blur-sm" />

      <main className="relative p-8 max-w-3xl mx-auto z-10">
        <div
          className="absolute inset-0 bg-center bg-cover opacity-40 filter brightness-110 contrast-125 pointer-events-none z-0"
          style={{ backgroundImage: "url('/images/background2.png')" }}
        />
        <h1 className="text-4xl font-bold mb-6">About</h1>
        <p className="text-lg text-gray-700">
          This project was built by Pablo Cancino using Next.js 15 and TailwindCSS.
          It allows users to view and search electrical blueprints for Novotel Living Mazatlán.
        </p>
      </main>
    </div>
  );
}
