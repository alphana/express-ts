import DatabaseBase from "../applicationChassis/database.base";
import Record from "./record.entity";

class RecordDatabase extends DatabaseBase<Record> {
    protected collectionName(): string {
        return "records";
    }

}

export default RecordDatabase;
