// node pv.cjs FEN [profundidad] → juega la mejor línea de Stockfish hasta el mate (máx. 30 jugadas)
const {SF}=require('./sf.cjs');const {Chess}=require('./chess.cjs');
(async()=>{const s=new SF();await s.init();const g=new Chess(process.argv[2]);const out=[];
for(let i=0;i<30&&!g.game_over();i++){const r=await s.analyse(g.fen(),{depth:+(process.argv[3]||18),multipv:1});const u=r.best;const m=g.move({from:u.slice(0,2),to:u.slice(2,4),promotion:u[4]||'q'});out.push(u+'('+m.san+')');}
console.log(out.join(' '));console.log(g.fen(),g.in_checkmate()?'MATE':g.in_stalemate()?'AHOGADO':'');s.quit();})();
