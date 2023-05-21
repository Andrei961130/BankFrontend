'use client';

export interface IOperationTypeButtonProps {
    children?: React.ReactNode;
    props?: any;
    onClick?:
        | ((event: React.MouseEvent<HTMLButtonElement>) => void)
        | undefined;
}

const MyOperationTypeButton: React.FC<IOperationTypeButtonProps> = ({
    children,
    onClick,
    ...props
}) => {
    return (
        <button {...props} onClick={() => console.log(children)} {...props}>
            {children}
        </button>
    );
};

export default MyOperationTypeButton;