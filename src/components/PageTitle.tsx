import styles from '@/app/styles/PageTitle.module.css';

interface PageTitleProps {
    title: string;
}

export const PageTitle = ({ title }: PageTitleProps) => {
    return (
        <h1 className={styles.title}>
            {title}
        </h1>
    );
};