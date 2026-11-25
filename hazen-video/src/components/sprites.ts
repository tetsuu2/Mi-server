import {ACCENT} from '../theme';
import type {SpriteDef} from './PixelSprite';

const OUT = '#1E1B24';

export const BIRD_UP: SpriteDef = {
  rows: [
    '......kk..........',
    '.....kgk..........',
    '....kggk..........',
    '...kgggk.....kkk..',
    '..kggglk....kgggk.',
    'kkkgglkkkkkkggegky',
    'kwwllllllllllggkyy',
    '.kwwwwwwwwwwllgk..',
    '..kkwwwwwwwwwkk...',
    '....kkkkkkkkk.....',
    '..................',
    '..................',
  ],
  palette: {k: OUT, g: '#6E7487', l: '#A9AEBD', w: '#E9E6E0', y: '#F2B33D', e: '#F7F3E8'},
};

export const BIRD_DOWN: SpriteDef = {
  rows: [
    '..................',
    '..................',
    '..................',
    '.............kkk..',
    '............kgggk.',
    'kkkkkkkkkkkkggegky',
    'kwwllllllllllggkyy',
    '.kwwgggglwwwllgk..',
    '..kkkggglkwwwkk...',
    '....kgglkkkkk.....',
    '....kglk..........',
    '....kk............',
  ],
  palette: BIRD_UP.palette,
};

export const HAND: SpriteDef = {
  rows: [
    '...kk......',
    '..kwwk.....',
    '..kwwk.....',
    '..kwwk.....',
    '..kwwkkk...',
    '..kwwkwwkk.',
    'kkkwwkwwkwk',
    'kwkwwwwwkwk',
    'kwwwwwwwwwk',
    'kwwwwwwwwwk',
    '.kwwwwwwwwk',
    '.kwwwwwwwk.',
    '..kwwwwwwk.',
    '..kkkkkkkk.',
  ],
  palette: {k: OUT, w: '#FFFFFF'},
};

export const PIN: SpriteDef = {
  rows: [
    '..kkk..',
    '.krrrk.',
    'krrwrrk',
    'krwwwrk',
    'krrwrrk',
    '.krrrk.',
    '.krrrk.',
    '..krk..',
    '..krk..',
    '...k...',
  ],
  palette: {k: OUT, r: '#FF3B30', w: '#FFFFFF'},
};

export const STAR: SpriteDef = {
  rows: ['..y..', '.yyy.', 'yyyyy', '.yyy.', 'y...y'],
  palette: {y: '#FFB400'},
};

export const ARROW_UP: SpriteDef = {
  rows: [
    '....k....',
    '...kak...',
    '..kaaak..',
    '.kaaaaak.',
    'kaaaaaaak',
    'kkkaaakkk',
    '..kaaak..',
    '..kaaak..',
    '..kaaak..',
    '..kkkkk..',
  ],
  palette: {k: OUT, a: ACCENT},
};

export const TOOTH: SpriteDef = {
  rows: [
    '.kkk..kkk.',
    'kwwwkkwwwk',
    'kwwwwwwwwk',
    'kwwwwwwwwk',
    'kwwwwwwwwk',
    '.kwwwwwwk.',
    '.kwwwwwwk.',
    '.kwwkkwwk.',
    '.kwk..kwk.',
    '.kwk..kwk.',
    '..k....k..',
  ],
  palette: {k: OUT, w: '#FFFFFF'},
};

export const BRIEFCASE: SpriteDef = {
  rows: [
    '....kkkk....',
    '...k....k...',
    'kkkkkkkkkkkk',
    'kbbbbbbbbbbk',
    'kbbbbbbbbbbk',
    'kkkkkyykkkkk',
    'kbbbbyybbbbk',
    'kbbbbbbbbbbk',
    'kbbbbbbbbbbk',
    'kkkkkkkkkkkk',
  ],
  palette: {k: OUT, b: '#A8673F', y: '#F2C94C'},
};

export const CALCULATOR: SpriteDef = {
  rows: [
    'kkkkkkkkkkk',
    'kdddddddddk',
    'kdsssssssdk',
    'kdsssssssdk',
    'kdddddddddk',
    'kdwdwdwdodk',
    'kdddddddddk',
    'kdwdwdwdodk',
    'kdddddddddk',
    'kdwdwdwdodk',
    'kdddddddddk',
    'kkkkkkkkkkk',
  ],
  palette: {k: OUT, d: '#3A3F4B', s: '#BFE8C8', w: '#E8E8E8', o: '#FF9F43'},
};

export const RUBRO_ICON = {
  tooth: TOOTH,
  briefcase: BRIEFCASE,
  calculator: CALCULATOR,
};
