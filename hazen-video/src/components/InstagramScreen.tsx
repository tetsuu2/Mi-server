import React from 'react';
import type {RubroContent} from '../content';
import {BLACK, MONTSERRAT} from '../theme';
import {StatusBar} from './Phone';

// Perfil de red social genérico hecho con divs (sin logos).
export const InstagramScreen: React.FC<{ig: RubroContent['instagram']; gridAppear: number}> = ({ig, gridAppear}) => {
  const grays = ['#D6D6D6', '#C9C9C9', '#DEDEDE', '#CFCFCF', '#D9D9D9', '#C4C4C4', '#DADADA', '#CCCCCC', '#D3D3D3'];
  return (
    <div style={{position: 'absolute', inset: 0, background: '#FFFFFF', fontFamily: MONTSERRAT}}>
      <StatusBar />
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 28px 8px'}}>
        <div style={{fontWeight: 800, fontSize: 26, color: BLACK}}>{ig.handle} ▾</div>
        <div style={{display: 'flex', gap: 8}}>
          {[0, 1, 2].map((k) => (
            <div key={k} style={{width: 8, height: 8, background: BLACK, borderRadius: 4}} />
          ))}
        </div>
      </div>
      <div style={{display: 'flex', alignItems: 'center', gap: 22, padding: '14px 28px'}}>
        <div
          style={{
            width: 124,
            height: 124,
            borderRadius: '50%',
            border: `5px solid #CFCFCF`,
            padding: 5,
            boxSizing: 'border-box',
            flexShrink: 0,
          }}
        >
          <div style={{width: '100%', height: '100%', borderRadius: '50%', background: '#BDBDBD', position: 'relative', overflow: 'hidden'}}>
            <div style={{position: 'absolute', width: 40, height: 40, borderRadius: '50%', background: '#EDEDED', left: 32, top: 18}} />
            <div style={{position: 'absolute', width: 80, height: 60, borderRadius: '50%', background: '#EDEDED', left: 12, top: 64}} />
          </div>
        </div>
        <div style={{display: 'flex', flex: 1, justifyContent: 'space-around', textAlign: 'center'}}>
          {[
            ['9', 'publicaciones'],
            ['124', 'seguidores'],
            ['87', 'seguidos'],
          ].map(([n, l]) => (
            <div key={l}>
              <div style={{fontWeight: 900, fontSize: 28, color: BLACK}}>{n}</div>
              <div style={{fontWeight: 600, fontSize: 15, color: '#555'}}>{l}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{padding: '0 28px'}}>
        <div style={{fontWeight: 800, fontSize: 21, color: BLACK}}>{ig.name}</div>
        <div style={{fontWeight: 600, fontSize: 19, color: '#333', marginTop: 4}}>{ig.bio[0]}</div>
        <div style={{fontWeight: 600, fontSize: 19, color: '#333'}}>{ig.bio[1]}</div>
      </div>
      <div style={{display: 'flex', gap: 10, padding: '18px 28px'}}>
        {['Seguir', 'Mensaje'].map((b, i) => (
          <div
            key={b}
            style={{
              flex: 1,
              height: 50,
              borderRadius: 12,
              background: i === 0 ? '#BDBDBD' : '#EFEFEF',
              color: i === 0 ? '#FFFFFF' : BLACK,
              fontWeight: 800,
              fontSize: 19,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {b}
          </div>
        ))}
      </div>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 5, marginTop: 6}}>
        {grays.map((g, i) => {
          const a = Math.max(0, Math.min(1, gridAppear * 9 - i));
          return <div key={i} style={{aspectRatio: '1 / 1', background: g, opacity: a, transform: `scale(${0.7 + 0.3 * a})`}} />;
        })}
      </div>
    </div>
  );
};
