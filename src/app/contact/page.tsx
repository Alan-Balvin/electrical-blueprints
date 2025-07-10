export default function ContactPage() {
  return (
    <div className="relative min-h-screen bg-cover bg-center">
      <div className="absolute inset-0 bg-white bg-opacity-70 backdrop-blur-sm" />
<div
          className="absolute inset-0 bg-center bg-cover opacity-70 filter brightness-110 contrast-125 pointer-events-none z-0"
          style={{ backgroundImage: "url('/images/background3.png')" }}
        />
      <main className="relative p-8 max-w-3xl mx-auto z-10">
        
        <h1 className="text-4xl font-bold mb-6 ">Contact</h1>
        <p className="text-lg text-gray-700">
          Feel free to contact me at:
          <a
            href="mailto:pablocancino@hotmail.com"
            className="text-blue-600 underline ml-2"
          >
            pablocancino@hotmail.com
          </a>
        </p>
      </main>
    </div>
  );
}
