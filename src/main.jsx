import React, { useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const plants = [
  { id:'bugambilia', name:'Bugambilia', scientific:'Bougainvillea glabra', type:'Ornamental', color:'pink', desc:'Arbusto trepador muy común en patios y calles cálidas.', care:'Sol directo · riego moderado' },
  { id:'nopal', name:'Nopal', scientific:'Opuntia ficus-indica', type:'Comestible', color:'green', desc:'Cactácea mexicana de pencas planas y frutos comestibles.', care:'Sol directo · poca agua' },
  { id:'aloe', name:'Sábila', scientific:'Aloe vera', type:'Medicinal', color:'mint', desc:'Suculenta resistente, conocida por el gel de sus hojas.', care:'Luz abundante · riego espaciado' },
  { id:'epazote', name:'Epazote', scientific:'Dysphania ambrosioides', type:'Hierba', color:'lime', desc:'Hierba aromática tradicional de la cocina mexicana.', care:'Sol o semisombra · suelo húmedo' },
];

function App(){
  const [query,setQuery]=useState(''); const [active,setActive]=useState('Todas'); const [selected,setSelected]=useState(null); const [file,setFile]=useState(null); const input=useRef(null);
  const filtered=useMemo(()=>plants.filter(p=>(active==='Todas'||p.type===active)&&(`${p.name} ${p.scientific}`.toLowerCase().includes(query.toLowerCase()))),[active,query]);
  const chooseFile=e=>{const f=e.target.files?.[0]; if(f) setFile({name:f.name,url:URL.createObjectURL(f)})};
  return <div className="app">
    <header className="topbar"><div className="brand"><img className="brand-logo" src="/cultivame-isotipo.png" alt=""/><span>Cultívame</span></div><nav><button className="nav-link active">Explorar</button><button className="nav-link">Mis plantas</button></nav><button className="profile">AT</button></header>
    <main>
      <section className="hero"><div><p className="eyebrow">Guía de plantas mexicanas</p><h1>Conoce lo que<br/><em>está creciendo.</em></h1><p className="hero-copy">Identifica una planta con una foto y aprende a cuidarla en casa.</p></div><div className="hero-art"><div className="sun"></div><div className="leaf leaf-one"></div><div className="leaf leaf-two"></div><div className="stem"></div></div></section>
      <section className="identify-card"><div className="card-heading"><div><p className="eyebrow">Identificación rápida</p><h2>¿Qué planta encontraste?</h2></div><span className="step">01 / 02</span></div><div className="dropzone" onClick={()=>input.current?.click()} onDragOver={e=>e.preventDefault()} onDrop={e=>{e.preventDefault();const f=e.dataTransfer.files?.[0];if(f)setFile({name:f.name,url:URL.createObjectURL(f)})}}>{file?<><img src={file.url} alt="Vista previa"/><div><strong>{file.name}</strong><p>Imagen lista para analizar</p><button className="text-button" onClick={e=>{e.stopPropagation();setFile(null)}}>Cambiar imagen</button></div></>:<><div className="upload-icon">＋</div><div><strong>Sube una foto de tu planta</strong><p>Arrastra una imagen o selecciónala desde tu dispositivo</p></div><button className="primary" onClick={e=>{e.stopPropagation();input.current?.click()}}>Elegir foto</button></>}<input ref={input} type="file" accept="image/*" hidden onChange={chooseFile}/></div>{file&&<button className="analyze" onClick={()=>setSelected(plants[0])}>Identificar planta</button>}</section>
      <section className="explore"><div className="section-head"><div><p className="eyebrow">Catálogo local</p><h2>Explora plantas mexicanas</h2></div><div className="search"><span>⌕</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Buscar por nombre..."/></div></div><div className="filters">{['Todas','Comestible','Medicinal','Ornamental','Hierba'].map(f=><button key={f} className={active===f?'filter active':'filter'} onClick={()=>setActive(f)}>{f}</button>)}</div><div className="plant-grid">{filtered.map(p=><article className="plant-card" key={p.id} onClick={()=>setSelected(p)}><div className={`plant-image ${p.color}`}><span>{p.type==='Comestible'?'●':p.type==='Medicinal'?'✦':'✽'}</span></div><div className="plant-info"><div><h3>{p.name}</h3><p>{p.scientific}</p></div><span className="card-arrow">↗</span></div><div className="care">{p.care}</div></article>)}</div>{!filtered.length&&<div className="empty">No encontramos esa planta. Prueba con otro nombre.</div>}</section>
    </main>
    {selected&&<div className="modal-backdrop" onClick={()=>setSelected(null)}><div className="modal" onClick={e=>e.stopPropagation()}><button className="close" onClick={()=>setSelected(null)}>×</button><div className={`modal-image ${selected.color}`}>{selected.type==='Comestible'?'●':'✽'}</div><p className="eyebrow">Resultado de identificación</p><h2>{selected.name}</h2><p className="scientific">{selected.scientific}</p><p className="modal-desc">{selected.desc}</p><div className="modal-care"><strong>Cuidados básicos</strong><span>{selected.care}</span></div><button className="primary full" onClick={()=>setSelected(null)}>Guardar en mis plantas</button></div></div>}
  </div>
}

createRoot(document.getElementById('root')).render(<App/>);
