import React from 'react';
import { Button } from '@fluentui/react-components';
import * as Icons from '@fluentui/react-icons';

export default () => {
    const entries = Object.keys(Icons).splice(0, 9500)
    let unique = [...new Set(entries)];
    return ( 
    <div style={{flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap:'wrap'}}>
    {
        unique.map((Entry, i) => {
            return <div key={i} >
                {
                    eval(Icons[Entry].render({title: Icons[Entry], width: 32, height: 32}))
                }
                
            </div>
        })
        }
    </div>
    )
}