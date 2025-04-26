import ReactPopover from "./Popover";

export default function Header() {
  return (
    <header>
      <nav className="flex fixed w-screen bg-green-950 text-gray-300 border-b border-emerald-700 flex-row gap-40 justify-evenly p-4 m-auto">
        <div>Home</div>
        <div> <ReactPopover children={"Informações"} content={"Está em desenvolvimento... Bugs ocasionais podem ser encontrados no site :>"}/></div>
          
        <div>Sendo desenvolvido por S797-Corleone</div>
      </nav>
    </header>
  );
}
