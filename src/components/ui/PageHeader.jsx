function PageHeader({

    title,

    subtitle,

    action,

}) {

    return (

        <div
            className="
        flex
        items-center
        justify-between

        mb-10
      "
        >

            <div>

                <h1 className="page-title">
                    {title}
                </h1>

                <p className="page-subtitle">
                    {subtitle}
                </p>

            </div>

            {action}

        </div>

    );
}

export default PageHeader;