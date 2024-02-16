
import EventRepository from "./repository";
import Event from "./models";
import EventSerializer from "./serializer";

export default class EventService {

    /**
     * The event repository
     * @type {EventRepository}
     */
    _eventRepository;

    /**
     *
     * @param {EventRepository} eventRepository
     */
    constructor(eventRepository) {
        this._eventRepository = eventRepository;
    }

    /**
     * Return all events
     * @return {Event[]}
     */
    getEvents() {
        //console.log(this._eventRepository.getAll()[0])
        return this._eventRepository.getAll();
    }

    /**
     * Get the first upcoming event : filter event after now, sort by startTime, return the fist
     * @return {null | Event}
     */
    getFirstEvent() {
        return this._eventRepository.getAll()
            .filter(e => e.startTime > Date.now())
            .sort((a,b)=> a.startTime - b.startTime)[0]
    }

    /**
     * Get the last upcoming event : reverse sort by startTime, return the fist
     * @return {null | Event}
     */
    getLastEvent() {
        return this._eventRepository.getAll()
            .sort((a,b)=> b.startTime - a.startTime)[0]
    }

    /**
     * Get the longest event : sort by length, return de first
     * @return {null | Event}
     */
    getLongestEvent() {
        return this._eventRepository.getAll()
            .sort((a,b)=> (b.endTime - b.startTime) - (a.endTime - a.startTime))[0]
    }

    /**
     * get the shortest event
     * @return {null | Event}
     */
    getShortestEvent() {
        return null; //TODO
    }

    // A implementer en TDD
    /**
     *
     * @param {Date} time
     * @return {Event[]}
     */
    hasEventOn(time) {
        let evts = this._eventRepository.getAll();
        return evts.filter(function (e) {
            return time >= e.getStartTime() && time <= e.getEndTime();
        });
    }

    // A implementer en TDD
    /**
     *
     * @param title
     * @return {null | Event}
     */
    getEventByTitle(title) {
        return null
    }

    // A implementer en TDD
    /**
     *
     * @param {Date} time
     */
    isLocationAvailable(time) {
    }

    /**
     * Get current events
     * @return {Event[]}
     */
    getCurrentEvents() {
        let now = Date.now();
        return this.hasEventOn(new Date(now));
    }
    
}