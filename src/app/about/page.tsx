

export default function AboutPage() {
  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/background2.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Fondo semitransparente para mejorar legibilidad */}
      <div className="absolute inset-0 bg-white bg-opacity-70 backdrop-blur-sm" />

      {/* Contenido principal */}
      <main className="relative p-8 max-w-3xl mx-auto z-10">
        <h1 className="text-4xl font-bold mb-6">About</h1>
        <p className="text-lg text-gray-700">
          This project was built by Pablo Cancino using Next.js 15 and TailwindCSS.
          It allows users to view and search electrical blueprints for Novotel Living Mazatlán.
        </p>
      </main>
    </div>
  );
}
