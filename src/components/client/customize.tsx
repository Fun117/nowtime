'use client'

import React, { ReactNode, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectSeparator,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

import { AlignJustify, Maximize2, Minimize2, Settings, X } from 'lucide-react';
import { _locales } from './_locales';
import { CustomizeConfig_CarouselItem } from '../../../configs/customize.config';


export interface SettingItem {
    title: string;
    contents: SettingContent[];
}

export interface SettingContent {
    type: string;
    key_label: string;
    title: string;
    default_value: string;
    disabled: boolean;
    select_items?: SelectItem[];
}

export type SelectItem = {
    value: string;
    label: string;
    disabled?: boolean;
};

type Settings = {
    [key: string]: string;
};

export const useSettings = () => {
    const [cookies] = useCookies(['settings']);
    const [settings, setSettings] = useState<Settings>({});
    const contents = CustomizeConfig_CarouselItem[0].contents; // ここでcontentsを設定

    useEffect(() => {
        if (cookies.settings) {
            if (typeof cookies.settings === 'object') {
                try {
                    const parsedSettings = JSON.parse(JSON.stringify(cookies.settings));
                    setSettings(parsedSettings);
                } catch (error) {
                    console.error('Error parsing settings:', error);
                }
            }
        }
    }, [cookies.settings]);

    const SettingGET = (key: string): string => {
        const settingContent = contents.find(item => item.key_label === key);
        
        if (settingContent) {
            if (settingContent.disabled) {
                return settingContent.default_value;
            }
            return settings[settingContent.key_label] || settingContent.default_value;
        }
        
        return ''; // 設定が見つからない場合は空文字列を返す
    };

    return {
        SettingGET
    };
};

function CarouselItemSettings() {
    const [cookies, setCookie] = useCookies(['settings']);
    const [settings, setSettings] = useState<Settings>({});

    useEffect(() => {
        if (cookies.settings) {
            if (typeof cookies.settings === 'object') {
                try {
                    const parsedSettings = JSON.parse(JSON.stringify(cookies.settings));
                    setSettings(parsedSettings);
                } catch (error) {
                    console.error('Error parsing settings:', error);
                }
            }
        }
    }, [cookies.settings]);    
    
    const saveSettingsToCookie = (newSettings: Settings) => {
        try {
            const mergedSettings = { ...settings, ...newSettings };
            const settingsString = JSON.stringify(mergedSettings);
            setCookie('settings', settingsString, { path: '/', sameSite: 'lax' });
            setSettings(mergedSettings);
        } catch (error) {
            console.error('Error saving settings:', error);
        }
    };

    const handleChange = (key: string, value: string) => {
        const newSettings = { ...settings, [key]: value };
        saveSettingsToCookie(newSettings);
    };

    return (
        <>
            {CustomizeConfig_CarouselItem.map((group, groupIndex) => (
                <CarouselItem key={groupIndex}>
                    <div className="flex justify-center items-center w-full h-full max-h-52 p-1">
                        <Card className='relative w-full h-full'>
                            <CardHeader>
                                <CardTitle>{_locales(group.title)}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className='grid grid-cols-3 gap-4'>
                                    {group.contents?.map((content, contentIndex) => (
                                        <li key={contentIndex} className='flex flex-row flex-wrap justify-start items-center w-full p-2'>
                                            <h2 className='mr-1'>{_locales(content.title)}</h2>
                                            <Select
                                                defaultValue={content.disabled ? content.default_value : settings[content.key_label] || content.default_value}
                                                onValueChange={(value) => handleChange(content.key_label, value)}
                                                disabled={content.disabled}
                                            >
                                                <SelectTrigger className="w-[180px]">
                                                    <SelectValue placeholder={_locales(`${content.title}を選択する`)} />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectLabel>{_locales(content.title)}</SelectLabel>
                                                        {content.select_items?.map((selectItem, sIdx) => (
                                                            <SelectItem key={sIdx} value={selectItem.value} disabled={content.disabled || false}>
                                                                {_locales(selectItem.label)}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </CarouselItem>
            ))}
        </>
    );
}

export function MainContents({ children }: { children?: React.ReactNode}) {
    const [isFullScreen, setIsFullScreen] = useState(false);

    const handleFullScreen = () => {
        const element = document.documentElement;

        if (!isFullScreen) {
            if (element.requestFullscreen) {
                element.requestFullscreen();
            } else if ((element as any).webkitRequestFullscreen) {
                (element as any).webkitRequestFullscreen();
            } else if ((element as any).msRequestFullscreen) {
                (element as any).msRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if ((document as any).webkitExitFullscreen) {
                (document as any).webkitExitFullscreen();
            } else if ((document as any).msExitFullscreen) {
                (document as any).msExitFullscreen();
            }
        }
    };

    useEffect(() => {
        const fullScreenChangeHandler = () => {
            setIsFullScreen(!!document.fullscreenElement || !!document.fullscreenElement || !!document.fullscreenElement);
        };

        document.addEventListener('fullscreenchange', fullScreenChangeHandler);
        document.addEventListener('webkitfullscreenchange', fullScreenChangeHandler);
        document.addEventListener('msfullscreenchange', fullScreenChangeHandler);

        return () => {
            document.removeEventListener('fullscreenchange', fullScreenChangeHandler);
            document.removeEventListener('webkitfullscreenchange', fullScreenChangeHandler);
            document.removeEventListener('msfullscreenchange', fullScreenChangeHandler);
        };
    }, []);

    const [backgroundImageUrl, setBackgroundImageUrl] = useState<string | null>(null);

    const handleImageUpload = (imageUrl: string) => {
        setBackgroundImageUrl(imageUrl);
        localStorage.setItem('backgroundImage', imageUrl);
    };

    useEffect(() => {
        const savedBackgroundImage = localStorage.getItem('backgroundImage');
        if (savedBackgroundImage) {
            setBackgroundImageUrl(savedBackgroundImage);
        }
    }, []);

    function CmpDrawer() {
        return (
            <Drawer>
                <DrawerTrigger asChild>
                    <Button variant="ghost" title={_locales(`メニュー`)} aria-label={_locales(`メニュー`)} className='p-2'><AlignJustify /></Button>
                </DrawerTrigger>
                <DrawerContent>
                    <div className="mx-auto w-full max-w-6xl">
                        <DrawerHeader className='pt-[50px]'>
                            <DrawerTitle>{_locales(`カスタマイズ`)}</DrawerTitle>
                        </DrawerHeader>
                        <div className="p-4 pb-2">
                            <Carousel className="w-full h-full max-h-52">
                                <CarouselContent>
                                    <CarouselItem>
                                        <div className="flex justify-center items-center w-full h-full max-h-52 p-1">
                                            <Card className='relative w-full h-full bg-cover bg-center bg-no-repeat' style={{ backgroundImage: `url(${backgroundImageUrl || ``})` }}>
                                                <div className="flex justify-center items-center w-full h-full absolute top-0 left-0 backdrop-blur backdrop-brightness-75 rounded-lg">
                                                    <CardTitle className='absolute top-0 p-6 w-full'>{_locales(`背景`)}</CardTitle>
                                                    <BackgroundImageUploader onUpload={handleImageUpload} className='w-full h-full opacity-0 cursor-pointer'/>
                                                    <label htmlFor="fileInput" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -mt-2 cursor-pointer text-center w-full max-w-52 h-auto
                                                    mr-4 py-2 px-4
                                                    rounded-full border-0
                                                    text-sm font-semibold
                                                    outline-dashed
                                                    outline-violet-500/80
                                                    bg-violet-50/80 text-violet-700
                                                    hover:bg-violet-100/80
                                                    dark:bg-violet-950/80 dark:text-violet-200
                                                    dark:hover:bg-violet-900/80
                                                    hover:shadow-lg
                                                    transition-all duration-300 ease-in-out
                                                    ">
                                                        {_locales(`画像を選択`)}
                                                    </label>
                                                </div>
                                            </Card>
                                        </div>
                                    </CarouselItem>
                                    {CarouselItemSettings()}
                                </CarouselContent>
                                <CarouselPrevious />
                                <CarouselNext />
                            </Carousel>
                        </div>
                        <DrawerFooter>
                        </DrawerFooter>
                        <div className='absolute top-0 left-0 m-2 p-2'>
                            <Button variant="ghost" onClick={handleFullScreen} title={_locales(`フルスクリーン`)} aria-label={_locales(`フルスクリーン`)}>
                                {isFullScreen ? <Minimize2/> : <Maximize2 />}
                            </Button>
                        </div>
                        <div className='absolute top-0 right-0 m-2 p-2'>
                            <Content_Settings/>
                            <DrawerClose asChild>
                                <Button variant="ghost" title={_locales(`閉じる`)} aria-label={_locales(`閉じる`)}><X/></Button>
                            </DrawerClose>
                        </div>
                    </div>
                </DrawerContent>
            </Drawer>
        )
    }

    function Content_Settings() {
        return (
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" title={_locales(`設定`)} aria-label={_locales(`設定`)}>
                        <Settings />
                    </Button>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>{_locales(`設定`)}</SheetTitle>
                    </SheetHeader>
                    <div className='pt-5 h-full overflow-y-auto'>
                        <ul className='flex flex-col justify-start items-center w-full py-2 *:flex *:flex-col *:justify-start *:items-center *:w-full'>
                            <li className=''>
                                <div className="flex flex-row justify-between items-center space-x-2 w-full">
                                    <Label htmlFor="developer-mode">{_locales(`デベロッパーモード`)}</Label>
                                    <Switch id="developer-mode" className='shadow-md' disabled />
                                </div>
                                <Separator className="my-5" />
                            </li>
                            <li className=''>
                                <div className="flex flex-row justify-between items-center space-x-2 w-full">
                                    <Label htmlFor="airplane-mode">{_locales(`サウンド効果`)}</Label>
                                    <Switch id="airplane-mode" className='shadow-md' disabled />
                                </div>
                                <Separator className="my-5" />
                            </li>
                            <li className=''>
                                <div className="flex flex-row justify-between items-center space-x-2 w-full">
                                    <Label htmlFor="airplane-mode">{_locales(`影`)}</Label>
                                    <Switch id="airplane-mode" className='shadow-md' defaultChecked disabled />
                                </div>
                            </li>
                        </ul>
                    </div>
                </SheetContent>
            </Sheet>
        )
    }

    return (
        <>
            <main className="relative bg-cover bg-center bg-no-repeat w-full h-screen" style={{ backgroundImage: `url(${backgroundImageUrl || ``})` }}>
                {children}
                <div className="absolute top-0 right-0 m-2 p-2">
                    <CmpDrawer/>
                </div>
            </main>
        </>
    )
}

export function BackgroundImageUploader({ className, onUpload }: { className?: string; onUpload: (imageUrl: string) => void }) {
    const [, setCookie] = useCookies(['backgroundImage']);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedImage = e.target.files ? e.target.files[0] : null;
        if (selectedImage) {
            const reader = new FileReader();
            reader.readAsDataURL(selectedImage);
            reader.onloadend = () => {
                const imageUrl = reader.result as string;
                setCookie('backgroundImage', imageUrl, { path: '/', sameSite: 'lax' });
                onUpload(imageUrl);
            };
        }
    };

    return (
        <input id='fileInput' type="file" accept="image/*" onChange={handleImageChange} className={`file:mr-4 file:py-2 file:px-4
        file:rounded-full file:border-0
        file:text-sm file:font-semibold
        file:bg-violet-50 file:text-violet-700
        hover:file:bg-violet-100
        dark:file:bg-violet-950 dark:file:text-violet-200
        dark:hover:file:bg-violet-900
        transition-all duration-300 ease-in-out ${className && className}`}/>
    );
}