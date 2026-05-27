import Card from "../ui/Card";

function StatCard({

    title,

    value,

    subtitle,

}) {

    return (

        <Card className="p-8">

            <p
                className="
          text-zinc-400
          uppercase
          text-sm
        "
            >
                {title}
            </p>

            <h2
                className="
          text-5xl
          font-bold
          mt-5
        "
            >
                {value}
            </h2>

            <p className="text-zinc-500 mt-4">
                {subtitle}
            </p>

        </Card>

    );
}

export default StatCard;