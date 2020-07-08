import { CellType } from '../components/Field';

export interface IBounds {
    x1: number;
    x2: number;
    y1: number;
    y2: number;
}

function getRandom(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min;
}

function isValidBounds(x1: number, x2: number, y1: number, y2: number) {
    return x1 >= 0 && x1 < 10 && x2 >= 0 && x2 < 10 && y1 >= 0 && y1 < 10 && y2 >= 0 && y2 < 10;
}

function getBounds(x1: number, x2: number, y1: number, y2: number) {
    return {
        x1: x1 > x2 ? x1 + 1 : x1 - 1,
        x2: x2 >= x1 ? x2 + 1 : x2 - 1,
        y1: y1 > y2 ? y1 + 1 : y1 - 1,
        y2: y2 >= y1 ? y2 + 1 : y2 - 1
    }
}

function tryBounds(bounds: IBounds, map: CellType[][]) {
    for (let i = bounds.x1; i <= bounds.x2; i++) {
        for (let j = bounds.y1; j <= bounds.y2; j++) {
            if (map[i] && map[i][j] && map[i][j] !== 'default') {
                return false;
            }
        }
    }

    return true;
}

function placeShip(map: CellType[][], size: number) {
    let startX = getRandom(0, 9);
    let startY;
    let startX2;
    let startY2;
    let isValid = false;
    let resultBound;

    while (!isValid) {
        startX = startX2 = getRandom(0, 9); startY = startY2 = getRandom(0, 9);
        let side = getRandom(0, 3);
        switch (side) {
            case 0:
                startX2 = startX;
                startX = startX2 - size + 1;
                break;
            case 1:
                startY2 = startY + size - 1;
                break;
            case 2:
                startX2 = startX + size - 1;
                break;
            case 3:
                startY2 = startY;
                startY = startY2 - size + 1;
                break;
        }

        if (isValidBounds(startX, startX2, startY, startY2)) {
            resultBound = getBounds(startX, startX2, startY, startY2);
            if (tryBounds(resultBound, map)) {
                isValid = true;
                console.log(startX, startX2, startY, startY2);
            }
        }
    }

    // @ts-ignore
    for (let i = startX; i <= startX2; i++) {
        // @ts-ignore
        for (let j = startY; j <= startY2; j++) {
            // @ts-ignore
            map[i][j] = 'ship';
        }
    }
}

export function createMap(isEmpty: boolean = false): CellType[][] {
    const array: CellType[][] = [[], [], [], [], [], [], [], [], [], []];
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            array[i][j] = CellType.default;
        }
    }
    if (!isEmpty) {
        for (var i = 0; i < 4; i++) {
            for (var j = 4 - i; j > 0; j--) {
                placeShip(array, i + 1);
            }
        }
    }
    return array;
}

export function destroyShip(ship: IBounds, map: CellType[][]) {
    for (let i = ship.x1; i <= ship.x2; i++) {
        for (let j = ship.y1; j <= ship.y2; j++) {
            map[i][j] = CellType.destroyed;
        }
    }
    for (let i = ship.x1-1; i <= ship.x2+1; i++) {
        for (let j = ship.y1-1; j <= ship.y2+1; j++) {
            if (map[i] && map[i][j] !== CellType.destroyed) {
                map[i][j] = CellType.missed;
            }
        }
    }
}