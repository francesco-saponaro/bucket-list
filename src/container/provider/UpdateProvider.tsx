import { App } from "@capacitor/app";
import { CapacitorUpdater } from "@capgo/capacitor-updater";
import { useEffect } from "react";
import { Dialog } from '@capacitor/dialog'
import { useStoreUpdate } from "@store/storeUpdate";

export const UpdateProvider: React.FC = () => {
    CapacitorUpdater.notifyAppReady();
    const {
        setPercentage,
        setIsDownloading,
        setVersion,
        version
    } = useStoreUpdate();
    const logEvent = (value: any) => {
        // alert(JSON.stringify(value))
    }
    const autoUpdate = async () => {
        CapacitorUpdater.addListener('downloadFailed', async (event) => {
            logEvent({ event, message: 'Download Failed' })
        });
        CapacitorUpdater.addListener('noNeedUpdate', async (event) => {
            logEvent({ event, message: 'No Need Update' })
        });
        CapacitorUpdater.addListener('updateFailed', async (event) => {
            logEvent({ event, message: 'Update Error' })
        });
        CapacitorUpdater.addListener('appReloaded', async () => {
            logEvent({ message: 'App Reloaded' })
        });
        try {
            const serverVersion = await fetch(`${process.env.VITE_APP_API_URL}live-version/${version}`);
            const serverVersionJson = await serverVersion.json();
            if (serverVersionJson.version !== version)
                await CapacitorUpdater.download({
                    url: serverVersionJson.url,
                    version: serverVersionJson.version,
                }).then((event) => {
                    logEvent({ event, message: 'Download Complete' })
                })
        } catch (error) {
            logEvent({ error, message: 'Update Error' })
            console.log(error)
        }

    }
    useEffect(() => {
        CapacitorUpdater.setStatsUrl({
            url: `${process.env.VITE_APP_API_URL}live-stats`
        });
        autoUpdate()
        CapacitorUpdater.addListener('updateAvailable', async (res) => {
            try {
                await Dialog.alert({
                    title: 'Nuova versione disponibile',
                    message: `Una nuova versione ${res.bundle.version} è disponibile. Aggiornare ora`,
                })
                CapacitorUpdater.set(res.bundle)
            }
            catch (error) {
                logEvent({ error, message: 'Update Error' })
            }
        })

        CapacitorUpdater.addListener('downloadComplete', async (event) => {
            setIsDownloading(false);
        });

        CapacitorUpdater.addListener('appReady', async (event) => {
            setVersion(event.bundle.version)
            logEvent({ event, message: 'App Ready' })
        });

        CapacitorUpdater.addListener('download', async (event) => {
            setIsDownloading(event.bundle.status === 'downloading')
            setPercentage(event.percent)
        });
        return () => {
            App.removeAllListeners();
        }
    }, [])
    return null;
};