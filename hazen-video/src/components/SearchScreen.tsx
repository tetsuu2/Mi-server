import React from 'react';
import type {SearchResult} from '../content';
import {ACCENT, BLACK, MONTSERRAT, PIXEL, RED} from '../theme';
import {PixelSprite} from './PixelSprite';
import {STAR} from './sprites';
import {StatusBar} from './Phone';

// Buscador genérico (sin logos de marcas) con resultados inventados.

const Magnifier: React.FC<{size?: number}> = ({size = 26}) => (
  <div style={{position: 'relative', width: size, height: size}}>
    <div
      style={{
        position: 'absolute',
        width: size * 0.72,
        height: size * 0.72,
        border: `${Math.round(size * 0.16)}px solid ${BLACK}`,
        borderRadius: '50%',
        boxSizing: 'border-box',
      }}
    />
    <div
      style={{
        position: 'absolute',
        width: size * 0.42,
        height: size * 0.16,
        background: BLACK,
        right: -size * 0.04,
        bottom: size * 0.1,
        transform: 'rotate(45deg)',
      }}
    />
  </div>
);

export const SearchBar: React.FC<{typed: string; caret: boolean}> = ({typed, caret}) => (
  <div style={{padding: '14px 22px 10px'}}>
    <div
      style={{
        height: 74,
        border: `4px solid ${BLACK}`,
        borderRadius: 37,
        boxShadow: `5px 5px 0 ${BLACK}`,
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        padding: '0 24px',
        background: '#FFFFFF',
      }}
    >
      <Magnifier />
      <div style={{fontFamily: MONTSERRAT, fontWeight: 700, fontSize: 25, color: '#111', whiteSpace: 'nowrap'}}>
        {typed}
        <span
          style={{
            display: 'inline-block',
            width: 3,
            height: 30,
            marginLeft: 2,
            verticalAlign: 'middle',
            background: caret ? BLACK : 'transparent',
          }}
        />
      </div>
    </div>
    <div style={{display: 'flex', gap: 26, padding: '18px 8px 0', fontFamily: MONTSERRAT, fontWeight: 700, fontSize: 18}}>
      {['Todo', 'Mapas', 'Imágenes', 'Noticias'].map((t, i) => (
        <div key={t} style={{color: i === 0 ? BLACK : '#8A8A8A', paddingBottom: 8, borderBottom: i === 0 ? `5px solid ${ACCENT}` : '5px solid transparent'}}>
          {t}
        </div>
      ))}
    </div>
    <div style={{height: 3, background: '#E6E6E6', marginTop: -2}} />
  </div>
);

const RESULT_H = 156;

const ResultCard: React.FC<{r: SearchResult; appear: number; tapped: number}> = ({r, appear, tapped}) => (
  <div
    style={{
      height: RESULT_H,
      boxSizing: 'border-box',
      border: `4px solid ${BLACK}`,
      borderRadius: 18,
      boxShadow: `6px 6px 0 ${BLACK}`,
      background: tapped > 0 ? `rgba(47,128,237,${0.16 * tapped})` : '#FFFFFF',
      padding: '14px 16px',
      opacity: Math.min(1, appear * 2),
      transform: `translateY(${(1 - appear) * 80}px) scale(${(0.9 + 0.1 * appear) * (1 - 0.04 * tapped)})`,
      fontFamily: MONTSERRAT,
    }}
  >
    <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
      <div
        style={{
          width: 38,
          height: 38,
          borderRadius: 9,
          background: r.color,
          color: '#fff',
          fontWeight: 900,
          fontSize: 22,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: `3px solid ${BLACK}`,
          boxSizing: 'border-box',
        }}
      >
        {r.name.replace(/^(Dra?\.|Cra?\.)\s*/, '').charAt(0)}
      </div>
      <div style={{fontSize: 17, fontWeight: 600, color: '#4F4F4F'}}>{r.url}</div>
    </div>
    <div style={{fontSize: 24, fontWeight: 800, color: '#1F48C8', marginTop: 8, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
      {r.name}
    </div>
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 4, fontSize: 17, fontWeight: 700, color: '#333'}}>
        <span style={{marginRight: 4}}>{r.rating}</span>
        {[0, 1, 2, 3, 4].map((k) => (
          <PixelSprite key={k} sprite={STAR} px={4} />
        ))}
        <span style={{color: '#777', marginLeft: 6}}>({r.reviews})</span>
      </div>
      <div
        style={{
          background: BLACK,
          color: '#fff',
          fontSize: 15,
          fontWeight: 800,
          padding: '6px 14px',
          borderRadius: 20,
        }}
      >
        Sitio web
      </div>
    </div>
  </div>
);

const EmptySlot: React.FC<{appear: number; shakeX: number; fade: number}> = ({appear, shakeX, fade}) => (
  <div
    style={{
      height: RESULT_H,
      boxSizing: 'border-box',
      border: `5px dashed ${RED}`,
      borderRadius: 18,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 18,
      opacity: Math.min(1, appear * 2) * (1 - fade),
      transform: `translateX(${shakeX}px) scale(${0.85 + 0.15 * appear})`,
      background: 'rgba(255,59,48,0.06)',
    }}
  >
    <div
      style={{
        width: 54,
        height: 54,
        borderRadius: '50%',
        border: `5px dashed #B5B5B5`,
        boxSizing: 'border-box',
      }}
    />
    <div style={{fontFamily: MONTSERRAT, fontWeight: 900, fontSize: 52, color: '#9A9A9A'}}>Vos</div>
    <div style={{fontFamily: PIXEL, fontSize: 22, color: RED, marginLeft: 6}}>?</div>
  </div>
);

export const SearchScreen: React.FC<{
  typed: string;
  caret: boolean;
  results: SearchResult[];
  appear: number[];
  tap?: {index: number; progress: number};
  slot?: {appear: number; shakeX: number; fade: number};
}> = ({typed, caret, results, appear, tap, slot}) => (
  <div style={{position: 'absolute', inset: 0, background: '#FFFFFF'}}>
    <StatusBar />
    <SearchBar typed={typed} caret={caret} />
    <div style={{display: 'flex', flexDirection: 'column', gap: 18, padding: '8px 26px 0 22px'}}>
      {results.map((r, i) => (
        <ResultCard key={i} r={r} appear={appear[i] ?? 0} tapped={tap && tap.index === i ? tap.progress : 0} />
      ))}
      {slot ? <EmptySlot {...slot} /> : null}
    </div>
  </div>
);

// Posición vertical (dentro de la pantalla) del resultado i, para ubicar el dedo.
export const resultCenterY = (i: number) => 54 + 154 + 8 + i * (RESULT_H + 18) + RESULT_H / 2;
