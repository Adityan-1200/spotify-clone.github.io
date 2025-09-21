
let currentsong= new Audio();
let song=[];
let ab=[]
async function getsongs(){
               let a=await fetch("https://adityan-1200.github.io/ss/");
               let response=await a.text();
               let div=document.createElement("div");
               div.innerHTML=response;
               let as=div.getElementsByTagName("a");
               song=[]
               for (let i = 0; i < as.length; i++) {
                const element = as[i];
                if (element.href.endsWith("mp3"))
                    song.push(element.href/*.replaceAll("http://127.0.0.1:5500/songs/ssvid.net--","").replace("_128kbps.m4a.mp3","").replace("4k-Music-Video-Ranbir","").replace("Varun-Dhawan-Kriti-Sanon","").replace("-Official-Video","").replace("Lyric-Video-","").replace("-Superstar-Rajinikanth-Sun","").replaceAll("-"," ")*/);
               }
                ab=Array.from(as).map( a => a.textContent);
               return [song,ab];
               
               
} 
const playmusic =async  (track,name)=>{
     currentsong.src=track;      
      currentsong.play();
      currentsong.volume=1;
      document.querySelector(".circle-2 img").style.left="100%";
      document.querySelector("#volume").src="volume-high-Stroke-Rounded.png" ;
      play.src="pause.png";
      document.getElementById("songn").innerHTML=`<img class="pheight" src="white.png" alt="img"></img>`+name;
      
}
async function main(){
    let [songs,name]= await getsongs();
               let b=document.querySelector(".songlist").getElementsByTagName("ul")[0];
               for(let i=0;i<name.length;i++){
                          b.innerHTML=b.innerHTML+`<li class="ko">
                          <div class="musicbox">
                                <img class="mheight" src="white.png" alt="">
                                <h4 class="name">${name[i]}</h4>
                                <h4 class="info">${songs[i]}</h4>
                                <img class="pheight" src="play3.png" alt="">
                              </div>  
                          </li>`;  
                          
               }
               
      Array.from(document.querySelector(".unlist").getElementsByTagName("li")).forEach(a=>{
        a.addEventListener("click",element=>{
            console.log(a.querySelector(".info").firstChild)
           playmusic(a.querySelector(".info").innerHTML.trim(),a.querySelector(".name").innerHTML);

        })
        //currentsong.src=songs[1];
      })
      play.addEventListener("click",() =>{
           if (currentsong.paused){
            currentsong.play();
            play.src="pause.png";
           }
           else{
            currentsong.pause();
            play.src="play-button-arrowhead.png";
           }
      next.addEventListener("click",() =>{
           currentsong.p
      })
      })
      currentsong.addEventListener("timeupdate",() =>{
           let min=Math.floor(currentsong.currentTime/60);
           let sec=Math.floor(currentsong.currentTime% 60);
           let time= `${min.toString().padStart(2,"0")}:${sec.toString().padStart(2,"0")}`;
           let mind=Math.floor(currentsong.duration/60);
           let secd=Math.floor(currentsong.duration% 60);
           let dur=`${mind.toString().padStart(2,"0")}:${secd.toString().padStart(2,"0")}`;
           document.querySelector(".duration").innerHTML=time+"/"+dur;
           document.querySelector(".circle img").style.left=(currentsong.currentTime/currentsong.duration)*92+"%";
      })
           let c= document.querySelectorAll(".card");   
           for(let i of c){
               i.addEventListener("click",() =>{
            let l=(i.querySelector("h3").textContent.trim().replaceAll(" ","-").toLowerCase());
            console.log(l)
            let match=song.find(s => s.toLowerCase().includes(l.trim()));
            let name=ab.find(s => s.toLowerCase().includes(l.trim()));
            playmusic(match,name)
        })
     }
}
      let seek=document.querySelector(".seek");
      seek.addEventListener("click",e =>{
           let percent=((e.offsetX/e.target.getBoundingClientRect().width))*100;
           document.querySelector(".circle img").style.left=percent+"%";
           currentsong.currentTime=(percent*currentsong.duration)/100;
      })
       document.querySelector(".ham img").addEventListener("click",() =>{
          document.querySelector(".left").style.left="0";
       })
       document.querySelector(".close").addEventListener("click",() =>{
          document.querySelector(".left").style.left="-100%";
       })
        document.querySelector("#next").addEventListener("click",() =>{
          let currrent=song.indexOf(currentsong.src);
          let next=currrent+1;
          
          console.log(song[next])
          console.log(ab[next])
          //document.querySelector(".songn")=`<img class="pheight" src="white.png" alt="img"></img>`+`ab[next]`;
          playmusic(song[next],ab[next]);
       })
        document.querySelector("#prev").addEventListener("click",() =>{
          let currrent=song.indexOf(currentsong.src);
          let next=currrent-1;
          
          console.log(song[next])
          console.log(ab[next])
          //document.querySelector(".songn")=`<img class="pheight" src="white.png" alt="img"></img>`+`ab[next]`;
          playmusic(song[next],ab[next]);
       })
       let vol=document.querySelector(".volcontrol");
      vol.addEventListener("click",e =>{
           let percent=((e.offsetX/e.target.getBoundingClientRect().width)*100);
           document.querySelector(".circle-2 img").style.left=percent+"%";
           currentsong.volume=percent/100;
      })
      document.querySelector("#volume").addEventListener("click",() =>{
          if(currentsong.volume>0){
          document.querySelector("#volume").src="mute.png" ;
          currentsong.volume="0.0";
          document.querySelector(".circle-2 img").style.left="0";
          }
          else{
               document.querySelector("#volume").src="volume-high-Stroke-Rounded.png" ;
               currentsong.volume=1;
               document.querySelector(".circle-2 img").style.left="100%";
          }
      })

main(); 
