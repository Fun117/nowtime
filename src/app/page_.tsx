'use client'

import { MainContents } from "@/components/client/customize";
import { Loading, NetworkOffline } from "@/components/client/status";
import { TimeGet } from "@/components/client/time";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export function Pages_Home() {

    useEffect(() => {
        const interval = setInterval(() => {
            // 時間の更新処理
        }, 1000);

        const resetTimer = () => {
            clearInterval(interval);
            // ここで新しいタイマーをセットするなどして、ユーザーがアクティブであることを示す
            setTimeout(() => {
                // 何もしない、ただアクティブを保つ
            }, 100);
        };

        // マウスの動きを検知して、アクティブな状態を保つ
        document.addEventListener('mousemove', resetTimer);

        // クリーンアップ
        return () => {
            clearInterval(interval);
            document.removeEventListener('mousemove', resetTimer);
        };
    }, []);
    
    const [NetworkStatus, setNetworkStatus] = useState<boolean>(true);
    const [isPageLoaded, setPageLoaded] = useState(false);

    useEffect(() => {
        const PageLoaded = async () => {
            try {
                if (typeof window !== 'undefined') {
                    window.addEventListener("offline", () => {
                        setNetworkStatus(false);
                        toast.error('NetworkStatus: offline');
                    });
                    window.addEventListener("online", () => {
                        setNetworkStatus(true);
                    });
                    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                        document.documentElement.classList.add('dark');
                    } else {
                        document.documentElement.classList.remove('dark');
                    }
                }
                setPageLoaded(true);
            } catch (error) {
                console.error('PageLoaded:', error);
            }
        };

        if (!isPageLoaded) {
            PageLoaded();
        }
    }, [isPageLoaded]);

    if (!NetworkStatus) {
        return <NetworkOffline />;
    }

    if (!isPageLoaded) {
        return <Loading />;
    }

    return (
        <>
            <MainContents>
                <div className="flex justify-center items-center backdrop-blur backdrop-brightness-75 w-full h-full">
                    <TimeGet />
                </div>
            </MainContents>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
        </>
    );
}