import { Collection, MongoClient } from "mongodb";
import * as dotenv from "dotenv";

abstract class DatabaseBase<T> {
    protected client: MongoClient;
    protected _collection: Collection;
    protected _collectionName: string;

    constructor() {
        if (!process.env.PRODUCTION) {
            dotenv.config({path: ".env.dev"});
        }

        this._collectionName = this.collectionName().toLowerCase();
        this.setupDatabaseConnection();
    }

    public collection(): Collection<T> {
        // @ts-ignore
        return this._collection;
    }

    protected abstract collectionName(): string;

    private async setupDatabaseConnection(): Promise<void> {
        const uri = process.env.MONGODB_URI || "mongodb+srv://localhost:27017/";
        this.client = new MongoClient(uri);
        // Connect the client to the server
        await this.client.connect().then(() => {
            // Establish and verify connection
            this.client.db("admin").command({ping: 1});
        }).then(() => {
            this._collection = this._collection || this.client.db().collection(this.collectionName());
        }).catch(() => this.client.close());
        console.log("Connected successfully to db : %s", uri);
    }
}

export default DatabaseBase;
