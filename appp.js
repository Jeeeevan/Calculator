const disp=document.querySelector("#Disp")
const but=document.querySelector("#keypad")
const ans=document.querySelector("#Ans")
const cells=['%','exp(x)','C','Del','xⁿ','x²','sqrt(x)','/','7','8','9','*','4','5','6','-','1','2','3','+','1/x','0','.','='
]
let opps=['%','/','*','-','+',]
let numb=['0','1','2','3','4','5','6','7','8','9']
let buf=''
let dbuf=''
disp.textContent="0"
function create()
{
    cells.forEach((cell,index) => {
        const ele=document.createElement('div')
        if(cells[index] in numb)
        {
            ele.classList.add('numbers')    
        }
        else
        {
            ele.classList.add('operators')
        }
        ele.id=cells[index];
        but.append(ele)
        ele.innerHTML=cells[index]
        ele.addEventListener('click',op)
    })
}
create()
function op(e) {
    if (e.target.id === '=') {
      let t = eval(buf);
      console.log(t);
      ans.innerHTML= t;
    } 
    else if (e.target.id === 'C') {
      disp.innerHTML = '0';
      ans.innerHTML='0' // clear disp text
      dbuf = '';
      buf='';
      console.log('cleared')
    } 
    else if(e.target.id=='exp(x)')
    {
        
        try{
            dbuf=buf+'exp('+buf+')'
            let k=eval(buf)
            buf=String(2.718**k)    
            ans.textContent=eval('2.718**k')
            }
            catch(error)
            {
                ans.textContent='Error'
            }
        
        console.log(dbuf)
    }
    else if(e.target.id=='1/x')
    {
        
        try{
            dbuf='1/('+buf+')'
            let k=eval(buf)
            buf=String(1/k)
        ans.innerHTML=eval('1/k')
            }
            catch(error)
            {
                ans.innerHTML='Error'
            }
        
        console.log(dbuf)
    }
    else if(e.target.id=='xⁿ')
    {
        dbuf='(x)ⁿ'.replace('x',buf)
        buf=buf.concat('^')
        // let k=eval(buf)
        // buf=String(k**2)
        // ans.textContent=eval('k**2')
        console.log(dbuf)
    }
    else if(e.target.id=='x²')
    {
        
        try{
            dbuf='(x)²'.replace('x',buf)
        let k=eval(buf)
        buf=String(k**2)
        ans.innerHTML=eval('k**2')
        }
        catch(error)
        {
            ans.innerHTML='Error'
        }  
        console.log(dbuf)
    }
    else if(e.target.id==6)
    {
        
        try{
            dbuf='√(x)'.replace('x',buf)
            let k=eval(buf)
            buf=String(k**0.5)
            ans.textContent=eval('k**0.5')
            }
            catch(error)
            {
                ans.innerHTML='Error'
            }
        
        console.log(dbuf)
    }
    else if(e.target.id == 3) {
        dbuf = dbuf.slice(0, -1);
        disp.innerHTML=dbuf
      }
    else {
        if(buf.slice(-1)=='^')
        {
      dbuf=dbuf.replace('ⁿ',cells[e.target.id].sup())
      buf=buf.replace('^','')
      let k=eval(buf)
      buf=String(k**cells[e.target.id])
      ans.innerHTML=eval(buf)
        }
        else{
      dbuf = dbuf.concat(cells[e.target.id]);
      buf=buf.concat(cells[e.target.id])
        }
    }

    console.log('key pressed :'+cells[e.target.id]);
    disp.innerHTML = dbuf;
    console.log(buf)
  }
  

