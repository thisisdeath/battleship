import React from 'react';
import './Field/Field.css'

export enum CellType {
    default='default',
    ship='ship',
    hitted='hitted',
    missed='missed',
    destroyed='destroyed'
};

interface IProps {
    cells: CellType[][];
    cellClickCallback: (i: number, j: number) => void;
}

export default function Field(props: IProps) {
    return (
        <table className='Field' cellPadding='0' cellSpacing='0'>
            {props.cells.map((array, i) => {
                return (<tr>
                    {array.map((cell, j) => <td className={`Field__cell Field__cell-${cell}`} onClick={() => props.cellClickCallback(i, j)}></td>)}
                </tr>)
            })}
        </table>
    )
}