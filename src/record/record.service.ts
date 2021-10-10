import RecordDatabase from "./record.database";
import RecordsPayload from "./record.payload";
import { AggregationCursor } from "mongodb";
import RecordFilter from "./record.filter";
import RecordsResponse from "./record.response";

class RecordService {
    private recordDatabase: RecordDatabase;

    constructor() {
        this.recordDatabase = new RecordDatabase();
    }

    public getAggregatedRecordByFilter(filter: RecordFilter): Promise<RecordsPayload> {
        const dateRangeMatch = {
            "$match": {
                "createdAt": {
                    "$gte": new Date(filter.startDate),
                    "$lte": new Date(filter.endDate)
                }
            }
        };
        const unwind = {
            "$unwind": {
                "path": "$counts",
                "preserveNullAndEmptyArrays": true
            }
        };
        const group = {
            "$group": {
                "_id": "$_id",
                "keys": {"$addToSet": "$key"},
                "createdAt": {"$addToSet": "$createdAt"},
                "value": {"$addToSet": "$value"},
                "totalCount": {"$sum": "$counts"}
            }
        };
        const project = {
            "$project": {
                "key": {"$arrayElemAt": ["$keys", 0]},
                "createdAt": {"$arrayElemAt": ["$createdAt", 0]},
                "totalCount": 1,
                "_id": 0
            }
        };
        const totalCountMatch = {
            "$match": {
                "totalCount": {"$gte": filter.minCount, "$lte": filter.maxCount}
            }
        };
        const pipeline = [dateRangeMatch, unwind, group, totalCountMatch, project];
        const aggCurr: AggregationCursor<RecordsResponse> = this.recordDatabase.collection().aggregate(pipeline);

        const result: Promise<RecordsPayload> = aggCurr.toArray().then(value => {
            return new RecordsPayload(0, "success", value);
        }).catch(reason => {
            return new RecordsPayload(-1, "fail", undefined);
        });

        return result;
    }
}

export default RecordService;
