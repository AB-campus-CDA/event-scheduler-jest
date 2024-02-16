import Event from "./models"

/**
 * The event repository is responsible for events storage from database
 */
export default class EventRepository {

    _dbDriver;

    constructor(dbDriver) {
        this._dbDriver = dbDriver
    }

    /**
     * Get all events saved in db
     * @return Event[]
     */
    getAll(){
        return []; //TODO
    }

    /**
     * Add a new event
     * return true if succeed
     * @return boolean
     */
    add(event){
        return false; //TODO
    }


    /**
     * Get first coming up next event
     * @return Event
     */
    //getFirstEvent() {
        //let first = new Event(new Date('2017-07-14T22:30:00'), new Date('2017-07-14T23:00:00'), "14 juillet", "Campus Numerique", "Feux d'artifice")

        //return first

        //return {description: first.description, title: first.title, location: first.location, endTime: first.endTime, startTime: first.startTime}
    //}
}

export class InMemoryEventRepository extends EventRepository{
    _events;

    constructor(events) {
        super(null);
        this._events = events;
    }


    getAll() {
        return this._events.slice();
    }

    add(event) {
        this._events.push(event);
    }
}