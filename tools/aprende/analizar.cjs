// node analizar.cjs "FEN" ["FEN" ...]  → 5 mejores jugadas de Stockfish (profundidad 16)
const {SF}=require('./sf.cjs');const {Chess}=require('./chess.cjs');
(async()=>{const s=new SF();await s.init();
for(const fen of process.argv.slice(2)){
  const g=new Chess();const v=g.validate_fen(fen);if(!v.valid){console.log('INVALIDO',fen,v.error);continue;}
  const r=await s.analyse(fen,{depth:+(process.env.D||16),multipv:5});
  console.log(fen);r.lines.forEach(l=>{const g2=new Chess(fen);const san=[];for(const u of l.pv.slice(0,7)){const m=g2.move({from:u.slice(0,2),to:u.slice(2,4),promotion:u[4]||'q'});if(!m)break;san.push(m.san);}console.log('  ',JSON.stringify(l.score).padEnd(14),san.join(' '));});}
s.quit();})();
