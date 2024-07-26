import Link from "next/link";

// 404 page
export default function Page404() {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-md">
      <h1>404 - Not Found</h1>
      <h2>Procuramos essa pagina de cima a baixo, mas não encontramos nada</h2>
      <br />
      <h3>Você talvez queira ir para alguma dessas paginas:</h3>
      <ul>
        <li>
          <Link href="/">Pagina Inicial</Link>
        </li>
        <li>
          <Link href="/summaries">Resumos</Link>
        </li>
        <li>
          <Link href="/cv">Currículo</Link>
        </li>
        <li>
          <Link href="/about">Sobre mim</Link>
        </li>
      </ul>
    </div>
  );
}
