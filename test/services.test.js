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
                getAll: () => fakeEvents.slice()
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

    let fakeEvents = [
        new Event(new Date('2000-12-17T03:24:00'),new Date('2000-12-17T03:25:00'),"2000","Campus Numerique","This is l'an 2000"),
        new Event(new Date('2019-12-17T03:24:00'),new Date('2019-12-31T13:24:00'),"Hello World","Campus Numerique","This is an hello world.."),
        new Event(new Date('2017-07-14T22:30:00'),new Date('2017-07-14T23:00:00'),"14 juillet","Campus Numerique","Feux d'artifice"),
        new Event(new Date('1995-12-17T03:24:00'),new Date('2018-12-17T03:24:00'),"First event","Campus Numerique","This is an hello world.."),
        new Event(new Date('2025-04-01T09:00:00'),new Date('2025-04-01T17:00:00'),"Unit test that fuck","Campus Numerique","This is the FIN DU MONDE."),
        new Event(new Date('2020-04-01T09:00:00'),new Date('2020-04-01T17:00:00'),"Unit test again","Campus Numerique","This is an hello world.."),
        new Event(new Date('2020-04-01T09:05:00'),new Date('2020-04-01T16:00:00'),"Unit test again","Campus Numerique","This is an hello world..")
    ];

    test('getEvents shall call repository', async () => {
        let eventService = new EventService(new EventRepository());
        eventService.getEvents();
        expect(EventRepository).toHaveBeenCalledTimes(1);
    })

    test('getEvents shall return 6 results', async () => {
        let eventService = new EventService(new EventRepository());
        expect(eventService.getEvents().length).toBe(fakeEvents.length);
    })

    test('getEvents shall return the first upcoming event', async () => {
        let eventService = new EventService(new EventRepository());

        let feuxDartifice = new Event(new Date('2017-07-14T22:30:00'),new Date('2017-07-14T23:00:00'),"14 juillet","Campus Numerique","Feux d'artifice")
        expect(eventService.getFirstEvent()).toStrictEqual(feuxDartifice);
    })

    test('getEvents shall return the last event', async () => {
        let eventService = new EventService(new EventRepository());

        let finDuMonde = new Event(new Date('2025-04-01T09:00:00'),new Date('2025-04-01T17:00:00'),"Unit test that fuck","Campus Numerique","This is the FIN DU MONDE.")
        expect(eventService.getLastEvent()).toStrictEqual(finDuMonde);
    })

    test('getEvents shall return the longest boring event', async () => {
        let eventService = new EventService(new EventRepository())
        let longuest = new Event(new Date('1995-12-17T03:24:00'),new Date('2018-12-17T03:24:00'),"First event","Campus Numerique","This is an hello world..")
        expect(eventService.getLongestEvent()).toStrictEqual(longuest)
    })

    test('getEvents shall return the shortest fun event', async () => {
        let eventService = new EventService(new EventRepository())
        let shortest =         new Event(new Date('2000-12-17T03:24:00'),new Date('2000-12-17T03:25:00'),"2000","Campus Numerique","This is l'an 2000")

        expect(eventService.getShortestEvent()).toStrictEqual(shortest)
    })

    test('getEvents shall return events at on a specified time', async () => {
        let eventService = new EventService(new EventRepository())
        let time = new Date('2020-04-01T12:00:00')
        let expected = [
            new Event(new Date('2020-04-01T09:00:00'),new Date('2020-04-01T17:00:00'),"Unit test again","Campus Numerique","This is an hello world.."),
            new Event(new Date('2020-04-01T09:05:00'),new Date('2020-04-01T16:00:00'),"Unit test again","Campus Numerique","This is an hello world..")
        ];
        expect(eventService.hasEventOn(time)).toStrictEqual(expected)
    })
});