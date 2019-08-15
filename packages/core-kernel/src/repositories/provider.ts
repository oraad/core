import { IApplication } from "../contracts/kernel";
import { AbstractServiceProvider } from "../support";

/**
 * @export
 * @class ProviderRepository
 * @extends {Set<AbstractServiceProvider>}
 */
export class ProviderRepository extends Set<AbstractServiceProvider> {
    /**
     * @param {IApplication} app
     * @memberof ProviderRepository
     */
    public constructor(readonly app: IApplication) {
        super();
    }

    /**
     * @param {AbstractServiceProvider} provider
     * @returns {Promise<void>}
     * @memberof ProviderRepository
     */
    public async register(provider: AbstractServiceProvider): Promise<void> {
        await provider.register();

        this.add(provider);
    }

    /**
     * @param {AbstractServiceProvider} provider
     * @param {Record<string, any>} opts
     * @returns {AbstractServiceProvider}
     * @memberof ProviderRepository
     */
    public make(provider: AbstractServiceProvider, opts: Record<string, any>): AbstractServiceProvider {
        // @ts-ignore
        return new provider(this.app, opts);
    }
}
