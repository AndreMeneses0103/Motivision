import crypto from 'crypto';

export default class createKey {
    private static AccessKey: string | null = null;
    private static RefreshKey: string | null = null;

    public generateAccessKey(): string{
        if(!(createKey.AccessKey)){
            createKey.AccessKey = crypto.randomBytes(32).toString('hex');
        }
        return createKey.AccessKey;
    }
    public generateRefreshKey(): string{
        if(!(createKey.RefreshKey)){
            createKey.RefreshKey = crypto.randomBytes(32).toString('hex');
        }
        return createKey.RefreshKey;
    }

}
