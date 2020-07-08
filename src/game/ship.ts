import {CellType} from '../components/Field';
import {IBounds} from './map';

function isShipOrHitted(state: CellType): boolean {
    return state === CellType.ship || state === CellType.hitted;
}

export function findShip(map: CellType[][], x: number, y: number): IBounds {
    let direction;
    let x2 = x;
    let y2 = y;
    debugger

    if (isShipOrHitted(map[x] && map[x][y-1])) {
        direction = 'left';
    } else if (isShipOrHitted(map[x+1] && map[x+1][y])) {
        direction = 'bottom';
    } else if (isShipOrHitted(map[x] && map[x][y+1])) {
        direction = 'right';
    } else if (isShipOrHitted(map[x-1] && map[x-1][y])) {
        direction = 'top';
    }

    if (direction === 'left') {
        for (let i = y; isShipOrHitted(map[x] && map[x][i]); i--) {
            y = i;
        }
        for (let i = y; isShipOrHitted(map[x] && map[x][i]); i++) {
            y2 = i;
        }
    } else if (direction === 'right') {
        for (let i = y; isShipOrHitted(map[x] && map[x][i]); i++) {
            y2 = i;
        }
        for (let i = y; isShipOrHitted(map[x] && map[x][i]); i--) {
            y = i;
        }
    } else if (direction === 'top') {
        for (let i = x; isShipOrHitted(map[i] && map[i][y]); i--) {
            x = i;
        }
        for (let i = x; isShipOrHitted(map[i] && map[i][y]); i++) {
            x2 = i;
        }
    } else if (direction === 'bottom') {
        for (let i = x; isShipOrHitted(map[i] && map[i][y]); i--) {
            x = i;
        }
        for (let i = x; isShipOrHitted(map[i] && map[i][y]); i++) {
            x2 = i;
        }
    }

    console.log( {x1: x, x2: x2, y1: y, y2: y2}, direction)
    return {x1: x, x2: x2, y1: y, y2: y2}
}

export function isDestroyed(bounds: IBounds, map: CellType[][]): boolean {
    for (let i = bounds.x1; i <= bounds.x2; i++) {
        for (let j = bounds.y1; j<= bounds.y2; j++) {
            if (map[i][j] !== CellType.hitted) {
                return false;
            }
        }
    }
    return true;
}