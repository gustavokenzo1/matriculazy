function HomeSection() {
  return (
    <>
      <h1 className="text-8xl font-bold dark:text-stone-100 text-stone-800">
        MatricuLazy
      </h1>
      <h2 className="text-2xl dark:text-stone-300  text-stone-700 mt-8 mb-10 font-bold">
        GERADOR DE GRADE HORÁRIA PARA PESSOAS PREGUIÇOSAS
      </h2>
      <button
        className="focus:outline-none focus:ring-2 focus:ring-stone-800 focus:ring-offset-2 text-stone-800 dark:text-white px-16 py-2 font-bold border-stone-800 dark:border-stone-200  border-[1px] rounded-md hover:bg-stone-800 dark:hover:bg-stone-200 hover:text-white dark:hover:text-stone-800 transition-all"
        onClick={() => {
          window.location.href = "#selectUniversity";
        }}
      >
        Começar
      </button>
    </>
  );
}

export default HomeSection;
