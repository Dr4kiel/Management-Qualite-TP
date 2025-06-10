interface PageTitleProps {
    title: string;
}

export const PageTitle = ({ title }: PageTitleProps) => {
    return (
        <h1 className="text-3xl font-bold mb-8 text-center">
            {title}
        </h1>
    );
};