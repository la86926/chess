// Envoltorio mínimo de Stockfish (UCI) para validar lecciones en Node.
const {spawn}=require('child_process');
const path=require('path');
const ENGINE=path.join(__dirname,'node_modules/stockfish/src/stockfish-17.1-single-a496a04.js');
class SF{
  constructor(){
    this.p=spawn(process.execPath,[ENGINE],{stdio:'pipe'});
    this.buf='';this.waiters=[];this.lines=[];
    this.p.stdout.on('data',d=>{this.buf+=d.toString();let i;while((i=this.buf.indexOf('\n'))>=0){const l=this.buf.slice(0,i).trim();this.buf=this.buf.slice(i+1);this._line(l);}});
    this.p.stderr.on('data',()=>{});
  }
  _line(l){this.lines.push(l);for(const w of this.waiters.slice()){if(w.test(l)){this.waiters.splice(this.waiters.indexOf(w),1);w.res(this.lines.splice(0));}}}
  send(c){this.p.stdin.write(c+'\n');}
  wait(re){return new Promise(res=>this.waiters.push({test:l=>re.test(l),res}));}
  async init(){this.send('uci');await this.wait(/^uciok/);this.send('setoption name Threads value 1');this.send('setoption name Hash value 64');this.send('isready');await this.wait(/^readyok/);}
  // Devuelve [{uci,score:{cp|mate}, pv:[...]}] ordenado, MultiPV=n
  async analyse(fen,{depth=18,multipv=3,movetime=null}={}){
    this.lines=[];
    this.send('setoption name MultiPV value '+multipv);
    this.send('ucinewgame');this.send('isready');await this.wait(/^readyok/);
    this.lines=[];
    this.send('position fen '+fen);
    this.send(movetime?('go movetime '+movetime):('go depth '+depth));
    const out=await this.wait(/^bestmove/);
    const best={};
    for(const l of out){
      if(!l.startsWith('info ')||l.indexOf(' pv ')<0)continue;
      const mp=+(l.match(/multipv (\d+)/)||[0,1])[1];
      const d=+(l.match(/ depth (\d+)/)||[0,0])[1];
      const sc=l.match(/score (cp|mate) (-?\d+)/);
      const pv=l.split(' pv ')[1].trim().split(/\s+/);
      if(!sc)continue;
      if(!best[mp]||d>=best[mp].depth)best[mp]={depth:d,score:{[sc[1]]:+sc[2]},uci:pv[0],pv};
    }
    const bm=out[out.length-1].split(/\s+/)[1];
    return {best:bm,lines:Object.keys(best).sort((a,b)=>a-b).map(k=>best[k])};
  }
  quit(){try{this.send('quit');}catch(e){}setTimeout(()=>this.p.kill(),200);}
}
module.exports={SF};
