import Event from "../src/models";
import EventRepository from "../src/repository";
import EventService from "../src/services";
jest.mock("../src/repository");


describe("Event Service",()=> {

    beforeEach(() => {
        // Clear all instances and calls to constructor and all methods:
        EventRepository.mockClear();
        EventRepository.mockImplementation(() => {
            return {
                getAll: () => noEvent.slice()
            }
        });
    });

    // time faker
    const RealDate = Date.now

    beforeAll(() => {
        global.Date.now = jest.fn(() => new Date('2017-07-14T22:29:59').getTime())
    })


    afterAll(() => {
        global.Date.now = RealDate
    })

    let noEvent = [ ];

    test('getEvents shall call repository', async () => {
        let eventService = new EventService(new EventRepository());
        eventService.getEvents();
        expect(EventRepository).toHaveBeenCalledTimes(1);
    })

    test('getEvents shall return 0 results', async () => {
        let eventService = new EventService(new EventRepository());
        expect(eventService.getEvents().length).toBe(0);
    })

    test('getEvents shall return the first upcoming event', async () => {
        let eventService = new EventService(new EventRepository());
        expect(eventService.getFirstEvent()).toBe(null);
    })

    test('getEvents shall return the last event', async () => {
        let eventService = new EventService(new EventRepository());
        expect(eventService.getLastEvent()).toBe(null);
    })

    test('getEvents shall return the longest boring event', async () => {
        let eventService = new EventService(new EventRepository())
        expect(eventService.getLongestEvent()).toBe(null)
    })

    test('getEvents shall return the shortest fun event', async () => {
        let eventService = new EventService(new EventRepository())
        expect(eventService.getShortestEvent()).toBe(null)
    })

    test('getEvents shall return events at on a specified time', async () => {
        let eventService = new EventService(new EventRepository())
        let time = new Date('1901-04-01T12:00:00')
        expect(eventService.hasEventOn(time).length).toBe(0)
    })


    test('getEvents shall return an event specified by its name', async () => {
        let eventService = new EventService(new EventRepository())
        expect(eventService.getEventByTitle(name)).toBe(null)
    })


    test('getEvents shall return an event specified by a wrong name', async () => {
        let eventService = new EventService(new EventRepository())
        expect(eventService.getEventByTitle("unnamed")).toBe(null)
    })
});