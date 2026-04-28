import Link from "next/link";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function BlogNotFound() {
  return (
    <>
      <Header />
      <main
        className="flex flex-col items-center justify-center text-center px-6"
        style={{ background: "#F0EBE3", minHeight: "100vh" }}
      >
        <p
          className="text-[10px] font-medium tracking-[0.3em] uppercase mb-4"
          style={{ color: "#84936f" }}
        >
          Erro 404
        </p>
        <h1 className="h2 mb-4" style={{ color: "#1A0F08", fontWeight: 400 }}>
          Artigo não encontrado
        </h1>
        <p className="paragraph mb-8 max-w-sm" style={{ color: "#7a6a5e", fontWeight: 300 }}>
          O artigo que você procura não existe ou foi movido.
        </p>
        <Link
          href="/blog"
          className="inline-flex items-center px-7 py-3 rounded-full text-[13px] font-medium text-white"
          style={{ background: "#994f2a" }}
        >
          Ver todos os artigos
        </Link>
      </main>
      <Footer />
    </>
  );
}
