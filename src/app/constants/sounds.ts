import { ISound } from '../interfaces/sound.interface';

// Available sounds in alphabetical order
const AvailableSounds: ISound[] = [
    {
        'key': 'bye_bye',
        'label': 'Bye Bye',
        'url': '/assets/audio/bye_bye.mp3'
    },
    {
        'key': 'car_honk',
        'label': 'Car Honk',
        'url': '/assets/audio/car_honk.mp3'
    },
    {
        'key': 'gecko',
        'label': 'Gecko',
        'url': '/assets/audio/gecko.mp3'
    },
    {
        'key': 'mario_game_over',
        'label': 'Mario\'s Game Over',
        'url': '/assets/audio/mario_game_over.mp3'
    },
    {
        'key': 'times_up',
        'label': 'Time\'s up 1',
        'url': '/assets/audio/times_up.mp3'
    },
    {
        'key': 'times_up_2',
        'label': 'Time\'s up 2',
        'url': '/assets/audio/times_up_2.mp3'
    },
    {
        'key': 'whistle',
        'label': 'Whistle',
        'url': '/assets/audio/whistle.mp3'
    },
];

export { AvailableSounds }