import React, { useState, useEffect, useRef } from 'react';
import { twMerge } from 'tailwind-merge'; 

interface Props {
    tabs: string[];
    defaultActiveTab: number;
    onSelect: (index: number) => void;
}

const Tabs: React.FC<Props> = (props) => {
    const [activeIndex, setActiveIndex] = useState<number>(props.defaultActiveTab);
    const [underlineStyle, setUnderlineStyle] = useState<React.CSSProperties>({});
    const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

    useEffect(() => {
        const activeTab = tabRefs.current[activeIndex];
        if (activeTab) {
            const { offsetLeft, clientWidth } = activeTab;
            setUnderlineStyle({
                left: `${offsetLeft}px`,
                width: `${clientWidth}px`,
            });
        }
    }, [activeIndex]);

    const classNames = {
        root: "flex gap-2 relative",
        item: (isActive: boolean) => twMerge(
            "px-2 py-2 font-bold text-lg",
            isActive ? "text-[var(--accent)]" : "text-[var(--muted)]"
        ),
        underline: "absolute bottom-0 h-1 rounded-full bg-[var(--accent)] transition-[left,width] duration-300 ease",
    };

    const handleClick = (index: number) => {
        setActiveIndex(index);
        props.onSelect(index);
    }
    return (
        <div className={classNames.root}>
            {props.tabs.map((tab, index) => (
                <button
                    key={index}
                    onClick={() => handleClick(index)}
                    className={classNames.item(index === activeIndex)}
                    ref={el => tabRefs.current[index] = el}
                >
                    {tab}
                </button>
            ))}
            <div className={classNames.underline} style={underlineStyle} />
        </div>
    );
};

export default Tabs;