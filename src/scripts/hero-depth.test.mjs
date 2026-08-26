// Depth-field invariants for HeroGallery's flythrough. Run: node src/scripts/hero-depth.test.mjs
//
// The constants below are duplicated from HeroGallery.astro's inline script
// on purpose — an .astro <script> can't be imported from Node. If you retune
// them there, retune them here; this file is what catches the wrap folding
// the tail of the queue back onto the near side (it did, once).
import assert from 'node:assert';
const SPACING=420, NEAR=500, FAR=3400, LEAD=1400, N=30, SPAN=N*SPACING+LEAD+NEAR;
const depthOf=(i,travel)=>((((i*SPACING-travel+LEAD+NEAR)%SPAN)+SPAN)%SPAN)-NEAR;

// 1. At scroll 0 nothing is already past the camera, and the queue starts off-screen.
for(let i=0;i<N;i++) assert(depthOf(i,0) >= LEAD-1, `plane ${i} starts too close`);

// 2. Sweeping scroll 0->1, each plane crosses the camera (depth<=0) exactly once.
const crossings=new Array(N).fill(0);
let prev=null;
for(let s=0;s<=1;s+=1/20000){
  const travel=s*SPAN;
  const d=Array.from({length:N},(_,i)=>depthOf(i,travel));
  if(prev) for(let i=0;i<N;i++) if(prev[i]>0 && d[i]<=0) crossings[i]++;
  prev=d;
}
crossings.forEach((c,i)=>assert.equal(c,1,`plane ${i} crossed ${c}x under pure scroll — expected exactly 1 (no repeats)`));

// 3. Frame budget: only a handful are on stage at once.
const onstage=[];
for(let s=0;s<=1;s+=0.002){
  const t=s*SPAN;
  onstage.push(Array.from({length:N},(_,i)=>depthOf(i,t)).filter(d=>d<=FAR&&d>=-NEAR).length);
}
const max=Math.max(...onstage), min=Math.min(...onstage);
assert(max<=12,`too many planes composited at once: ${max}`);
assert(min>=4,`tunnel goes sparse: only ${min} planes on stage`);

// 4. Idle drift wraps and keeps looping forever rather than emptying out.
for(const drift of [SPAN*0.5, SPAN*1.3, SPAN*7.7]){
  const n=Array.from({length:N},(_,i)=>depthOf(i,drift)).filter(d=>d<=FAR&&d>=-NEAR).length;
  assert(n>=4,`drift ${drift}: tunnel emptied to ${n} planes`);
}
console.log(`ok — 30 planes, exactly 1 pass each under scroll, ${min}-${max} on stage per frame, drift loops`);
