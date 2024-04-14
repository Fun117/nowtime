import { SettingItem } from "@/components/client/customize";

export const CustomizeConfig_CarouselItem: SettingItem[] = [
    {
        title: "テキスト",
        contents: [
            {
                type: 'select',
                key_label: 'font',
                title: 'フォント',
                default_value: 'sans',
                disabled: false,
                select_items: [
                    { value: 'sans', label: 'sans' },
                    { value: 'serif', label: 'serif' },
                    { value: 'mono', label: 'mono' },
                ],
            },
            {
                type: 'select',
                key_label: 'animation',
                title: 'アニメーション',
                default_value: 'none',
                disabled: false,
                select_items: [
                    { value: 'none', label: 'none' },
                    { value: 'spin', label: 'spin' },
                    { value: 'bounce', label: 'bounce' },
                    { value: 'rotate-x', label: 'rotate-x' },
                ],
            },
        ],
    },
    //
]