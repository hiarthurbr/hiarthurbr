// 404 page
export default function() {
  return <div className="prose prose-lg dark:prose-invert max-w-md">
    <h1>404 - Not Found</h1>
    <h2>Procuramos essa pagina de cima a baixo, mas não encontramos nada</h2><br />
    <h3>Você talvez queira ir para alguma dessas paginas:</h3>
    <ul>
      <li><a href="/">Pagina Inicial</a></li>
      <li><a href="/resumes">Resumos</a></li>
      <li><a href="/curriculum">Currículo</a></li>
      <li><a href="/about">Sobre mim</a></li>
      <li><a href="/shop">Lista de compras</a></li>
    </ul>
  </div>
}