interface Props {
    components: React.FC<{
        children: React.ReactNode;
    }>[];
    children: React.ReactNode;
}

export default function Compose(props: Props) {
    const { components = [], children } = props;

    return (
        <>
            {components.reduceRight((acc, Comp) => {
                return <Comp>{acc}</Comp>;
            }, children)}
        </>
    );
}
