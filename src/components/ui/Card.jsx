function Card({

    children,

    className = "",

}) {

    return (

        <div
            className={`
        bg-white
        dark:bg-zinc-900

        rounded-3xl

        border
        border-zinc-200
        dark:border-zinc-800

        shadow-sm

        ${className}
      `}
        >

            {children}

        </div>

    );
}

export default Card;