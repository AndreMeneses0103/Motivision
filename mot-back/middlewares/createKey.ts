import crypto from 'crypto';

export default class createKey {
    private key: string | null = null;

    public generateKey(): string{
        if(!(this.key)){
            this.key = crypto.randomBytes(32).toString('hex');
        }
        return this.key;
    }

}
