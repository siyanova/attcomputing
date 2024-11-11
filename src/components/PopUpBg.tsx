import { PropsWithChildren, forwardRef, ForwardRefRenderFunction } from "react";

type PopUpBgProps = PropsWithChildren<{
    className?: string
}>;

const PopUpBgInner: ForwardRefRenderFunction<HTMLDivElement, PopUpBgProps> = (props, ref) => {
    return (
        <div ref={ref} className={`bg-white flex flex-col px-5 lg:px-[80px] py-5 lg:py-[60px] absolute left-[50%] -translate-x-[50%] border-[3px] border-[#568AFF] rounded-3xl max-w-[700px] w-[75%] ${props.className}`}>
            {props.children}
        </div>
    );
};

export const PopUpBg = forwardRef(PopUpBgInner);

PopUpBg.displayName = 'PopUpBg';